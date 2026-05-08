// Schedules are keyed by "FROM|TO"
// Each schedule has departure times, seat class pricing, and total seats

export const SEAT_LAYOUT = {
  economy: { rows: 10, seatsPerRow: 4, price: 0 }, // price added per route
  business: { rows: 3, seatsPerRow: 2, price: 0 },
};

// Economy seats: 1-40, Business seats: 41-46
export const TOTAL_ECONOMY = 40;
export const TOTAL_BUSINESS = 6;

const schedules = {
  "Nairobi|Mombasa": [
    { id: "NBI-MSA-0700", departure: "07:00 AM", arrival: "02:00 PM", duration: "7h", economyPrice: 1500, businessPrice: 3000 },
    { id: "NBI-MSA-2100", departure: "09:00 PM", arrival: "04:00 AM", duration: "7h", economyPrice: 1500, businessPrice: 3000, overnight: true },
  ],
  "Mombasa|Nairobi": [
    { id: "MSA-NBI-0700", departure: "07:00 AM", arrival: "02:00 PM", duration: "7h", economyPrice: 1500, businessPrice: 3000 },
    { id: "MSA-NBI-2100", departure: "09:00 PM", arrival: "04:00 AM", duration: "7h", economyPrice: 1500, businessPrice: 3000, overnight: true },
  ],
  "Nairobi|Kisumu": [
    { id: "NBI-KSM-0630", departure: "06:30 AM", arrival: "12:30 PM", duration: "6h", economyPrice: 1200, businessPrice: 2500 },
    { id: "NBI-KSM-1400", departure: "02:00 PM", arrival: "08:00 PM", duration: "6h", economyPrice: 1200, businessPrice: 2500 },
  ],
  "Kisumu|Nairobi": [
    { id: "KSM-NBI-0630", departure: "06:30 AM", arrival: "12:30 PM", duration: "6h", economyPrice: 1200, businessPrice: 2500 },
    { id: "KSM-NBI-1400", departure: "02:00 PM", arrival: "08:00 PM", duration: "6h", economyPrice: 1200, businessPrice: 2500 },
  ],
  "Nairobi|Eldoret": [
    { id: "NBI-ELD-0700", departure: "07:00 AM", arrival: "12:00 PM", duration: "5h", economyPrice: 1000, businessPrice: 2000 },
    { id: "NBI-ELD-1500", departure: "03:00 PM", arrival: "08:00 PM", duration: "5h", economyPrice: 1000, businessPrice: 2000 },
  ],
  "Eldoret|Nairobi": [
    { id: "ELD-NBI-0700", departure: "07:00 AM", arrival: "12:00 PM", duration: "5h", economyPrice: 1000, businessPrice: 2000 },
    { id: "ELD-NBI-1500", departure: "03:00 PM", arrival: "08:00 PM", duration: "5h", economyPrice: 1000, businessPrice: 2000 },
  ],
};

// Fallback for routes not explicitly listed
const DEFAULT_SCHEDULE = [
  { id: "DEFAULT-0800", departure: "08:00 AM", arrival: "02:00 PM", duration: "6h", economyPrice: 1300, businessPrice: 2600 },
  { id: "DEFAULT-2000", departure: "08:00 PM", arrival: "02:00 AM", duration: "6h", economyPrice: 1300, businessPrice: 2600, overnight: true },
];

export function getSchedules(from, to) {
  const key = `${from}|${to}`;
  return schedules[key] || DEFAULT_SCHEDULE.map(s => ({
    ...s,
    id: `${from.slice(0,3).toUpperCase()}-${to.slice(0,3).toUpperCase()}-${s.id.split("-").pop()}`
  }));
}
