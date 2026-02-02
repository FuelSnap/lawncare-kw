// ==========================================
// USER & AUTHENTICATION TYPES
// ==========================================

export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  stripeCustomerId?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

// ==========================================
// PROPERTY TYPES
// ==========================================

export interface Property {
  id: string;
  userId: string;
  address: Address;
  lawnSize: LawnSize;
  terrain: TerrainType;
  obstacles: Obstacle[];
  gateAccess: GateAccess;
  petInfo: PetInfo;
  permanentNotes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  unit?: string;
  city: City;
  province: 'ON';
  postalCode: string;
  latitude: number;
  longitude: number;
  neighborhood?: string;
}

export type City = 
  | 'Kitchener' 
  | 'Waterloo' 
  | 'Cambridge' 
  | 'Guelph'
  | 'Elmira'
  | 'St. Jacobs'
  | 'Baden'
  | 'New Hamburg'
  | 'Ayr'
  | 'Preston'
  | 'Hespeler';

export type LawnSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface LawnSizeConfig {
  size: LawnSize;
  label: string;
  sqftRange: string;
  basePrice: number;
  description: string;
}

export type TerrainType = 'flat' | 'sloped' | 'hilly' | 'mixed';

export type Obstacle = 
  | 'trees' 
  | 'garden_beds' 
  | 'playground' 
  | 'pool' 
  | 'shed' 
  | 'fence_sections'
  | 'decorative_rocks'
  | 'other';

export interface GateAccess {
  hasGate: boolean;
  gateCode?: string;
  gateLocation?: string;
  gateNotes?: string;
}

export interface PetInfo {
  hasPets: boolean;
  petType?: 'dog' | 'cat' | 'other';
  petNotes?: string;
  petWillBeSecured: boolean;
}

// ==========================================
// PLAN & SUBSCRIPTION TYPES
// ==========================================

export type PlanFrequency = 'weekly' | 'biweekly' | 'every10days';

