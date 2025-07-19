import { NextRequest, NextResponse } from 'next/server'
import { AppointmentsModel } from '@/lib/models'
import { sendBookingEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      engineerId, 
      engineerName,
      engineerRate,
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

    // Validate required fields
    if (!engineerId || !engineerName || !engineerRate || !clientName || !clientEmail || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const isASAP = date === 'asap'

    // Store booking request in MongoDB
    const bookingRequest = {
      engineerId,
      engineerName,
      engineerRate,
      clientName,
      clientEmail,
      clientPhone,
      companyName,
      date,
      startTime,
      endTime,
      description,
      isASAP,
      location
    }

    const dbResult = await AppointmentsModel.createBookingRequest(bookingRequest)
    console.log('Booking request stored in DB:', dbResult.insertedId)

    // Send email notification
    try {
      const emailResult = await sendBookingEmail({
        engineerName,
        engineerRate,
        clientName,
        clientEmail,
        clientPhone,
        companyName,
        date,
        startTime,
        description,
        isASAP
      })
      console.log('Email sent successfully:', emailResult.messageId)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Continue even if email fails - we still have the DB record
    }

    return NextResponse.json({
      message: 'Booking request submitted successfully',
      requestId: dbResult.insertedId
    }, { status: 201 })

  } catch (error) {
    console.error('Error processing booking request:', error)
    return NextResponse.json(
      { error: 'Failed to process booking request' },
      { status: 500 }
    )
  }
}