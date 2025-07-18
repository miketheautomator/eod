export interface Engineer {
  _id?: string
  name: string
  email: string
  skills: string[]
  hourlyRate: number
  location: {
    zipCode: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  availability: {
    dayOfWeek: number // 0-6 (Sunday-Saturday)
    startTime: string // "09:00"
    endTime: string // "17:00"
  }[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
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