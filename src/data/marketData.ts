export interface StateMarketData {
  stateId: string;
  stateName: string;
  demandIndex: number; // 0-100
  marketSize: string;
  growthRate: number;
  complianceComplexity: 'Low' | 'Medium' | 'High';
  topCities: string[];
  monthlyTrend: { month: string; demand: number }[];
  revenueByProduct: { [key: string]: number };
}

export const products = [
  'Hemp Bags',
  'Bamboo Cups',
  'Jute Chairs',
  'Eco Plates',
  'Cotton Totes',
  'Recycled Paper Products'
];

export const metrics = [
  { value: 'demand', label: 'Demand Index' },
  { value: 'growth', label: 'Growth %' },
  { value: 'revenue', label: 'Revenue Potential' }
];

export const stateMarketData: { [key: string]: StateMarketData } = {
  'DL': {
    stateId: 'DL',
    stateName: 'Delhi',
    demandIndex: 92,
    marketSize: '₹12.4 Cr',
    growthRate: 14,
    complianceComplexity: 'Medium',
    topCities: ['Delhi NCR', 'Gurugram', 'Noida'],
    monthlyTrend: [
      { month: 'May', demand: 78 },
      { month: 'Jun', demand: 82 },
      { month: 'Jul', demand: 85 },
      { month: 'Aug', demand: 88 },
      { month: 'Sep', demand: 90 },
      { month: 'Oct', demand: 92 }
    ],
    revenueByProduct: {
      'Hemp Bags': 4.2,
      'Bamboo Cups': 2.8,
      'Jute Chairs': 3.1,
      'Eco Plates': 1.5,
      'Cotton Totes': 0.8
    }
  },
  'MH': {
    stateId: 'MH',
    stateName: 'Maharashtra',
    demandIndex: 95,
    marketSize: '₹18.7 Cr',
    growthRate: 18,
    complianceComplexity: 'High',
    topCities: ['Mumbai', 'Pune', 'Nagpur'],
    monthlyTrend: [
      { month: 'May', demand: 82 },
      { month: 'Jun', demand: 85 },
      { month: 'Jul', demand: 88 },
      { month: 'Aug', demand: 91 },
      { month: 'Sep', demand: 93 },
      { month: 'Oct', demand: 95 }
    ],
    revenueByProduct: {
      'Hemp Bags': 6.5,
      'Bamboo Cups': 4.2,
      'Jute Chairs': 4.8,
      'Eco Plates': 2.1,
      'Cotton Totes': 1.1
    }
  },
  'KA': {
    stateId: 'KA',
    stateName: 'Karnataka',
    demandIndex: 88,
    marketSize: '₹14.2 Cr',
    growthRate: 16,
    complianceComplexity: 'Medium',
    topCities: ['Bangalore', 'Mysore', 'Hubli'],
    monthlyTrend: [
      { month: 'May', demand: 75 },
      { month: 'Jun', demand: 78 },
      { month: 'Jul', demand: 82 },
      { month: 'Aug', demand: 84 },
      { month: 'Sep', demand: 86 },
      { month: 'Oct', demand: 88 }
    ],
    revenueByProduct: {
      'Hemp Bags': 5.1,
      'Bamboo Cups': 3.4,
      'Jute Chairs': 3.2,
      'Eco Plates': 1.8,
      'Cotton Totes': 0.7
    }
  },
  'TN': {
    stateId: 'TN',
    stateName: 'Tamil Nadu',
    demandIndex: 85,
    marketSize: '₹13.5 Cr',
    growthRate: 12,
    complianceComplexity: 'Medium',
    topCities: ['Chennai', 'Coimbatore', 'Madurai'],
    monthlyTrend: [
      { month: 'May', demand: 74 },
      { month: 'Jun', demand: 77 },
      { month: 'Jul', demand: 79 },
      { month: 'Aug', demand: 81 },
      { month: 'Sep', demand: 83 },
      { month: 'Oct', demand: 85 }
    ],
    revenueByProduct: {
      'Hemp Bags': 4.8,
      'Bamboo Cups': 3.1,
      'Jute Chairs': 3.5,
      'Eco Plates': 1.4,
      'Cotton Totes': 0.7
    }
  },
  'WB': {
    stateId: 'WB',
    stateName: 'West Bengal',
    demandIndex: 78,
    marketSize: '₹10.2 Cr',
    growthRate: 10,
    complianceComplexity: 'Medium',
    topCities: ['Kolkata', 'Durgapur', 'Asansol'],
    monthlyTrend: [
      { month: 'May', demand: 68 },
      { month: 'Jun', demand: 71 },
      { month: 'Jul', demand: 73 },
      { month: 'Aug', demand: 75 },
      { month: 'Sep', demand: 76 },
      { month: 'Oct', demand: 78 }
    ],
    revenueByProduct: {
      'Hemp Bags': 3.2,
      'Bamboo Cups': 2.5,
      'Jute Chairs': 3.1,
      'Eco Plates': 1.0,
      'Cotton Totes': 0.4
    }
  },
  'GJ': {
    stateId: 'GJ',
    stateName: 'Gujarat',
    demandIndex: 82,
    marketSize: '₹11.8 Cr',
    growthRate: 15,
    complianceComplexity: 'Low',
    topCities: ['Ahmedabad', 'Surat', 'Vadodara'],
    monthlyTrend: [
      { month: 'May', demand: 70 },
      { month: 'Jun', demand: 73 },
      { month: 'Jul', demand: 76 },
      { month: 'Aug', demand: 78 },
      { month: 'Sep', demand: 80 },
      { month: 'Oct', demand: 82 }
    ],
    revenueByProduct: {
      'Hemp Bags': 4.1,
      'Bamboo Cups': 2.7,
      'Jute Chairs': 3.2,
      'Eco Plates': 1.3,
      'Cotton Totes': 0.5
    }
  },
  'RJ': {
    stateId: 'RJ',
    stateName: 'Rajasthan',
    demandIndex: 68,
    marketSize: '₹7.5 Cr',
    growthRate: 9,
    complianceComplexity: 'Low',
    topCities: ['Jaipur', 'Jodhpur', 'Udaipur'],
    monthlyTrend: [
      { month: 'May', demand: 60 },
      { month: 'Jun', demand: 62 },
      { month: 'Jul', demand: 64 },
      { month: 'Aug', demand: 65 },
      { month: 'Sep', demand: 67 },
      { month: 'Oct', demand: 68 }
    ],
    revenueByProduct: {
      'Hemp Bags': 2.8,
      'Bamboo Cups': 1.9,
      'Jute Chairs': 1.7,
      'Eco Plates': 0.8,
      'Cotton Totes': 0.3
    }
  },
  'UP': {
    stateId: 'UP',
    stateName: 'Uttar Pradesh',
    demandIndex: 75,
    marketSize: '₹9.8 Cr',
    growthRate: 11,
    complianceComplexity: 'Medium',
    topCities: ['Noida', 'Lucknow', 'Kanpur'],
    monthlyTrend: [
      { month: 'May', demand: 65 },
      { month: 'Jun', demand: 68 },
      { month: 'Jul', demand: 70 },
      { month: 'Aug', demand: 72 },
      { month: 'Sep', demand: 74 },
      { month: 'Oct', demand: 75 }
    ],
    revenueByProduct: {
      'Hemp Bags': 3.5,
      'Bamboo Cups': 2.3,
      'Jute Chairs': 2.6,
      'Eco Plates': 1.0,
      'Cotton Totes': 0.4
    }
  },
  'HR': {
    stateId: 'HR',
    stateName: 'Haryana',
    demandIndex: 80,
    marketSize: '₹8.9 Cr',
    growthRate: 13,
    complianceComplexity: 'Low',
    topCities: ['Gurugram', 'Faridabad', 'Panchkula'],
    monthlyTrend: [
      { month: 'May', demand: 69 },
      { month: 'Jun', demand: 72 },
      { month: 'Jul', demand: 75 },
      { month: 'Aug', demand: 77 },
      { month: 'Sep', demand: 79 },
      { month: 'Oct', demand: 80 }
    ],
    revenueByProduct: {
      'Hemp Bags': 3.2,
      'Bamboo Cups': 2.1,
      'Jute Chairs': 2.4,
      'Eco Plates': 0.9,
      'Cotton Totes': 0.3
    }
  },
  'PB': {
    stateId: 'PB',
    stateName: 'Punjab',
    demandIndex: 65,
    marketSize: '₹6.2 Cr',
    growthRate: 8,
    complianceComplexity: 'Low',
    topCities: ['Chandigarh', 'Ludhiana', 'Amritsar'],
    monthlyTrend: [
      { month: 'May', demand: 58 },
      { month: 'Jun', demand: 60 },
      { month: 'Jul', demand: 61 },
      { month: 'Aug', demand: 63 },
      { month: 'Sep', demand: 64 },
      { month: 'Oct', demand: 65 }
    ],
    revenueByProduct: {
      'Hemp Bags': 2.3,
      'Bamboo Cups': 1.5,
      'Jute Chairs': 1.6,
      'Eco Plates': 0.6,
      'Cotton Totes': 0.2
    }
  },
  'TG': {
    stateId: 'TG',
    stateName: 'Telangana',
    demandIndex: 86,
    marketSize: '₹11.3 Cr',
    growthRate: 17,
    complianceComplexity: 'Medium',
    topCities: ['Hyderabad', 'Warangal', 'Nizamabad'],
    monthlyTrend: [
      { month: 'May', demand: 73 },
      { month: 'Jun', demand: 77 },
      { month: 'Jul', demand: 80 },
      { month: 'Aug', demand: 82 },
      { month: 'Sep', demand: 84 },
      { month: 'Oct', demand: 86 }
    ],
    revenueByProduct: {
      'Hemp Bags': 4.0,
      'Bamboo Cups': 2.8,
      'Jute Chairs': 2.9,
      'Eco Plates': 1.2,
      'Cotton Totes': 0.4
    }
  },
  'AP': {
    stateId: 'AP',
    stateName: 'Andhra Pradesh',
    demandIndex: 72,
    marketSize: '₹8.1 Cr',
    growthRate: 10,
    complianceComplexity: 'Low',
    topCities: ['Visakhapatnam', 'Vijayawada', 'Guntur'],
    monthlyTrend: [
      { month: 'May', demand: 64 },
      { month: 'Jun', demand: 66 },
      { month: 'Jul', demand: 68 },
      { month: 'Aug', demand: 70 },
      { month: 'Sep', demand: 71 },
      { month: 'Oct', demand: 72 }
    ],
    revenueByProduct: {
      'Hemp Bags': 2.9,
      'Bamboo Cups': 1.9,
      'Jute Chairs': 2.1,
      'Eco Plates': 0.9,
      'Cotton Totes': 0.3
    }
  },
  'KL': {
    stateId: 'KL',
    stateName: 'Kerala',
    demandIndex: 70,
    marketSize: '₹7.8 Cr',
    growthRate: 9,
    complianceComplexity: 'Low',
    topCities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
    monthlyTrend: [
      { month: 'May', demand: 62 },
      { month: 'Jun', demand: 64 },
      { month: 'Jul', demand: 66 },
      { month: 'Aug', demand: 67 },
      { month: 'Sep', demand: 69 },
      { month: 'Oct', demand: 70 }
    ],
    revenueByProduct: {
      'Hemp Bags': 2.7,
      'Bamboo Cups': 1.8,
      'Jute Chairs': 2.0,
      'Eco Plates': 0.9,
      'Cotton Totes': 0.4
    }
  },
  'OR': {
    stateId: 'OR',
    stateName: 'Odisha',
    demandIndex: 62,
    marketSize: '₹5.4 Cr',
    growthRate: 7,
    complianceComplexity: 'Low',
    topCities: ['Bhubaneswar', 'Cuttack', 'Rourkela'],
    monthlyTrend: [
      { month: 'May', demand: 56 },
      { month: 'Jun', demand: 58 },
      { month: 'Jul', demand: 59 },
      { month: 'Aug', demand: 60 },
      { month: 'Sep', demand: 61 },
      { month: 'Oct', demand: 62 }
    ],
    revenueByProduct: {
      'Hemp Bags': 2.0,
      'Bamboo Cups': 1.3,
      'Jute Chairs': 1.4,
      'Eco Plates': 0.5,
      'Cotton Totes': 0.2
    }
  },
  'MP': {
    stateId: 'MP',
    stateName: 'Madhya Pradesh',
    demandIndex: 58,
    marketSize: '₹5.9 Cr',
    growthRate: 6,
    complianceComplexity: 'Low',
    topCities: ['Indore', 'Bhopal', 'Gwalior'],
    monthlyTrend: [
      { month: 'May', demand: 52 },
      { month: 'Jun', demand: 54 },
      { month: 'Jul', demand: 55 },
      { month: 'Aug', demand: 56 },
      { month: 'Sep', demand: 57 },
      { month: 'Oct', demand: 58 }
    ],
    revenueByProduct: {
      'Hemp Bags': 2.1,
      'Bamboo Cups': 1.4,
      'Jute Chairs': 1.5,
      'Eco Plates': 0.6,
      'Cotton Totes': 0.3
    }
  },
  'CG': {
    stateId: 'CG',
    stateName: 'Chhattisgarh',
    demandIndex: 48,
    marketSize: '₹3.2 Cr',
    growthRate: 5,
    complianceComplexity: 'Low',
    topCities: ['Raipur', 'Bhilai', 'Bilaspur'],
    monthlyTrend: [
      { month: 'May', demand: 44 },
      { month: 'Jun', demand: 45 },
      { month: 'Jul', demand: 46 },
      { month: 'Aug', demand: 47 },
      { month: 'Sep', demand: 47 },
      { month: 'Oct', demand: 48 }
    ],
    revenueByProduct: {
      'Hemp Bags': 1.2,
      'Bamboo Cups': 0.8,
      'Jute Chairs': 0.7,
      'Eco Plates': 0.3,
      'Cotton Totes': 0.2
    }
  },
  'JH': {
    stateId: 'JH',
    stateName: 'Jharkhand',
    demandIndex: 52,
    marketSize: '₹4.1 Cr',
    growthRate: 6,
    complianceComplexity: 'Low',
    topCities: ['Ranchi', 'Jamshedpur', 'Dhanbad'],
    monthlyTrend: [
      { month: 'May', demand: 47 },
      { month: 'Jun', demand: 48 },
      { month: 'Jul', demand: 49 },
      { month: 'Aug', demand: 50 },
      { month: 'Sep', demand: 51 },
      { month: 'Oct', demand: 52 }
    ],
    revenueByProduct: {
      'Hemp Bags': 1.5,
      'Bamboo Cups': 1.0,
      'Jute Chairs': 1.0,
      'Eco Plates': 0.4,
      'Cotton Totes': 0.2
    }
  },
  'BR': {
    stateId: 'BR',
    stateName: 'Bihar',
    demandIndex: 55,
    marketSize: '₹4.8 Cr',
    growthRate: 7,
    complianceComplexity: 'Low',
    topCities: ['Patna', 'Gaya', 'Bhagalpur'],
    monthlyTrend: [
      { month: 'May', demand: 49 },
      { month: 'Jun', demand: 51 },
      { month: 'Jul', demand: 52 },
      { month: 'Aug', demand: 53 },
      { month: 'Sep', demand: 54 },
      { month: 'Oct', demand: 55 }
    ],
    revenueByProduct: {
      'Hemp Bags': 1.7,
      'Bamboo Cups': 1.1,
      'Jute Chairs': 1.2,
      'Eco Plates': 0.5,
      'Cotton Totes': 0.3
    }
  },
  'AS': {
    stateId: 'AS',
    stateName: 'Assam',
    demandIndex: 60,
    marketSize: '₹5.2 Cr',
    growthRate: 8,
    complianceComplexity: 'Low',
    topCities: ['Guwahati', 'Silchar', 'Dibrugarh'],
    monthlyTrend: [
      { month: 'May', demand: 54 },
      { month: 'Jun', demand: 56 },
      { month: 'Jul', demand: 57 },
      { month: 'Aug', demand: 58 },
      { month: 'Sep', demand: 59 },
      { month: 'Oct', demand: 60 }
    ],
    revenueByProduct: {
      'Hemp Bags': 1.9,
      'Bamboo Cups': 1.3,
      'Jute Chairs': 1.3,
      'Eco Plates': 0.5,
      'Cotton Totes': 0.2
    }
  },
  'GA': {
    stateId: 'GA',
    stateName: 'Goa',
    demandIndex: 76,
    marketSize: '₹3.9 Cr',
    growthRate: 12,
    complianceComplexity: 'Low',
    topCities: ['Panaji', 'Vasco', 'Margao'],
    monthlyTrend: [
      { month: 'May', demand: 68 },
      { month: 'Jun', demand: 70 },
      { month: 'Jul', demand: 72 },
      { month: 'Aug', demand: 73 },
      { month: 'Sep', demand: 75 },
      { month: 'Oct', demand: 76 }
    ],
    revenueByProduct: {
      'Hemp Bags': 1.4,
      'Bamboo Cups': 0.9,
      'Jute Chairs': 1.0,
      'Eco Plates': 0.4,
      'Cotton Totes': 0.2
    }
  },
  'HP': {
    stateId: 'HP',
    stateName: 'Himachal Pradesh',
    demandIndex: 54,
    marketSize: '₹3.5 Cr',
    growthRate: 7,
    complianceComplexity: 'Low',
    topCities: ['Shimla', 'Dharamshala', 'Manali'],
    monthlyTrend: [
      { month: 'May', demand: 48 },
      { month: 'Jun', demand: 50 },
      { month: 'Jul', demand: 51 },
      { month: 'Aug', demand: 52 },
      { month: 'Sep', demand: 53 },
      { month: 'Oct', demand: 54 }
    ],
    revenueByProduct: {
      'Hemp Bags': 1.3,
      'Bamboo Cups': 0.8,
      'Jute Chairs': 0.9,
      'Eco Plates': 0.3,
      'Cotton Totes': 0.2
    }
  },
  'UT': {
    stateId: 'UT',
    stateName: 'Uttarakhand',
    demandIndex: 56,
    marketSize: '₹4.2 Cr',
    growthRate: 8,
    complianceComplexity: 'Low',
    topCities: ['Dehradun', 'Haridwar', 'Nainital'],
    monthlyTrend: [
      { month: 'May', demand: 50 },
      { month: 'Jun', demand: 52 },
      { month: 'Jul', demand: 53 },
      { month: 'Aug', demand: 54 },
      { month: 'Sep', demand: 55 },
      { month: 'Oct', demand: 56 }
    ],
    revenueByProduct: {
      'Hemp Bags': 1.5,
      'Bamboo Cups': 1.0,
      'Jute Chairs': 1.1,
      'Eco Plates': 0.4,
      'Cotton Totes': 0.2
    }
  }
};

export const getDemandColor = (demandIndex: number): string => {
  if (demandIndex >= 85) return '#065F46'; // Very High - Dark green
  if (demandIndex >= 70) return '#059669'; // High - Green
  if (demandIndex >= 55) return '#34D399'; // Moderate - Medium green
  if (demandIndex >= 40) return '#6EE7B7'; // Low - Light green
  return '#A7F3D0'; // Very Low - Lightest green
};

export const getMetricValue = (state: StateMarketData, metric: string): number => {
  switch (metric) {
    case 'demand':
      return state.demandIndex;
    case 'growth':
      return state.growthRate;
    case 'revenue':
      return parseFloat(state.marketSize.replace('₹', '').replace(' Cr', ''));
    default:
      return state.demandIndex;
  }
};
