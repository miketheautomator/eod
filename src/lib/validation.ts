import { z } from 'zod'

export const bookingSchema = z.object({
  engineerId: z.string().min(1, 'Engineer selection is required'),
  engineerName: z.string().min(1, 'Engineer name is required'),
  engineerRate: z.number().positive('Engineer rate must be positive'),
  
  // Client info validation
  clientName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  companyName: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),
  
  clientEmail: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters')
    .toLowerCase(),
  
  clientPhone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[\+]?[1-9][\d\s\-\(\)\.]{9,19}$/, 'Please enter a valid phone number'),
  
  // Description validation
  description: z.string()
    .min(60, 'Please provide a detailed description (minimum 60 characters)')
    .max(2000, 'Description must be less than 2000 characters'),
  
  // Timing validation
  date: z.string().min(1, 'Please select when you need help'),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  
  // Optional fields
  location: z.any().optional(),
})
.refine((data) => {
  // If not ASAP, require start and end time
  if (data.date !== 'asap') {
    return data.startTime && data.endTime
  }
  return true
}, {
  message: 'Start time and end time are required for scheduled appointments',
  path: ['startTime']
})

export type BookingFormData = z.infer<typeof bookingSchema>

// Client-side validation helpers
export const validateEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success
}

export const validatePhone = (phone: string): boolean => {
  return z.string().regex(/^[\+]?[1-9][\d\s\-\(\)\.]{9,19}$/).safeParse(phone).success
}

export const validateName = (name: string): boolean => {
  return z.string().min(2).max(50).regex(/^[a-zA-Z\s'-]+$/).safeParse(name).success
}

export const validateCompany = (company: string): boolean => {
  return z.string().min(2).max(100).safeParse(company).success
}

export const validateDescription = (description: string): boolean => {
  return z.string().min(60).max(2000).safeParse(description).success
}