import { 
  Plan, 
  PricingConfig, 
  LawnSizeConfig, 
  TerrainType, 
  Obstacle,
  ServiceWindow,
  ServiceWindowType,
  AddOn,
  City
} from '@/types';

// ==========================================
// AVAILABILITY & URGENCY (MOCK DATA)
// ==========================================

export interface AreaAvailability {
  fsa: string; // First 3 chars of postal code
  city: City;
  nextWindow: ServiceWindowType;
  spotsLeft: number;
  urgencyMessage?: string;
}

export const AREA_AVAILABILITY: AreaAvailability[] = [
  { fsa: 'N2L', city: 'Waterloo', nextWindow: 'mon_wed', spotsLeft: 3, urgencyMessage: 'Only 3 spots left in Waterloo this week!' },
  { fsa: 'N2J', city: 'Waterloo', nextWindow: 'tue_thu', spotsLeft: 5 },
  { fsa: 'N2K', city: 'Waterloo', nextWindow: 'mon_wed', spotsLeft: 4 },
  { fsa: 'N2G', city: 'Kitchener', nextWindow: 'wed_fri', spotsLeft: 2, urgencyMessage: 'Limited spots in Kitchener!' },
  { fsa: 'N2H', city: 'Kitchener', nextWindow: 'tue_thu', spotsLeft: 6 },
  { fsa: 'N2E', city: 'Kitchener', nextWindow: 'thu_sat', spotsLeft: 4 },
  { fsa: 'N2M', city: 'Kitchener', nextWindow: 'mon_wed', spotsLeft: 3 },
  { fsa: 'N2P', city: 'Kitchener', nextWindow: 'wed_fri', spotsLeft: 5 },
  { fsa: 'N2R', city: 'Kitchener', nextWindow: 'tue_thu', spotsLeft: 7 },
  { fsa: 'N1R', city: 'Cambridge', nextWindow: 'wed_fri', spotsLeft: 8 },
  { fsa: 'N1S', city: 'Cambridge', nextWindow: 'thu_sat', spotsLeft: 6 },
  { fsa: 'N1T', city: 'Cambridge', nextWindow: 'mon_wed', spotsLeft: 5 },
  { fsa: 'N1H', city: 'Guelph', nextWindow: 'tue_thu', spotsLeft: 9 },
  { fsa: 'N1G', city: 'Guelph', nextWindow: 'wed_fri', spotsLeft: 7 },
  { fsa: 'N1E', city: 'Guelph', nextWindow: 'thu_sat', spotsLeft: 6 },
];

export const DEFAULT_AVAILABILITY: AreaAvailability = {
  fsa: 'KW',
  city: 'Kitchener',
  nextWindow: 'mon_wed',
  spotsLeft: 12,
  urgencyMessage: 'Limited weekly slots available in KW region',
};

// ==========================================
// TESTIMONIALS (PLACEHOLDER)
// ==========================================

export interface Testimonial {
  id: string;
  name: string;
  city: City;
  neighborhood: string;
  rating: number;
  text: string;
  planType: string;
  date: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test_1',
    name: 'Sarah M.',
    city: 'Waterloo',
    neighborhood: 'Beechwood',
    rating: 5,
    text: 'Finally, a lawn service that actually shows up! The photo proof after each cut gives me peace of mind. No more chasing contractors.',
    planType: 'Bi-weekly',
    date: 'January 2026',
  },
  {
    id: 'test_2',
    name: 'Robert K.',
    city: 'Kitchener',
    neighborhood: 'Forest Heights',
    rating: 5,
    text: 'As a landlord with 3 properties, CutDay has been a game-changer. One invoice, photo proof for each property. My tenants are happy.',
    planType: 'Weekly',
    date: 'January 2026',
  },
  {
    id: 'test_3',
    name: 'Linda & Tom H.',
    city: 'Cambridge',
    neighborhood: 'Hespeler',
    rating: 5,
    text: 'We spend winters in Florida. CutDay sends us photos every cut — we can see our lawn is taken care of from 2,000 miles away!',
    planType: 'Bi-weekly',
    date: 'December 2025',
  },
];

// ==========================================
// BEFORE/AFTER GALLERY DATA
// ==========================================

export interface BeforeAfterItem {
  id: string;
  beforeImage: string;
  afterImage: string;
  city: City;
  neighborhood: string;
  lawnSize: string;
  planType: string;
  caption: string;
}

