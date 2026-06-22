export interface ComplianceDeadline {
  task: string;
  deadline: Date;
  description: string;
  recurring: 'once' | 'monthly' | 'quarterly' | 'annually';
}

// Helper function to get next deadline based on current date
const getNextDeadline = (month: number, day: number): Date => {
  const today = new Date();
  const currentYear = today.getFullYear();
  let deadline = new Date(currentYear, month - 1, day);
  
  // If deadline has passed, set it for next year
  if (deadline < today) {
    deadline = new Date(currentYear + 1, month - 1, day);
  }
  
  return deadline;
};

const getNextQuarterlyDeadline = (months: number[]): Date => {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  // Find next quarterly month
  for (let month of months) {
    let deadline = new Date(currentYear, month - 1, 15);
    if (deadline > today) {
      return deadline;
    }
  }
  
  // If all quarters passed, return first quarter of next year
  return new Date(currentYear + 1, months[0] - 1, 15);
};

const getNextMonthlyDeadline = (day: number): Date => {
  const today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let deadline = new Date(year, month, day);
  
  if (deadline < today) {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    deadline = new Date(year, month, day);
  }
  
  return deadline;
};

// Standard deadlines generator for states
const getStandardDeadlines = (stateName: string, shopsActName: string) => ({
  "Pvt Ltd": [
    {
      task: "Register business name with MCA",
      deadline: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000),
      description: "Complete MCA name registration within 14 days of application",
      recurring: "once" as const
    },
    {
      task: "File Form INC-32 (SPICe+)",
      deadline: new Date(new Date().getTime() + 21 * 24 * 60 * 60 * 1000),
      description: "Submit incorporation documents within 21 days",
      recurring: "once" as const
    },
    {
      task: "Obtain Digital Signature Certificate (DSC)",
      deadline: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      description: "Required before filing incorporation documents",
      recurring: "once" as const
    },
    {
      task: "Apply for PAN and TAN",
      deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      description: "Apply within 30 days of incorporation",
      recurring: "once" as const
    },
    {
      task: "Obtain GSTIN registration",
      deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      description: "Register for GST within 30 days of starting business",
      recurring: "once" as const
    },
    ...(shopsActName ? [{
      task: `Register under ${shopsActName}`,
      deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      description: "Register within 30 days of starting operations",
      recurring: "once" as const
    }] : []),
    {
      task: "Open current bank account",
      deadline: new Date(new Date().getTime() + 45 * 24 * 60 * 60 * 1000),
      description: "Open company bank account after incorporation",
      recurring: "once" as const
    },
    {
      task: "File quarterly tax returns",
      deadline: getNextQuarterlyDeadline([4, 7, 10, 1]),
      description: "TDS returns due 15th of month following quarter end",
      recurring: "quarterly" as const
    },
    {
      task: "File GSTR-1 (GST Return)",
      deadline: getNextQuarterlyDeadline([4, 7, 10, 1]),
      description: "Quarterly GSTR-1 due on 13th of month following quarter end",
      recurring: "quarterly" as const
    },
    {
      task: "File GSTR-3B (GST Return)",
      deadline: getNextQuarterlyDeadline([4, 7, 10, 1]),
      description: "Quarterly GSTR-3B due on 22nd of month following quarter end",
      recurring: "quarterly" as const
    },
    {
      task: "Pay Electricity Bill",
      deadline: getNextMonthlyDeadline(10),
      description: "Monthly electricity bill payment reminder",
      recurring: "monthly" as const
    },
    {
      task: "Pay Water Bill",
      deadline: getNextMonthlyDeadline(15),
      description: "Monthly water bill payment reminder",
      recurring: "monthly" as const
    },
    {
      task: "Maintain statutory registers",
      deadline: getNextMonthlyDeadline(5),
      description: "Update registers monthly",
      recurring: "monthly" as const
    }
  ],
  "LLP": [
    {
      task: "Register LLP name with MCA",
      deadline: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000),
      description: "Complete name reservation within 14 days",
      recurring: "once" as const
    },
    {
      task: "File Form FiLLiP",
      deadline: new Date(new Date().getTime() + 21 * 24 * 60 * 60 * 1000),
      description: "Submit LLP incorporation form within 21 days",
      recurring: "once" as const
    },
    {
      task: "Obtain Digital Signature Certificate (DSC)",
      deadline: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      description: "Required for all partners before filing",
      recurring: "once" as const
    },
    {
      task: "Apply for PAN and TAN",
      deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      description: "Apply within 30 days of incorporation",
      recurring: "once" as const
    },
    {
      task: "Obtain GSTIN registration",
      deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      description: "Register for GST if applicable",
      recurring: "once" as const
    },
    ...(shopsActName ? [{
      task: `Register under ${shopsActName}`,
      deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      description: "Register within 30 days of operations",
      recurring: "once" as const
    }] : []),
    {
      task: "File annual LLP returns",
      deadline: getNextDeadline(5, 30),
      description: "Annual returns due by May 30th",
      recurring: "annually" as const
    },
    {
      task: "File GSTR-1 (GST Return)",
      deadline: getNextQuarterlyDeadline([4, 7, 10, 1]),
      description: "Quarterly GSTR-1 due on 13th of month following quarter end",
      recurring: "quarterly" as const
    },
    {
      task: "File GSTR-3B (GST Return)",
      deadline: getNextQuarterlyDeadline([4, 7, 10, 1]),
      description: "Quarterly GSTR-3B due on 22nd of month following quarter end",
      recurring: "quarterly" as const
    },
    {
      task: "Pay Electricity Bill",
      deadline: getNextMonthlyDeadline(10),
      description: "Monthly electricity bill payment reminder",
      recurring: "monthly" as const
    },
    {
      task: "Pay Water Bill",
      deadline: getNextMonthlyDeadline(15),
      description: "Monthly water bill payment reminder",
      recurring: "monthly" as const
    },
    {
      task: "Maintain LLP agreement",
      deadline: getNextDeadline(3, 31),
      description: "Review and update LLP agreement annually",
      recurring: "annually" as const
    }
  ],
  "Sole Proprietorship": [
    {
      task: "Register business name (optional)",
      deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      description: "Complete registration within 30 days",
      recurring: "once" as const
    },
    {
      task: "Apply for PAN card",
      deadline: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000),
      description: "Apply for PAN immediately",
      recurring: "once" as const
    },
    {
      task: "Obtain GSTIN (if turnover > ₹40L)",
      deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      description: "Register within 30 days of crossing threshold",
      recurring: "once" as const
    },
    ...(shopsActName ? [{
      task: `Register under ${shopsActName}`,
      deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      description: "Register within 30 days of operations",
      recurring: "once" as const
    }] : []),
    {
      task: "Open business bank account",
      deadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      description: "Open account after obtaining PAN",
      recurring: "once" as const
    },
    {
      task: "Obtain trade license from local authority",
      deadline: new Date(new Date().getTime() + 45 * 24 * 60 * 60 * 1000),
      description: "Apply within 45 days of starting business",
      recurring: "once" as const
    },
    {
      task: "File annual ITR",
      deadline: getNextDeadline(7, 31),
      description: "File income tax return by July 31st",
      recurring: "annually" as const
    },
    {
      task: "File GSTR-1 (GST Return)",
      deadline: getNextQuarterlyDeadline([4, 7, 10, 1]),
      description: "Quarterly GSTR-1 due on 13th of month following quarter end (if registered)",
      recurring: "quarterly" as const
    },
    {
      task: "File GSTR-3B (GST Return)",
      deadline: getNextQuarterlyDeadline([4, 7, 10, 1]),
      description: "Quarterly GSTR-3B due on 22nd of month following quarter end (if registered)",
      recurring: "quarterly" as const
    },
    {
      task: "Pay Electricity Bill",
      deadline: getNextMonthlyDeadline(10),
      description: "Monthly electricity bill payment reminder",
      recurring: "monthly" as const
    },
    {
      task: "Pay Water Bill",
      deadline: getNextMonthlyDeadline(15),
      description: "Monthly water bill payment reminder",
      recurring: "monthly" as const
    },
    {
      task: "Maintain books of accounts",
      deadline: getNextMonthlyDeadline(5),
      description: "Update books monthly",
      recurring: "monthly" as const
    }
  ]
});

