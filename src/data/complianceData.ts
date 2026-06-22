// Standard compliance checklist generator for states
const getStandardCompliance = (stateName: string, shopsActName: string) => ({
  "Pvt Ltd": [
    "Register business name with MCA",
    "File Form INC-32 (SPICe+)",
    "Obtain Digital Signature Certificate (DSC)",
    "Apply for PAN and TAN",
    "Obtain GSTIN registration",
    ...(shopsActName ? [`Register under ${shopsActName}`] : []),
    "Open current bank account",
    "File quarterly tax returns",
    "File GSTR-1 (GST Return)",
    "File GSTR-3B (GST Return)",
    "Pay Electricity Bill",
    "Pay Water Bill",
    "Maintain statutory registers"
  ],
  "LLP": [
    "Register LLP name with MCA",
    "File Form FiLLiP",
    "Obtain Digital Signature Certificate (DSC)",
    "Apply for PAN and TAN",
    "Obtain GSTIN registration",
    ...(shopsActName ? [`Register under ${shopsActName}`] : []),
    "File annual LLP returns",
    "File GSTR-1 (GST Return)",
    "File GSTR-3B (GST Return)",
    "Pay Electricity Bill",
    "Pay Water Bill",
    "Maintain LLP agreement"
  ],
  "Sole Proprietorship": [
    "Register business name (optional)",
    "Apply for PAN card",
    "Obtain GSTIN (if turnover > ₹40L)",
    ...(shopsActName ? [`Register under ${shopsActName}`] : []),
    "Open business bank account",
    "Obtain trade license from local authority",
    "File annual ITR",
    "File GSTR-1 (GST Return)",
    "File GSTR-3B (GST Return)",
    "Pay Electricity Bill",
    "Pay Water Bill",
    "Maintain books of accounts"
  ]
});

export const complianceData = {
  "Andhra Pradesh": getStandardCompliance("Andhra Pradesh", "AP Shops & Establishments Act"),
  "Assam": getStandardCompliance("Assam", "Assam Shops & Establishments Act"),
  "Bihar": getStandardCompliance("Bihar", "Bihar Shops & Establishments Act"),
  "Chhattisgarh": getStandardCompliance("Chhattisgarh", "CG Shops & Establishments Act"),
  "Delhi": getStandardCompliance("Delhi", ""),
  "Goa": getStandardCompliance("Goa", "Goa Shops & Establishments Act"),
  "Gujarat": getStandardCompliance("Gujarat", "Gujarat Shops & Establishments Act"),
  "Haryana": getStandardCompliance("Haryana", "Haryana Shops & Establishments Act"),
  "Himachal Pradesh": getStandardCompliance("Himachal Pradesh", "HP Shops & Establishments Act"),
  "Jharkhand": getStandardCompliance("Jharkhand", "Jharkhand Shops & Establishments Act"),
  "Karnataka": getStandardCompliance("Karnataka", "Karnataka Shops & Commercial Establishments Act"),
  "Kerala": getStandardCompliance("Kerala", "Kerala Shops & Commercial Establishments Act"),
  "Madhya Pradesh": getStandardCompliance("Madhya Pradesh", "MP Shops & Establishments Act"),
  "Maharashtra": getStandardCompliance("Maharashtra", "Shops & Establishments Act"),
  "Odisha": getStandardCompliance("Odisha", "Odisha Shops & Establishments Act"),
  "Punjab": getStandardCompliance("Punjab", "Punjab Shops & Commercial Establishments Act"),
  "Rajasthan": getStandardCompliance("Rajasthan", "Rajasthan Shops & Establishments Act"),
  "Tamil Nadu": getStandardCompliance("Tamil Nadu", "TN Shops & Establishments Act"),
  "Telangana": getStandardCompliance("Telangana", "Telangana Shops & Establishments Act"),
  "Uttar Pradesh": getStandardCompliance("Uttar Pradesh", "UP Shops & Establishments Act"),
  "Uttarakhand": getStandardCompliance("Uttarakhand", "Uttarakhand Shops & Establishments Act"),
  "West Bengal": getStandardCompliance("West Bengal", "WB Shops & Establishments Act")
};