export const BEFORE_AFTER_GALLERY: BeforeAfterItem[] = [
  {
    id: 'ba_1',
    beforeImage: '/images/before-1.jpg',
    afterImage: '/images/after-1.jpg',
    city: 'Kitchener',
    neighborhood: 'Doon',
    lawnSize: 'Medium',
    planType: 'Bi-weekly',
    caption: 'Overgrown rescue transformed in one visit',
  },
  {
    id: 'ba_2',
    beforeImage: '/images/before-2.jpg',
    afterImage: '/images/after-2.jpg',
    city: 'Waterloo',
    neighborhood: 'Laurelwood',
    lawnSize: 'Small',
    planType: 'Weekly',
    caption: 'Consistent weekly care keeps it perfect',
  },
  {
    id: 'ba_3',
    beforeImage: '/images/before-3.jpg',
    afterImage: '/images/after-3.jpg',
    city: 'Cambridge',
    neighborhood: 'Preston',
    lawnSize: 'Large',
    planType: 'Every 10 days',
    caption: 'Large property, professional results',
  },
];

// ==========================================
// SERVICE CHECKLIST ITEMS
// ==========================================

export const SERVICE_CHECKLIST = [
  { id: 'mow', label: 'Full lawn mowing at proper height', included: true },
  { id: 'edge', label: 'Precision edging (if selected)', included: true },
  { id: 'blowoff', label: 'Clippings blown off hard surfaces', included: true },
  { id: 'gate', label: 'Gate secured after service', included: true },
  { id: 'photo', label: 'Before & after photo proof uploaded', included: true },
  { id: 'notify', label: 'Completion notification sent', included: true },
];

// ==========================================
// WINDOW BENEFITS (FOR ENHANCED PICKER)
// ==========================================

export const WINDOW_BENEFITS: Record<string, { label: string; color: string }> = {
  'mon_wed': { label: 'Most Popular', color: 'bg-green-100 text-green-700' },
  'tue_thu': { label: 'Fastest Availability', color: 'bg-blue-100 text-blue-700' },
  'wed_fri': { label: 'Weekend Ready', color: 'bg-purple-100 text-purple-700' },
  'thu_sat': { label: 'Best for Parties', color: 'bg-orange-100 text-orange-700' },
};

// ==========================================
// FIRST CUT INCENTIVE
// ==========================================

export const FIRST_CUT_INCENTIVE = {
  type: 'discount' as const,
  amount: 10,
  label: '$10 off your first cut',
  code: 'FIRSTCUT10',
  terms: 'Valid for new customers only. One per household.',
};

// ==========================================
// SERVICE AREA CONFIGURATION
// ==========================================

export const SERVICE_AREAS: { city: City; neighborhoods: string[] }[] = [
  {
    city: 'Kitchener',
    neighborhoods: [
      'Downtown Kitchener',
      'Fairview Park',
      'Forest Heights',
      'Stanley Park',
      'Doon',
      'Pioneer Park',
      'Laurentian Hills',
      'Country Hills',
      'Huron Park',
      'Centreville',
      'Victoria Hills',
      'Bridgeport',
      'Grand River South',
    ],
  },
  {
    city: 'Waterloo',
    neighborhoods: [
      'Uptown Waterloo',
      'Beechwood',
      'Lakeshore',
      'Westmount',
      'University District',
      'Lincoln Village',
      'Westvale',
      'Columbia Forest',
      'Laurelwood',
      'Vista Hills',
      'Conservation Meadows',
    ],
  },
  {
    city: 'Cambridge',
    neighborhoods: [
      'Galt',
      'Preston',
      'Hespeler',
      'Blair',
      'Riverside Park',
      'Southwood',
      'Lang\'s Farm',
      'Elgin Park',
      'Shade\'s Mills',
      'Pinebush',
    ],
  },
  {
    city: 'Guelph',
    neighborhoods: [
      'Downtown Guelph',
      'The Ward',
      'St. Patrick\'s Ward',
      'Exhibition Park',
      'Kortright Hills',
      'Westminster Woods',
      'Onward Willow',
      'Hanlon Creek',
      'South End',
      'Two Rivers',
    ],
  },
];

export const SUPPORTED_POSTAL_PREFIXES = [
  'N2A', 'N2B', 'N2C', 'N2E', 'N2G', 'N2H', 'N2J', 'N2K', 'N2L', 'N2M', 'N2N', 'N2P', 'N2R', 'N2T', 'N2V',
  'N1C', 'N1E', 'N1G', 'N1H', 'N1K', 'N1L', 'N1M', 'N1P', 'N1R', 'N1S', 'N1T',
  'N3A', 'N3B', 'N3C', 'N3E', 'N3H',
];

// ==========================================
// LAWN SIZE CONFIGURATION
// ==========================================

