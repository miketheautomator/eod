import { NextResponse } from 'next/server'
import { EngineersModel } from '@/lib/models'

export async function GET() {
  try {
    const pricing = await EngineersModel.getAveragePricing()
    
    if (!pricing) {
      return NextResponse.json({
        avgRemotePerMinute: null,
        avgLocalPerMinute: null,
        avgRemoteRate: null,
        avgLocalRate: null
      })
    }

    return NextResponse.json(pricing)
  } catch (error) {
    console.error('Error fetching pricing:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pricing' },
      { status: 500 }
    )
  }
}