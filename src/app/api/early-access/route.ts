import { NextRequest, NextResponse } from 'next/server'
import { EarlyAccessModel } from '@/lib/models'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, zipCode, requestedSkills } = body

    // Validate required fields
    if (!email || !zipCode) {
      return NextResponse.json(
        { error: 'Email and zip code are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate zip code format (5 digits)
    const zipRegex = /^\d{5}$/
    if (!zipRegex.test(zipCode)) {
      return NextResponse.json(
        { error: 'Invalid zip code format. Please use 5 digits' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existing = await EarlyAccessModel.findByEmail(email)
    if (existing) {
      return NextResponse.json(
        { error: 'This email is already registered for early access' },
        { status: 409 }
      )
    }

    // Create early access request
    const earlyAccessRequest = {
      email,
      zipCode,
      requestedSkills: Array.isArray(requestedSkills) ? requestedSkills : []
    }

    const result = await EarlyAccessModel.create(earlyAccessRequest)

    return NextResponse.json({
      message: 'Early access request submitted successfully',
      requestId: result.insertedId
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating early access request:', error)
    return NextResponse.json(
      { error: 'Failed to submit early access request' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const zipCode = searchParams.get('zipCode')

  try {
    const collection = await EarlyAccessModel.getCollection()
    
    let query = {}
    if (zipCode) {
      query = { zipCode }
    }

    const requests = await collection.find(query).toArray()
    
    return NextResponse.json({
      requests: requests.map(req => ({
        id: req._id,
        zipCode: req.zipCode,
        requestedSkills: req.requestedSkills,
        createdAt: req.createdAt
      })),
      count: requests.length
    })
  } catch (error) {
    console.error('Error fetching early access requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch early access requests' },
      { status: 500 }
    )
  }
}