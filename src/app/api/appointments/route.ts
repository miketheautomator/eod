import { NextRequest, NextResponse } from 'next/server'
import { AppointmentsModel, EngineersModel } from '@/lib/models'
import { sendBookingEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    console.log('=== APPOINTMENTS API CALLED ===')
    const body = await request.json()
    console.log('Request body:', JSON.stringify(body, null, 2))

    const { 
      engineerId, 
      clientName, 
      clientEmail, 
      clientPhone, 
      companyName,
      date, 
      startTime, 
      endTime, 
      description, 
      location 
    } = body

    console.log('Extracted engineerId:', engineerId)
    const isASAP = date === 'asap'
    
    // For scheduled appointments, require start and end time
    if (!isASAP && (!startTime || !endTime)) {
      return NextResponse.json(
        { error: 'Start time and end time are required for scheduled appointments' },
        { status: 400 }
      )
    }

    // Verify engineer exists
    console.log('Looking for engineer with ID:', engineerId)
    const engineer = await EngineersModel.findById(engineerId)
    console.log('Found engineer:', engineer)
    if (!engineer) {
      console.log('Engineer not found')
      return NextResponse.json(
        { error: 'Engineer not found or not available' },
        { status: 404 }
      )
    }

    let appointmentDate;
    
    // Skip date validation for ASAP requests
    if (!isASAP) {
      // Parse date
      appointmentDate = new Date(date)
      if (isNaN(appointmentDate.getTime())) {
        return NextResponse.json(
          { error: 'Invalid date format' },
          { status: 400 }
        )
      }

      // Check if appointment is in the past
      const now = new Date()
      if (appointmentDate < now) {
        return NextResponse.json(
          { error: 'Cannot book appointments in the past' },
          { status: 400 }
        )
      }
    } else {
      // For ASAP requests, use current date
      appointmentDate = new Date()
    }

    // Skip time validation for ASAP requests
    if (!isASAP) {
      // Validate time format (HH:MM)
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
      if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
        return NextResponse.json(
          { error: 'Invalid time format. Use HH:MM format' },
          { status: 400 }
        )
      }

      // Check if start time is before end time
      const [startHour, startMinute] = startTime.split(':').map(Number)
      const [endHour, endMinute] = endTime.split(':').map(Number)
      const startMinutes = startHour * 60 + startMinute
      const endMinutes = endHour * 60 + endMinute

      if (startMinutes >= endMinutes) {
        return NextResponse.json(
          { error: 'Start time must be before end time' },
          { status: 400 }
        )
      }

      // Check availability (double-booking prevention)
      const isAvailable = await AppointmentsModel.checkAvailability(
        engineerId, 
        appointmentDate, 
        startTime, 
        endTime
      )

      if (!isAvailable) {
        return NextResponse.json(
          { error: 'This time slot is not available. Please choose a different time.' },
          { status: 409 }
        )
      }

      // Check if engineer is available during requested hours
      const dayOfWeek = appointmentDate.getDay()
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const dayName = dayNames[dayOfWeek]
      const engineerAvailability = engineer.availability.find(
        (avail) => avail.day === dayName
      )

      if (!engineerAvailability) {
        return NextResponse.json(
          { error: 'Engineer is not available on this day of the week' },
          { status: 400 }
        )
      }

      // Check if requested time is within engineer's working hours
      const availStart = engineerAvailability.startTime
      const availEnd = engineerAvailability.endTime

      if (startTime < availStart || endTime > availEnd) {
        return NextResponse.json(
          { 
            error: `Engineer is only available from ${availStart} to ${availEnd} on this day`,
            engineerAvailability: {
              startTime: availStart,
              endTime: availEnd
            }
          },
          { status: 400 }
        )
      }
    }

    // Create the appointment
    const appointment = {
      engineerId,
      clientName,
      clientEmail,
      clientPhone: clientPhone || '',
      companyName: body.companyName || '',
      date: appointmentDate,
      startTime: startTime || 'ASAP',
      endTime: endTime || 'ASAP',
      description: description || '',
      status: 'pending' as const,
      location: location || null,
      isASAP
    }

    const result = await AppointmentsModel.create(appointment)

    // Send email notification
    try {
      await sendBookingEmail({
        engineerName: engineer.name,
        engineerRate: engineer.rate,
        clientName,
        clientEmail,
        clientPhone,
        companyName: body.companyName,
        date,
        startTime,
        description,
        isASAP: date === 'asap'
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Continue even if email fails
    }

    return NextResponse.json({
      message: 'Appointment booked successfully',
      appointmentId: result.insertedId,
      status: 'pending'
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const engineerId = searchParams.get('engineerId')
  const date = searchParams.get('date')

  if (!engineerId) {
    return NextResponse.json(
      { error: 'Engineer ID is required' },
      { status: 400 }
    )
  }

  try {
    if (date) {
      // Get appointments for specific date
      const appointmentDate = new Date(date)
      const appointments = await AppointmentsModel.findByEngineerAndDate(engineerId, appointmentDate)
      
      return NextResponse.json({
        appointments: appointments.map(apt => ({
          id: apt._id,
          startTime: apt.startTime,
          endTime: apt.endTime,
          status: apt.status,
          clientName: apt.clientName
        }))
      })
    } else {
      // Get all upcoming appointments for engineer
      const collection = await AppointmentsModel.getCollection()
      const now = new Date()
      
      const appointments = await collection.find({
        engineerId,
        date: { $gte: now },
        status: { $in: ['pending', 'confirmed'] }
      }).sort({ date: 1, startTime: 1 }).toArray()

      return NextResponse.json({
        appointments: appointments.map(apt => ({
          id: apt._id,
          date: apt.date,
          startTime: apt.startTime,
          endTime: apt.endTime,
          status: apt.status,
          clientName: apt.clientName,
          description: apt.description
        }))
      })
    }
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}