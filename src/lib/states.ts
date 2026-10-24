// The 36 states and UTs, grouped by the day a QRMP client files GSTR-3B (CGST Rule 61(1)).
// Rule 61 still names Daman and Diu and Dadra and Nagar Haveli separately; they became one UT in
// January 2020 and both halves are in the 22nd group, so the merged UT is too.
// Spellings are what the state dropdown writes into clients.state.
const DAY_22 = [
  'Andhra Pradesh',
  'Andaman and Nicobar Islands',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Goa',
  'Gujarat',
  'Karnataka',
  'Kerala',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Puducherry',
  'Tamil Nadu',
  'Telangana',
];

const DAY_24 = [
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Delhi',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Ladakh',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

export const STATES: readonly string[] = [...DAY_22, ...DAY_24].sort();

export function qrmpDay(state: string): 22 | 24 {
  if (DAY_22.includes(state)) return 22;
  if (DAY_24.includes(state)) return 24;
  throw new Error(`Unknown state: ${state}`);
}
