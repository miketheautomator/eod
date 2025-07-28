import { NextRequest, NextResponse } from 'next/server'
import { EngineersModel } from '@/lib/models'
import { calculateDistance } from '@/lib/geolocation'
import { Engineer } from '@/types/global'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const radius = parseInt(searchParams.get('radius') || '50')

  console.log('Engineers API called with:', { lat, lng, radius })

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    )
  }

  try {
    const userLat = parseFloat(lat)
    const userLng = parseFloat(lng)
    
    // Get all engineers and filter by distance
    const allEngineers = await EngineersModel.findByLocation(userLat, userLng, radius)
    console.log(`Found ${allEngineers.length} total engineers`)
    
    const engineersWithDistance = allEngineers.map(engineer => {
      if (!engineer.location.coordinates) {
        console.log(`Engineer ${engineer.name} has no coordinates`)
        return { ...engineer, distance: 999, isLocal: false }
      }
      
      const distance = calculateDistance(
        userLat,
        userLng,
        engineer.location.coordinates.lat,
        engineer.location.coordinates.lng
      )
      
      console.log(`Engineer ${engineer.name} is ${distance.toFixed(2)} miles away`)
      const isLocal = distance <= engineer.radius
      
      return { ...engineer, distance, isLocal }
    })
    
    // Sort by distance, show local first, then closest non-local
    const sortedEngineers = engineersWithDistance
      .sort((a, b) => {
        if (a.isLocal && !b.isLocal) return -1
        if (!a.isLocal && b.isLocal) return 1
        return a.distance - b.distance
      })
      .slice(0, 3) // Show max 3 engineers
    
    const localCount = sortedEngineers.filter(e => e.isLocal).length
    console.log(`Showing ${sortedEngineers.length} engineers (${localCount} local, ${sortedEngineers.length - localCount} non-local)`)

    // If no local engineers found, fetch remote engineers from database
    let finalEngineers = sortedEngineers
    if (localCount === 0) {
      const remoteEngineers = await EngineersModel.findRemoteEngineers()
      console.log(`Found ${remoteEngineers.length} remote engineers`)
      
      // Mark them as remote and add to final list
      finalEngineers = remoteEngineers.map((engineer: Engineer) => ({
        ...engineer,
        distance: 0,
        isLocal: false,
        isRemote: true
      })).slice(0, 3) // Limit to 3 remote engineers
    }

    return NextResponse.json({
      engineers: finalEngineers,
      count: finalEngineers.length,
      localCount,
      hasRemoteEngineers: localCount === 0
    })
  } catch (error) {
    console.error('Error fetching engineers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch engineers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, skills, hourlyRate, location, availability } = body

    // Validate required fields
    if (!name || !email || !skills || !hourlyRate || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await EngineersModel.create({
      name,
      email,
      skills,
      localRate: hourlyRate,
      location,
      availability: availability || [],
      radius: 25, // Default radius
      status: 'active' // Default status
    })

    return NextResponse.json({
      message: 'Engineer created successfully',
      engineerId: result.insertedId
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating engineer:', error)
    return NextResponse.json(
      { error: 'Failed to create engineer' },
      { status: 500 }
    )
  }
}