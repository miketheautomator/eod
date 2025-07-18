import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    )
  }

  try {
    // Using a free geocoding service (you can replace with your preferred service)
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    )
    
    const data = await response.json()
    
    // Extract zip code from the response
    const zipCode = data.postcode || data.postalCode || null
    
    if (!zipCode) {
      return NextResponse.json(
        { error: 'Could not determine zip code for this location' },
        { status: 404 }
      )
    }

    return NextResponse.json({ zipCode })
  } catch (error) {
    console.error('Geocoding error:', error)
    return NextResponse.json(
      { error: 'Failed to reverse geocode location' },
      { status: 500 }
    )
  }
}