export interface Plan {
  id: string;
  frequency: PlanFrequency;
  name: string;
  description: string;
  intervalDays: number;
  discountPercent: number;
  popular: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  propertyId: string;
  planId: string;
  status: SubscriptionStatus;
  startDate: Date;
  pausedUntil?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
  skipTokens: number;
  stripeSubscriptionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SubscriptionStatus = 
  | 'active' 
  | 'paused' 
  | 'cancelled' 
  | 'pending' 
  | 'past_due';

// ==========================================
// SERVICE WINDOW TYPES
// ==========================================

export type ServiceWindowType = 
  | 'mon_wed' 
  | 'tue_thu' 
  | 'wed_fri' 
  | 'thu_sat';

export interface ServiceWindow {
  type: ServiceWindowType;
  label: string;
  days: string[];
  description: string;
}

export interface ExactDayOption {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  premiumPrice: number;
}

// ==========================================
// BOOKING TYPES
// ==========================================

export interface Booking {
  id: string;
  subscriptionId?: string;
  propertyId: string;
  serviceType: ServiceType;
  status: BookingStatus;
  scheduledWindow: {
    startDate: Date;
    endDate: Date;
    exactDay?: Date;
  };
  actualServiceDate?: Date;
  addOns: AddOn[];
  totalPrice: number;
  crewId?: string;
  routeStopId?: string;
  completionPhotos?: CompletionPhoto[];
  notes?: string;
  weatherDelay: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ServiceType = 
  | 'subscription_cut'
  | 'single_cut'
  | 'overgrown_rescue'
  | 'pre_listing'
  | 'pre_party';

export type BookingStatus = 
  | 'scheduled'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'skipped'
  | 'cancelled'
  | 'weather_delayed'
  | 'access_issue';

// ==========================================
// ADD-ON TYPES
// ==========================================

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  category: AddOnCategory;
  icon: string;
}

export type AddOnCategory = 
  | 'edging'
  | 'trimming'
  | 'cleanup'
  | 'seasonal';

// ==========================================
// PAYMENT TYPES
// ==========================================

export interface Payment {
  id: string;
  userId: string;
  bookingId?: string;
  subscriptionId?: string;
  amount: number;
  currency: 'CAD';
  status: PaymentStatus;
  stripePaymentIntentId?: string;
  stripeInvoiceId?: string;
  cardLast4?: string;
  cardBrand?: string;
  receiptUrl?: string;
  createdAt: Date;
}

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

// ==========================================
// CREW & ROUTE TYPES
// ==========================================

export interface Crew {
  id: string;
  name: string;
  members: CrewMember[];
  vehicleInfo: string;
  activeRouteId?: string;
  status: CrewStatus;
}

export interface CrewMember {
  id: string;
  name: string;
  phone: string;
  role: 'lead' | 'member';
}

export type CrewStatus = 'available' | 'on_route' | 'off_duty';

export interface Route {
  id: string;
  crewId: string;
  date: Date;
  serviceWindow: ServiceWindowType;
  stops: RouteStop[];
  status: RouteStatus;
  startTime?: Date;
  endTime?: Date;
  totalDistance: number;
  estimatedDuration: number;
}

export type RouteStatus = 
  | 'planned'
  | 'in_progress'
  | 'completed'
  | 'partially_completed';

export interface RouteStop {
  id: string;
  routeId: string;
  bookingId: string;
  propertyId: string;
  sequence: number;
  status: RouteStopStatus;
  estimatedArrival: Date;
  actualArrival?: Date;
  completedAt?: Date;
  problemFlags: ProblemFlag[];
  notes?: string;
}

export type RouteStopStatus = 
  | 'pending'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'skipped'
  | 'issue';

export type ProblemFlag = 
  | 'locked_gate'
  | 'dog_present'
  | 'overgrown'
  | 'rain_delay'
  | 'customer_request'
  | 'equipment_issue'
  | 'other';

// ==========================================
// PHOTO TYPES
// ==========================================

export interface CompletionPhoto {
  id: string;
  bookingId: string;
  type: 'before' | 'after';
  url: string;
  thumbnailUrl: string;
  uploadedAt: Date;
  uploadedBy: string;
}

// ==========================================
// NOTIFICATION TYPES
// ==========================================

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export type NotificationType = 
  | 'booking_confirmed'
  | 'service_reminder'
  | 'crew_arriving'
  | 'service_complete'
  | 'rain_delay'
  | 'access_issue'
  | 'payment_success'
  | 'payment_failed'
  | 'skip_confirmed';

// ==========================================
// SUPPORT TICKET TYPES
// ==========================================

export interface SupportTicket {
  id: string;
  userId: string;
  bookingId?: string;
  category: TicketCategory;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export type TicketCategory = 
  | 'service_quality'
  | 'billing'
  | 'scheduling'
  | 'access_issue'
  | 'other';

export type TicketStatus = 
  | 'open'
  | 'in_progress'
  | 'waiting_customer'
  | 'resolved'
  | 'closed';

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

// ==========================================
// BOOKING FLOW STATE TYPES
// ==========================================

export interface BookingFlowState {
  step: BookingStep;
  address: Partial<Address> | null;
  addressValidated: boolean;
  lawnSize: LawnSize | null;
  terrain: TerrainType | null;
  obstacles: Obstacle[];
  gateAccess: Partial<GateAccess>;
  petInfo: Partial<PetInfo>;
  serviceType: 'subscription' | 'one_time';
  plan: PlanFrequency | null;
  oneTimeService: ServiceType | null;
  serviceWindow: ServiceWindowType | null;
  exactDay: Date | null;
  addOns: string[];
  estimatedPrice: number | null;
  contactInfo: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  };
}

export type BookingStep = 
  | 'address'
  | 'property'
  | 'plan'
  | 'window'
  | 'addons'
  | 'contact'
  | 'payment'
  | 'confirmation';

// ==========================================
// PRICING CONFIG TYPES
// ==========================================

export interface PricingConfig {
  lawnSizes: LawnSizeConfig[];
  terrainMultipliers: Record<TerrainType, number>;
  obstacleCharges: Record<Obstacle, number>;
  addOnPrices: Record<string, number>;
  exactDayPremium: number;
  overgrownSurcharge: number;
  plans: Plan[];
}

// ==========================================
// API RESPONSE TYPES
// ==========================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ==========================================
// FORM VALIDATION TYPES
// ==========================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  values: T;
  errors: ValidationError[];
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
}