export const deadlinesData: Record<string, Record<string, ComplianceDeadline[]>> = {
  "Andhra Pradesh": getStandardDeadlines("Andhra Pradesh", "AP Shops & Establishments Act"),
  "Assam": getStandardDeadlines("Assam", "Assam Shops & Establishments Act"),
  "Bihar": getStandardDeadlines("Bihar", "Bihar Shops & Establishments Act"),
  "Chhattisgarh": getStandardDeadlines("Chhattisgarh", "CG Shops & Establishments Act"),
  "Delhi": getStandardDeadlines("Delhi", ""),
  "Goa": getStandardDeadlines("Goa", "Goa Shops & Establishments Act"),
  "Gujarat": getStandardDeadlines("Gujarat", "Gujarat Shops & Establishments Act"),
  "Haryana": getStandardDeadlines("Haryana", "Haryana Shops & Establishments Act"),
  "Himachal Pradesh": getStandardDeadlines("Himachal Pradesh", "HP Shops & Establishments Act"),
  "Jharkhand": getStandardDeadlines("Jharkhand", "Jharkhand Shops & Establishments Act"),
  "Karnataka": getStandardDeadlines("Karnataka", "Karnataka Shops & Commercial Establishments Act"),
  "Kerala": getStandardDeadlines("Kerala", "Kerala Shops & Commercial Establishments Act"),
  "Madhya Pradesh": getStandardDeadlines("Madhya Pradesh", "MP Shops & Establishments Act"),
  "Maharashtra": getStandardDeadlines("Maharashtra", "Shops & Establishments Act"),
  "Odisha": getStandardDeadlines("Odisha", "Odisha Shops & Establishments Act"),
  "Punjab": getStandardDeadlines("Punjab", "Punjab Shops & Commercial Establishments Act"),
  "Rajasthan": getStandardDeadlines("Rajasthan", "Rajasthan Shops & Establishments Act"),
  "Tamil Nadu": getStandardDeadlines("Tamil Nadu", "TN Shops & Establishments Act"),
  "Telangana": getStandardDeadlines("Telangana", "Telangana Shops & Establishments Act"),
  "Uttar Pradesh": getStandardDeadlines("Uttar Pradesh", "UP Shops & Establishments Act"),
  "Uttarakhand": getStandardDeadlines("Uttarakhand", "Uttarakhand Shops & Establishments Act"),
  "West Bengal": getStandardDeadlines("West Bengal", "WB Shops & Establishments Act")
};
