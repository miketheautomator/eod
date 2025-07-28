import clientPromise from './mongodb'
import { Engineer, Appointment, EarlyAccessRequest } from '@/types/global'
import { ObjectId } from 'mongodb'

const DATABASE_NAME = process.env.MONGODB_DATABASE || 'tilt-engineer-on-demand'

export class EngineersModel {
  static async getCollection() {
    const client = await clientPromise
    return client.db(DATABASE_NAME).collection<Engineer>('engineers')
  }

  static async findAll() {
    const collection = await this.getCollection()
    return collection.find({}).toArray()
  }

  static async findByLocation(lat: number, lng: number, radius: number) {
    const collection = await this.getCollection()
    return collection.find({}).toArray()
  }

  static async findRemoteEngineers() {
    const collection = await this.getCollection()
    return collection.find({ 
      remoteRate: { $exists: true, $gt: 0 },
      status: 'active'
    }).toArray()
  }

  static async getAveragePricing() {
    const collection = await this.getCollection()
    const engineers = await collection.find({ status: 'active' }).toArray()
    
    if (engineers.length === 0) return null
    
    let totalRemoteRate = 0
    let totalLocalRate = 0
    let remoteCount = 0
    let localCount = 0
    
    engineers.forEach(engineer => {
      if (engineer.remoteRate && engineer.remoteRate > 0) {
        totalRemoteRate += engineer.remoteRate
        remoteCount++
      }
      if (engineer.localRate && engineer.localRate > 0) {
        totalLocalRate += engineer.localRate
        localCount++
      }
      // Fallback to old rate field if exists
      if (!engineer.remoteRate && !engineer.localRate && (engineer as any).rate && (engineer as any).rate > 0) {
        totalLocalRate += (engineer as any).rate
        localCount++
      }
    })
    
    return {
      avgRemoteRate: remoteCount > 0 ? Math.round(totalRemoteRate / remoteCount) : null,
      avgLocalRate: localCount > 0 ? Math.round(totalLocalRate / localCount) : null,
      avgRemotePerMinute: remoteCount > 0 ? Math.round((totalRemoteRate / remoteCount) / 60) : null,
      avgLocalPerMinute: localCount > 0 ? Math.round((totalLocalRate / localCount) / 60) : null,
    }
  }

  static async findById(id: string) {
    const collection = await this.getCollection()
    return collection.findOne({ _id: new ObjectId(id) })
  }

  static async create(engineer: Omit<Engineer, '_id'>) {
    const collection = await this.getCollection()
    return collection.insertOne(engineer)
  }
}

export class AppointmentsModel {
  static async getCollection() {
    const client = await clientPromise
    return client.db(DATABASE_NAME).collection<Appointment>('appointments')
  }

  static async findByEngineerAndDate(engineerId: string, date: Date) {
    const collection = await this.getCollection()
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    return collection.find({
      engineerId,
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['pending', 'confirmed'] }
    }).toArray()
  }

  static async create(appointment: Omit<Appointment, '_id' | 'createdAt' | 'updatedAt'>) {
    const collection = await this.getCollection()
    const now = new Date()
    return collection.insertOne({
      ...appointment,
      createdAt: now,
      updatedAt: now
    })
  }

  static async createBookingRequest(request: {
    engineerId: string;
    engineerName: string;
    engineerRate: number;
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    companyName?: string;
    date: string;
    startTime?: string;
    endTime?: string;
    description?: string;
    isASAP: boolean;
    location?: { zipCode: string; coordinates: { lat: number; lng: number } };
  }) {
    const collection = await this.getCollection()
    const now = new Date()
    return collection.insertOne({
      ...request,
      status: 'pending',
      type: 'booking_request',
      createdAt: now,
      updatedAt: now
    })
  }

  static async checkAvailability(engineerId: string, date: Date, startTime: string, endTime: string) {
    const existingAppointments = await this.findByEngineerAndDate(engineerId, date)
    
    for (const appointment of existingAppointments) {
      const existingStart = appointment.startTime
      const existingEnd = appointment.endTime
      
      // Skip if appointment times are undefined (e.g., ASAP requests)
      if (!existingStart || !existingEnd) {
        continue
      }
      
      // Check for time overlap
      if (
        (startTime >= existingStart && startTime < existingEnd) ||
        (endTime > existingStart && endTime <= existingEnd) ||
        (startTime <= existingStart && endTime >= existingEnd)
      ) {
        return false // Time slot is not available
      }
    }
    
    return true // Time slot is available
  }
}

export class EarlyAccessModel {
  static async getCollection() {
    const client = await clientPromise
    return client.db(DATABASE_NAME).collection<EarlyAccessRequest>('earlyAccess')
  }

  static async create(request: Omit<EarlyAccessRequest, '_id' | 'createdAt'>) {
    const collection = await this.getCollection()
    return collection.insertOne({
      ...request,
      createdAt: new Date()
    })
  }

  static async findByEmail(email: string) {
    const collection = await this.getCollection()
    return collection.findOne({ email })
  }
}