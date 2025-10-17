import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const smartMeterId = searchParams.get('smart_meter_id') || 'T284'

    const response = await fetch(
      `https://az-api-iwn-hackathon-demo-b0exa5duacasdpc0.australiasoutheast-01.azurewebsites.net/inference/?smart_meter_id=${smartMeterId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )

    const data = await response.json()
    
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data from API' },
      { status: 500 }
    )
  }
}
