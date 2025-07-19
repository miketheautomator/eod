export interface Engineer {
  _id?: string
  name: string
  email: string
  photo?: string
  skills: string[]
  rate: number
  location: {
    zipCode: string
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  availability: {
    day: string
    startTime: string
    endTime: string
  }[]
  radius: number
  status: string
  yearsExperience?: number | string
  companies?: string[]
  bio?: string
  specialties?: string[]
  services?: string[]
  distance?: number
  isLocal?: boolean
}

export interface Appointment {
  _id?: string
  engineerId: string
  clientName: string
  clientEmail: string
  clientPhone: string
  date: Date
  startTime: string
  endTime: string
  description: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  location: {
    zipCode: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  createdAt: Date
  updatedAt: Date
}

export interface EarlyAccessRequest {
  _id?: string
  email: string
  zipCode: string
  requestedSkills?: string[]
  createdAt: Date
}