export const LAWN_SIZES: LawnSizeConfig[] = [
  {
    size: 'small',
    label: 'Small',
    sqftRange: 'Up to 2,500 sq ft',
    basePrice: 45,
    description: 'Townhouse or small front/back yard',
  },
  {
    size: 'medium',
    label: 'Medium',
    sqftRange: '2,500 - 5,000 sq ft',
    basePrice: 55,
    description: 'Standard suburban home',
  },
  {
    size: 'large',
    label: 'Large',
    sqftRange: '5,000 - 8,000 sq ft',
    basePrice: 75,
    description: 'Larger property with substantial lawn',
  },
  {
    size: 'xlarge',
    label: 'Extra Large',
    sqftRange: '8,000+ sq ft',
    basePrice: 95,
    description: 'Estate or acreage property',
  },
];

// ==========================================
// TERRAIN MULTIPLIERS
// ==========================================

export const TERRAIN_MULTIPLIERS: Record<TerrainType, number> = {
  flat: 1.0,
  sloped: 1.1,
  hilly: 1.2,
  mixed: 1.15,
};

export const TERRAIN_OPTIONS: { value: TerrainType; label: string; description: string }[] = [
  { value: 'flat', label: 'Flat', description: 'Level lawn throughout' },
  { value: 'sloped', label: 'Sloped', description: 'Gentle slopes or grades' },
  { value: 'hilly', label: 'Hilly', description: 'Significant elevation changes' },
  { value: 'mixed', label: 'Mixed', description: 'Combination of flat and sloped areas' },
];

// ==========================================
// OBSTACLE CHARGES
// ==========================================

export const OBSTACLE_CHARGES: Record<Obstacle, number> = {
  trees: 5,
  garden_beds: 5,
  playground: 5,
  pool: 5,
  shed: 3,
  fence_sections: 3,
  decorative_rocks: 3,
  other: 5,
};

export const OBSTACLE_OPTIONS: { value: Obstacle; label: string }[] = [
  { value: 'trees', label: 'Multiple trees (5+)' },
  { value: 'garden_beds', label: 'Garden beds' },
  { value: 'playground', label: 'Playground or play structure' },
  { value: 'pool', label: 'Pool (in-ground or above)' },
  { value: 'shed', label: 'Shed or outbuilding' },
  { value: 'fence_sections', label: 'Multiple fence sections' },
  { value: 'decorative_rocks', label: 'Decorative rocks or landscaping' },
  { value: 'other', label: 'Other obstacles' },
];

// ==========================================
// SUBSCRIPTION PLANS
// ==========================================

export const PLANS: Plan[] = [
  {
    id: 'plan_weekly',
    frequency: 'weekly',
    name: 'Weekly',
    description: 'Perfect for fast-growing lawns. Service every 7 days.',
    intervalDays: 7,
    discountPercent: 15,
    popular: false,
  },
  {
    id: 'plan_biweekly',
    frequency: 'biweekly',
    name: 'Bi-Weekly',
    description: 'Our most popular plan. Service every 14 days.',
    intervalDays: 14,
    discountPercent: 10,
    popular: true,
  },
  {
    id: 'plan_every10days',
    frequency: 'every10days',
    name: 'Every 10 Days',
    description: 'Great balance for moderate growth. Service every 10 days.',
    intervalDays: 10,
    discountPercent: 12,
    popular: false,
  },
];

// ==========================================
// SERVICE WINDOWS
// ==========================================

export const SERVICE_WINDOWS: ServiceWindow[] = [
  {
    type: 'mon_wed',
    label: 'Monday – Wednesday',
    days: ['Monday', 'Tuesday', 'Wednesday'],
    description: 'Start your week with a fresh cut',
  },
  {
    type: 'tue_thu',
    label: 'Tuesday – Thursday',
    days: ['Tuesday', 'Wednesday', 'Thursday'],
    description: 'Mid-week service window',
  },
  {
    type: 'wed_fri',
    label: 'Wednesday – Friday',
    days: ['Wednesday', 'Thursday', 'Friday'],
    description: 'Ready for the weekend',
  },
  {
    type: 'thu_sat',
    label: 'Thursday – Saturday',
    days: ['Thursday', 'Friday', 'Saturday'],
    description: 'Weekend-ready lawn',
  },
];

export const EXACT_DAY_PREMIUM = 15; // CAD

// ==========================================
// ADD-ONS
// ==========================================

