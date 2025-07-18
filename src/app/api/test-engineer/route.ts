import { NextRequest, NextResponse } from 'next/server'
import { EngineersModel } from '@/lib/models'

export async function POST(request: NextRequest) {
  try {
    // Create a test engineer near Chiapas, Mexico
    const testEngineer = {
      name: "Carlos Rodriguez",
      email: "carlos@example.com",
      skills: ["JavaScript", "React", "Node.js", "Python"],
      hourlyRate: 45,
      location: {
        zipCode: "29000", // Tuxtla Gutierrez area
        coordinates: {
          lat: 16.7569, // Very close to user's location
          lng: -93.1292
        }
      },
      availability: [
        {
          dayOfWeek: 1, // Monday
          startTime: "09:00",
          endTime: "17:00"
        },
        {
          dayOfWeek: 2, // Tuesday
          startTime: "09:00", 
          endTime: "17:00"
        },
        {
          dayOfWeek: 3, // Wednesday
          startTime: "09:00",
          endTime: "17:00"
        }
      ],
      isActive: true
    }

    const result = await EngineersModel.create(testEngineer)
    
    return NextResponse.json({
      message: 'Test engineer created successfully',
      engineerId: result.insertedId
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating test engineer:', error)
    return NextResponse.json(
      { error: 'Failed to create test engineer' },
      { status: 500 }
    )
  }
}