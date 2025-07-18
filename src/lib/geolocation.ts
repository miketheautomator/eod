export interface Location {
  latitude: number
  longitude: number
  zipCode?: string
}

export function getCurrentLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'))
      return
    }

    // Check if we're in a secure context (required for geolocation)
    if (!window.isSecureContext) {
      reject(new Error('Geolocation requires a secure context (HTTPS) or localhost'))
      return
    }

    console.log('Requesting location permission...')
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log('Geolocation success:', position)
        const { latitude, longitude } = position.coords
        console.log('Coordinates:', { latitude, longitude })
        
        // Don't try to get zip code, just use coordinates
        console.log('Returning coordinates:', { latitude, longitude })
        resolve({ latitude, longitude })
      },
      (error) => {
        console.log('Geolocation error:', error)
        let errorMessage = 'Unable to access your location'
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services and refresh the page.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.'
            break
        }
        reject(new Error(errorMessage))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  })
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    // Use relative URL so it works with any base URL
    const response = await fetch(`/api/geocode?lat=${lat}&lng=${lng}`)
    console.log('Geocoding response status:', response.status)
    
    if (!response.ok) {
      throw new Error(`Geocoding API returned ${response.status}`)
    }
    
    const data = await response.json()
    console.log('Geocoding response data:', data)
    return data.zipCode
  } catch (error) {
    console.log('Reverse geocoding error:', error)
    throw new Error('Failed to get zip code from coordinates')
  }
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959 // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}