export const ADD_ONS: AddOn[] = [
  {
    id: 'addon_edging',
    name: 'Precision Edging',
    description: 'Crisp edges along driveways, walkways, and garden beds',
    price: 15,
    category: 'edging',
    icon: 'ruler',
  },
  {
    id: 'addon_trimming',
    name: 'String Trimming',
    description: 'Trim around fences, trees, and hard-to-reach areas',
    price: 15,
    category: 'trimming',
    icon: 'scissors',
  },
  {
    id: 'addon_blowoff',
    name: 'Driveway Blow-off',
    description: 'Clean grass clippings from driveway and walkways',
    price: 10,
    category: 'cleanup',
    icon: 'wind',
  },
  {
    id: 'addon_leaf_cleanup',
    name: 'Leaf Cleanup',
    description: 'Seasonal leaf removal and bagging',
    price: 35,
    category: 'seasonal',
    icon: 'leaf',
  },
  {
    id: 'addon_weed_whacking',
    name: 'Weed Control',
    description: 'Manual weed removal from lawn and beds',
    price: 25,
    category: 'cleanup',
    icon: 'flower',
  },
];

// ==========================================
// ONE-TIME SERVICES
// ==========================================

export const ONE_TIME_SERVICES = [
  {
    id: 'single_cut',
    name: 'Single Cut',
    description: 'One-time mowing service with photo proof',
    priceMultiplier: 1.25, // 25% more than subscription rate
  },
  {
    id: 'overgrown_rescue',
    name: 'Overgrown Rescue',
    description: 'For lawns that have gotten out of control. Includes multiple passes.',
    priceMultiplier: 2.0,
  },
  {
    id: 'pre_listing',
    name: 'Pre-Listing Cleanup',
    description: 'Make your property shine for real estate photos',
    priceMultiplier: 1.75,
  },
  {
    id: 'pre_party',
    name: 'Pre-Party Cleanup',
    description: 'Get your yard ready for guests',
    priceMultiplier: 1.5,
  },
];

// ==========================================
// SURCHARGES
// ==========================================

export const OVERGROWN_SURCHARGE = 25; // CAD - for grass over 6 inches

// ==========================================
// SKIP TOKENS
// ==========================================

export const INITIAL_SKIP_TOKENS = 2;
export const SKIP_TOKEN_REFILL_MONTHS = 3; // Tokens refresh every 3 months
export const SKIP_NOTICE_HOURS = 48; // Must skip 48+ hours before window

// ==========================================
// CANCELLATION POLICY
// ==========================================

export const CANCELLATION_NOTICE_DAYS = 7; // 7 days notice to cancel subscription
export const REFUND_WINDOW_DAYS = 3; // Refund available within 3 days of service if quality issue

// ==========================================
// WEATHER POLICY
// ==========================================

export const RAIN_DELAY_AUTO_RESCHEDULE = true;
export const RAIN_THRESHOLD_MM = 5; // Auto-delay if >5mm predicted

// ==========================================
// FULL PRICING CONFIG
// ==========================================

export const PRICING_CONFIG: PricingConfig = {
  lawnSizes: LAWN_SIZES,
  terrainMultipliers: TERRAIN_MULTIPLIERS,
  obstacleCharges: OBSTACLE_CHARGES,
  addOnPrices: ADD_ONS.reduce((acc, addon) => ({ ...acc, [addon.id]: addon.price }), {}),
  exactDayPremium: EXACT_DAY_PREMIUM,
  overgrownSurcharge: OVERGROWN_SURCHARGE,
  plans: PLANS,
};

// ==========================================
// COMPANY INFO
// ==========================================

export const COMPANY_INFO = {
  name: 'CutDay',
  tagline: 'Your lawn, on schedule.',
  phone: '(519) 555-LAWN',
  email: 'hello@cutday.ca',
  address: 'Kitchener, Ontario',
  hours: 'Mon-Sat: 7am - 8pm',
  socialMedia: {
    instagram: '@cutday.kw',
    facebook: 'cutdaykw',
  },
};

// ==========================================
// FAQ DATA
// ==========================================

// ==========================================
// MOCK AVAILABILITY DATA (by FSA - first 3 postal digits)
// ==========================================

