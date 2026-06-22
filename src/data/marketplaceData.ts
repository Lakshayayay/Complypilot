export interface ComplianceProvider {
  id: string;
  name: string;
  logo: string;
  description: string;
  services: string[];
  rating: number;
  reviewCount: number;
  pricing: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  specializations: string[];
  yearsInBusiness: number;
  clientsServed: number;
  statesServed: string[]; // States where provider has strong presence
  headquarterState: string; // Main office location
}

export const complianceProviders: ComplianceProvider[] = [
  {
    id: '1',
    name: 'LegalKart',
    logo: '⚖️',
    description: 'End-to-end compliance solutions for startups and SMEs. Trusted by 5,000+ businesses across India.',
    services: ['Company Registration', 'GST Filing', 'Tax Compliance', 'Legal Documentation', 'Trademark Registration'],
    rating: 4.8,
    reviewCount: 1250,
    pricing: '₹5,000/month onwards',
    contactEmail: 'support@legalkart.com',
    contactPhone: '+91 98765 43210',
    website: 'www.legalkart.com',
    specializations: ['Startups', 'SMEs', 'E-commerce'],
    yearsInBusiness: 8,
    clientsServed: 5000,
    statesServed: ['Delhi', 'Maharashtra', 'Karnataka', 'Haryana', 'Uttar Pradesh', 'Gujarat', 'Tamil Nadu', 'Telangana'],
    headquarterState: 'Delhi'
  },
  {
    id: '2',
    name: 'Vakilsearch',
    logo: '📋',
    description: 'India\'s leading legal services platform with expert CA and CS professionals for all compliance needs.',
    services: ['Annual Compliance', 'ROC Filing', 'Income Tax Returns', 'Payroll Management', 'Audit Services'],
    rating: 4.7,
    reviewCount: 3500,
    pricing: '₹8,000/month onwards',
    contactEmail: 'hello@vakilsearch.com',
    contactPhone: '+91 80 4718 1600',
    website: 'www.vakilsearch.com',
    specializations: ['Pvt Ltd Companies', 'LLPs', 'Tax Advisory'],
    yearsInBusiness: 10,
    clientsServed: 15000,
    statesServed: ['Karnataka', 'Tamil Nadu', 'Telangana', 'Kerala', 'Andhra Pradesh', 'Maharashtra', 'Delhi', 'Gujarat'],
    headquarterState: 'Karnataka'
  },
  {
    id: '3',
    name: 'IndiaFilings',
    logo: '📁',
    description: 'Complete business registration and compliance services with quick turnaround and dedicated support.',
    services: ['Business Registration', 'GST Registration', 'Import-Export Code', 'FSSAI License', 'Digital Signatures'],
    rating: 4.6,
    reviewCount: 2100,
    pricing: '₹6,500/month onwards',
    contactEmail: 'care@indiafilings.com',
    contactPhone: '+91 80 4718 1700',
    website: 'www.indiafilings.com',
    specializations: ['New Business Setup', 'Licensing', 'Registrations'],
    yearsInBusiness: 9,
    clientsServed: 10000,
    statesServed: ['Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Goa', 'Delhi'],
    headquarterState: 'Karnataka'
  },
  {
    id: '4',
    name: 'ClearTax',
    logo: '💼',
    description: 'Simplified tax and GST filing platform with automated compliance tracking and expert assistance.',
    services: ['GST Filing', 'Income Tax Filing', 'TDS Returns', 'Tax Planning', 'E-Invoicing'],
    rating: 4.9,
    reviewCount: 5000,
    pricing: '₹4,500/month onwards',
    contactEmail: 'support@cleartax.in',
    contactPhone: '+91 80 6719 9000',
    website: 'www.cleartax.in',
    specializations: ['Tax Compliance', 'GST', 'E-invoicing'],
    yearsInBusiness: 11,
    clientsServed: 20000,
    statesServed: ['Karnataka', 'Maharashtra', 'Delhi', 'Gujarat', 'Tamil Nadu', 'Haryana', 'Uttar Pradesh', 'Rajasthan', 'West Bengal', 'Punjab'],
    headquarterState: 'Karnataka'
  },
  {
    id: '5',
    name: 'ComplianceKart',
    logo: '✅',
    description: 'Specialized in ongoing compliance management with AI-powered deadline tracking and reminders.',
    services: ['Annual Filing', 'Board Meetings', 'Statutory Registers', 'Share Transfers', 'Compliance Calendar'],
    rating: 4.5,
    reviewCount: 850,
    pricing: '₹7,000/month onwards',
    contactEmail: 'info@compliancekart.com',
    contactPhone: '+91 11 4567 8900',
    website: 'www.compliancekart.com',
    specializations: ['Corporate Compliance', 'Board Management', 'Secretarial Services'],
    yearsInBusiness: 6,
    clientsServed: 3500,
    statesServed: ['Delhi', 'Haryana', 'Uttar Pradesh', 'Punjab', 'Rajasthan', 'Maharashtra', 'Gujarat'],
    headquarterState: 'Delhi'
  },
  {
    id: '6',
    name: 'MyLegalCounsel',
    logo: '🏛️',
    description: 'Premium legal and compliance advisory firm with personalized service from senior CAs and advocates.',
    services: ['Legal Compliance', 'Contract Drafting', 'Regulatory Advisory', 'Due Diligence', 'Litigation Support'],
    rating: 4.8,
    reviewCount: 620,
    pricing: '₹15,000/month onwards',
    contactEmail: 'contact@mylegalcounsel.in',
    contactPhone: '+91 22 6789 1234',
    website: 'www.mylegalcounsel.in',
    specializations: ['Legal Advisory', 'Corporate Law', 'High-value Transactions'],
    yearsInBusiness: 12,
    clientsServed: 2000,
    statesServed: ['Maharashtra', 'Delhi', 'Gujarat', 'Karnataka', 'Goa', 'Madhya Pradesh'],
    headquarterState: 'Maharashtra'
  },
  {
    id: '7',
    name: 'ComplianceFirst Kolkata',
    logo: '🔷',
    description: 'Eastern India\'s premier compliance partner with deep expertise in West Bengal and neighboring state regulations.',
    services: ['Company Incorporation', 'GST Filing', 'Annual Returns', 'Professional Tax', 'MSME Registration'],
    rating: 4.6,
    reviewCount: 780,
    pricing: '₹5,500/month onwards',
    contactEmail: 'contact@compliancefirstkol.com',
    contactPhone: '+91 33 2244 5566',
    website: 'www.compliancefirstkol.com',
    specializations: ['West Bengal Laws', 'SMEs', 'Manufacturing'],
    yearsInBusiness: 7,
    clientsServed: 2800,
    statesServed: ['West Bengal', 'Bihar', 'Jharkhand', 'Odisha', 'Assam'],
    headquarterState: 'West Bengal'
  },
  {
    id: '8',
    name: 'NorthEast Legal Partners',
    logo: '🏔️',
    description: 'Specialists in northeastern states with local expertise and understanding of regional compliance requirements.',
    services: ['State-specific Licenses', 'GST Registration', 'Startup India', 'Tax Filing', 'Labour Law Compliance'],
    rating: 4.7,
    reviewCount: 520,
    pricing: '₹4,800/month onwards',
    contactEmail: 'hello@nelegals.com',
    contactPhone: '+91 361 2233 4455',
    website: 'www.nelegals.com',
    specializations: ['NE State Regulations', 'Startups', 'Tourism & Hospitality'],
    yearsInBusiness: 5,
    clientsServed: 1500,
    statesServed: ['Assam', 'Meghalaya', 'Manipur', 'Nagaland', 'Tripura', 'Arunachal Pradesh', 'Mizoram', 'Sikkim'],
    headquarterState: 'Assam'
  },
  {
    id: '9',
    name: 'Central India Compliance Hub',
    logo: '🎯',
    description: 'Dedicated to serving businesses in central Indian states with personalized compliance management.',
    services: ['Registration Services', 'GST Compliance', 'Income Tax', 'Audit Support', 'Excise & Customs'],
    rating: 4.5,
    reviewCount: 650,
    pricing: '₹5,200/month onwards',
    contactEmail: 'support@cicompliance.in',
    contactPhone: '+91 755 2234 5678',
    website: 'www.cicompliance.in',
    specializations: ['Manufacturing', 'Trading', 'Agriculture'],
    yearsInBusiness: 8,
    clientsServed: 2200,
    statesServed: ['Madhya Pradesh', 'Chhattisgarh', 'Jharkhand', 'Odisha', 'Bihar'],
    headquarterState: 'Madhya Pradesh'
  },
  {
    id: '10',
    name: 'Rajasthan Business Services',
    logo: '🐪',
    description: 'Your trusted partner for business compliance across Rajasthan with expertise in tourism and heritage sectors.',
    services: ['Business Registration', 'Tourism Licenses', 'GST Filing', 'Labour Compliance', 'RERA Registration'],
    rating: 4.6,
    reviewCount: 890,
    pricing: '₹5,800/month onwards',
    contactEmail: 'info@rajbizservices.com',
    contactPhone: '+91 141 2345 6789',
    website: 'www.rajbizservices.com',
    specializations: ['Tourism', 'Real Estate', 'Handicrafts'],
    yearsInBusiness: 9,
    clientsServed: 3200,
    statesServed: ['Rajasthan', 'Gujarat', 'Haryana', 'Punjab', 'Madhya Pradesh'],
    headquarterState: 'Rajasthan'
  },
  {
    id: '11',
    name: 'Punjab & Haryana Legal Associates',
    logo: '🌾',
    description: 'Agricultural and industrial compliance experts serving Punjab and Haryana businesses.',
    services: ['Factory License', 'GST Returns', 'Agricultural Licensing', 'Labour Law', 'Environmental Clearances'],
    rating: 4.4,
    reviewCount: 540,
    pricing: '₹4,900/month onwards',
    contactEmail: 'contact@phlegal.in',
    contactPhone: '+91 172 2456 7890',
    website: 'www.phlegal.in',
    specializations: ['Agriculture', 'Manufacturing', 'Food Processing'],
    yearsInBusiness: 6,
    clientsServed: 1800,
    statesServed: ['Punjab', 'Haryana', 'Himachal Pradesh', 'Uttarakhand', 'Delhi'],
    headquarterState: 'Punjab'
  },
  {
    id: '12',
    name: 'Uttarakhand Compliance Advisors',
    logo: '⛰️',
    description: 'Mountain state specialists helping businesses navigate Uttarakhand\'s unique regulatory landscape.',
    services: ['Hill State Incentives', 'Tourism Registration', 'GST Filing', 'Environmental Compliance', 'MSMEs'],
    rating: 4.5,
    reviewCount: 420,
    pricing: '₹4,600/month onwards',
    contactEmail: 'support@ukcompliance.in',
    contactPhone: '+91 135 2567 8901',
    website: 'www.ukcompliance.in',
    specializations: ['Tourism', 'Hill State Benefits', 'Small Business'],
    yearsInBusiness: 5,
    clientsServed: 1200,
    statesServed: ['Uttarakhand', 'Himachal Pradesh', 'Punjab', 'Haryana', 'Uttar Pradesh'],
    headquarterState: 'Uttarakhand'
  }
];

export const getProvidersBySpecialization = (specialization: string): ComplianceProvider[] => {
  return complianceProviders.filter(provider => 
    provider.specializations.some(spec => 
      spec.toLowerCase().includes(specialization.toLowerCase())
    )
  );
};

export const getTopRatedProviders = (limit: number = 3): ComplianceProvider[] => {
  return [...complianceProviders]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getProvidersByState = (state: string): ComplianceProvider[] => {
  // Get providers that serve this state
  const servingState = complianceProviders.filter(provider =>
    provider.statesServed.includes(state)
  );

  // Sort by: 1) headquarter in state, 2) rating
  return servingState.sort((a, b) => {
    // Prioritize providers headquartered in the state
    if (a.headquarterState === state && b.headquarterState !== state) return -1;
    if (a.headquarterState !== state && b.headquarterState === state) return 1;
    // Then by rating
    return b.rating - a.rating;
  });
};
