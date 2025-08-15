import { NextResponse } from 'next/server';

// Mock data for KYC Dashboard
const mockData = {
  totalKyc: {
    newKyc: {
      count: 1234,
      percentageChange: 12.5,
      trend: 'up'
    },
    modifiedKyc: {
      count: 567,
      percentageChange: -8.3,
      trend: 'down'
    }
  },
  chartData: {
    individual: {
      today: 450,
      yesterday: 380
    },
    nonIndividual: {
      today: 230,
      yesterday: 280
    }
  },
  kycStatus: {
    initiated: 145,
    underProcess: 89,
    registered: 234,
    validated: 567,
    hold: 23,
    docsPending: 67
  },
  categories: {
    individual: {
      ri: { current: 85, total: 100 },
      nri: { current: 72, total: 100 }
    },
    nonIndividual: {
      ri: { current: 92, total: 100 },
      nri: { current: 68, total: 100 }
    }
  },
  solicitation: {
    pansSolicited: 1250,
    received: 980,
    consumed: 756,
    pending: 224
  },
  panStats: {
    solicited: {
      withImage: 890,
      withoutImage: 360
    },
    dataReceived: {
      withImage: 720,
      withoutImage: 260
    }
  }
};

export async function GET(request) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || 'today';
    const viewType = searchParams.get('viewType') || 'individual';
    
    // You can modify data based on timeframe and viewType if needed
    let responseData = { ...mockData };
    
    if (timeframe === 'thisMonth') {
      // Modify data for monthly view
      responseData.totalKyc.newKyc.count = 5670;
      responseData.totalKyc.modifiedKyc.count = 2340;
    }
    
    return NextResponse.json({
      success: true,
      data: responseData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}