export const MOCK_AVAILABILITY: Record<string, { window: string; spotsLeft: number }> = {
  'N2L': { window: 'Mon–Wed', spotsLeft: 3 },
  'N2J': { window: 'Tue–Thu', spotsLeft: 5 },
  'N2K': { window: 'Wed–Fri', spotsLeft: 2 },
  'N2G': { window: 'Mon–Wed', spotsLeft: 4 },
  'N2H': { window: 'Thu–Sat', spotsLeft: 6 },
  'N2E': { window: 'Tue–Thu', spotsLeft: 3 },
  'N2R': { window: 'Wed–Fri', spotsLeft: 4 },
  'N2T': { window: 'Mon–Wed', spotsLeft: 2 },
  'N2V': { window: 'Tue–Thu', spotsLeft: 5 },
  'N1C': { window: 'Wed–Fri', spotsLeft: 7 },
  'N1E': { window: 'Thu–Sat', spotsLeft: 4 },
  'N1G': { window: 'Mon–Wed', spotsLeft: 3 },
  'N1H': { window: 'Tue–Thu', spotsLeft: 5 },
  'N3A': { window: 'Wed–Fri', spotsLeft: 6 },
  'N3B': { window: 'Mon–Wed', spotsLeft: 4 },
  'N3C': { window: 'Thu–Sat', spotsLeft: 3 },
  'default': { window: 'Mon–Wed', spotsLeft: 5 },
};

// Alias for component compatibility
export const AVAILABILITY_BY_FSA = MOCK_AVAILABILITY;

// Alias for component compatibility
export const EVERY_VISIT_INCLUDES = SERVICE_CHECKLIST;





// ==========================================
// FAQ ITEMS
// ==========================================

export const FAQ_ITEMS = [
  {
    question: 'How does the service window work?',
    answer: 'You pick a 2-3 day window (like Monday–Wednesday). We arrive within that window based on weather and route efficiency. You get a notification when we\'re on the way and photo proof when we\'re done. No waiting around or guessing.',
  },
  {
    question: 'What if it rains during my window?',
    answer: 'We monitor weather forecasts daily. If rain is expected, we\'ll automatically reschedule within your window or to the next available day. You\'ll receive a text notification about any weather delays—no action needed from you.',
  },
  {
    question: 'How do skip tokens work?',
    answer: 'You get skip tokens that let you skip a scheduled service without charge. Simply use your skip at least 48 hours before your service window starts. No awkward phone calls or texts needed—just tap skip in your account. Tokens refresh periodically based on your plan.',
  },
  {
    question: 'What if I have a locked gate?',
    answer: 'During signup, you can save a gate code or special access instructions. If we arrive and can\'t access your property, we\'ll take a photo, notify you, and reschedule. No charge if we couldn\'t get in due to access issues.',
  },
  {
    question: 'Are your crews pet-friendly?',
    answer: 'Absolutely! We love pets. Just add your pet info during signup and we\'ll send you a reminder before each visit to secure your furry friends. If we arrive and a dog is loose in the yard, we\'ll take a photo, notify you, and reschedule—no charge. Your pet\'s safety is our priority.',
  },
  {
    question: 'What if my lawn is really overgrown?',
    answer: 'No judgment here! We offer an Overgrown Rescue service that includes multiple passes to get your lawn back in shape. After the rescue cut, you can start a regular subscription to keep it maintained.',
  },
  {
    question: 'How do I know you actually did a good job?',
    answer: 'Every single visit includes before and after photos uploaded to your account within minutes of completion. You can see exactly what was done. If you\'re not satisfied, let us know within 3 days for a re-cut or refund.',
  },
  {
    question: 'Is it the same crew every time?',
    answer: 'We do our best to assign consistent crews to neighborhoods. While we can\'t guarantee the same crew every visit, all our crews follow the same quality standards, and your property notes travel with you.',
  },
  {
    question: 'How do payments work?',
    answer: 'We use secure card-on-file billing through Stripe. Subscriptions are charged after each service is completed. You\'ll receive a receipt by email, and all invoices are available in your account.',
  },
  {
    question: 'What if I need to cancel?',
    answer: 'We hope you won\'t, but cancelling is easy—no phone calls needed. Just give us 7 days notice through your account. No cancellation fees, no hassle.',
  },
  {
    question: 'Do you service my area?',
    answer: 'We currently serve Kitchener, Waterloo, Cambridge, Guelph, and surrounding communities including Elmira, St. Jacobs, Baden, New Hamburg, and Ayr. Enter your address to check coverage.',
  },
  {
    question: 'What exactly is included in a standard cut?',
    answer: 'Every visit includes mowing your entire lawn at the appropriate height, blowing off clippings from hard surfaces, and uploading photo proof. Edging, trimming, and other services are available as add-ons.',
  },
  {
    question: 'Can I manage multiple properties?',
    answer: 'Yes! Landlords and property managers love us. You can add multiple properties to your account, each with their own schedule and notes. You\'ll get one consolidated invoice and photo proof for every property. Contact us for volume pricing on 3+ properties.',
  },
];
