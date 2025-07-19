import { ObjectId } from 'mongodb'

export interface Engineer {
  _id?: string | ObjectId
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
  _id?: string | ObjectId
  engineerId: string
  engineerName?: string
  engineerRate?: number
  clientName: string
  clientEmail: string
  clientPhone?: string
  companyName?: string
  date: Date | string
  startTime?: string
  endTime?: string
  description?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  location?: {
    zipCode: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  type?: string
  isASAP?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface EarlyAccessRequest {
  _id?: string | ObjectId
  email: string
  zipCode: string
  requestedSkills?: string[]
  createdAt: Date
}