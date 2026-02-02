import { 
  LawnSize, 
  TerrainType, 
  Obstacle, 
  PlanFrequency,
  BookingFlowState,
  Address
} from '@/types';
import { 
  LAWN_SIZES, 
  TERRAIN_MULTIPLIERS, 
  OBSTACLE_CHARGES,
  PLANS,
  ADD_ONS,
  EXACT_DAY_PREMIUM,
  OVERGROWN_SURCHARGE,
  SUPPORTED_POSTAL_PREFIXES,
  ONE_TIME_SERVICES
} from './constants';

// ==========================================
// PRICING CALCULATIONS
// ==========================================

/**
 * Calculate the base price for a lawn based on size
 */
export function getBasePriceForSize(size: LawnSize): number {
  const config = LAWN_SIZES.find(s => s.size === size);
  return config?.basePrice ?? 55;
}

/**
 * Calculate terrain adjustment
 */
export function getTerrainMultiplier(terrain: TerrainType): number {
  return TERRAIN_MULTIPLIERS[terrain] ?? 1.0;
}

/**
 * Calculate total obstacle charges
 */
export function calculateObstacleCharges(obstacles: Obstacle[]): number {
  return obstacles.reduce((total, obstacle) => {
    return total + (OBSTACLE_CHARGES[obstacle] ?? 0);
  }, 0);
}

/**
 * Get subscription discount percentage
 */
export function getSubscriptionDiscount(frequency: PlanFrequency): number {
  const plan = PLANS.find(p => p.frequency === frequency);
  return plan?.discountPercent ?? 0;
}

/**
 * Calculate the per-cut price for a subscription
 */
export function calculateSubscriptionPrice(
  lawnSize: LawnSize,
  terrain: TerrainType,
  obstacles: Obstacle[],
  frequency: PlanFrequency,
  addOnIds: string[] = [],
  exactDay: boolean = false
): {
  basePrice: number;
  terrainAdjustment: number;
  obstacleCharges: number;
  addOnsTotal: number;
  exactDayPremium: number;
  subtotal: number;
  discount: number;
  finalPrice: number;
} {
  const basePrice = getBasePriceForSize(lawnSize);
  const terrainMultiplier = getTerrainMultiplier(terrain);
  const terrainAdjustment = basePrice * (terrainMultiplier - 1);
  const obstacleCharges = calculateObstacleCharges(obstacles);
  
  const addOnsTotal = addOnIds.reduce((total, id) => {
    const addon = ADD_ONS.find(a => a.id === id);
    return total + (addon?.price ?? 0);
  }, 0);
  
  const exactDayPremium = exactDay ? EXACT_DAY_PREMIUM : 0;
  
  const subtotal = basePrice + terrainAdjustment + obstacleCharges + addOnsTotal + exactDayPremium;
  
  const discountPercent = getSubscriptionDiscount(frequency);
  const discount = subtotal * (discountPercent / 100);
  
  const finalPrice = Math.round((subtotal - discount) * 100) / 100;
  
  return {
    basePrice,
    terrainAdjustment: Math.round(terrainAdjustment * 100) / 100,
    obstacleCharges,
    addOnsTotal,
    exactDayPremium,
    subtotal,
    discount: Math.round(discount * 100) / 100,
    finalPrice,
  };
}

/**
 * Calculate one-time service price
 */
export function calculateOneTimePrice(
  serviceType: string,
  lawnSize: LawnSize,
  terrain: TerrainType,
  obstacles: Obstacle[],
  addOnIds: string[] = []
): number {
  const basePrice = getBasePriceForSize(lawnSize);
  const terrainMultiplier = getTerrainMultiplier(terrain);
  const obstacleCharges = calculateObstacleCharges(obstacles);
  
  const addOnsTotal = addOnIds.reduce((total, id) => {
    const addon = ADD_ONS.find(a => a.id === id);
    return total + (addon?.price ?? 0);
  }, 0);
  
  const service = ONE_TIME_SERVICES.find(s => s.id === serviceType);
  const serviceMultiplier = service?.priceMultiplier ?? 1.25;
  
  const baseTotal = (basePrice * terrainMultiplier) + obstacleCharges;
  const servicePrice = baseTotal * serviceMultiplier;
  
  return Math.round((servicePrice + addOnsTotal) * 100) / 100;
}

/**
 * Format price as CAD currency
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// ==========================================
// ADDRESS VALIDATION
// ==========================================

/**
 * Validate postal code format (Canadian)
 */
export function isValidPostalCode(postalCode: string): boolean {
  const cleaned = postalCode.replace(/\s/g, '').toUpperCase();
  const pattern = /^[A-Z]\d[A-Z]\d[A-Z]\d$/;
  return pattern.test(cleaned);
}

/**
 * Check if postal code is in service area
 */
export function isInServiceArea(postalCode: string): boolean {
  const cleaned = postalCode.replace(/\s/g, '').toUpperCase();
  const prefix = cleaned.substring(0, 3);
  return SUPPORTED_POSTAL_PREFIXES.includes(prefix);
}

/**
 * Format postal code with space
 */
export function formatPostalCode(postalCode: string): string {
  const cleaned = postalCode.replace(/\s/g, '').toUpperCase();
  if (cleaned.length === 6) {
    return `${cleaned.substring(0, 3)} ${cleaned.substring(3)}`;
  }
  return cleaned;
}

/**
 * Validate full address
 */
export function validateAddress(address: Partial<Address>): string[] {
  const errors: string[] = [];
  
  if (!address.street?.trim()) {
    errors.push('Street address is required');
  }
  
  if (!address.city) {
    errors.push('City is required');
  }
  
  if (!address.postalCode) {
    errors.push('Postal code is required');
  } else if (!isValidPostalCode(address.postalCode)) {
    errors.push('Invalid postal code format');
  } else if (!isInServiceArea(address.postalCode)) {
    errors.push('Sorry, this address is outside our service area');
  }
  
  return errors;
}

// ==========================================
// BOOKING FLOW HELPERS
// ==========================================

/**
 * Get the next step in the booking flow
 */
export function getNextBookingStep(currentStep: BookingFlowState['step']): BookingFlowState['step'] | null {
  const steps: BookingFlowState['step'][] = [
    'address',
    'property',
    'plan',
    'window',
    'addons',
    'contact',
    'payment',
    'confirmation',
  ];
  
  const currentIndex = steps.indexOf(currentStep);
  if (currentIndex === -1 || currentIndex === steps.length - 1) {
    return null;
  }
  
  return steps[currentIndex + 1];
}

/**
 * Get the previous step in the booking flow
 */
export function getPreviousBookingStep(currentStep: BookingFlowState['step']): BookingFlowState['step'] | null {
  const steps: BookingFlowState['step'][] = [
    'address',
    'property',
    'plan',
    'window',
    'addons',
    'contact',
    'payment',
    'confirmation',
  ];
  
  const currentIndex = steps.indexOf(currentStep);
  if (currentIndex <= 0) {
    return null;
  }
  
  return steps[currentIndex - 1];
}

/**
 * Calculate progress percentage
 */
export function getBookingProgress(currentStep: BookingFlowState['step']): number {
  const steps: BookingFlowState['step'][] = [
    'address',
    'property',
    'plan',
    'window',
    'addons',
    'contact',
    'payment',
    'confirmation',
  ];
  
  const currentIndex = steps.indexOf(currentStep);
  if (currentIndex === -1) return 0;
  
  return Math.round(((currentIndex + 1) / steps.length) * 100);
}

/**
 * Check if a step is complete
 */
export function isStepComplete(state: BookingFlowState, step: BookingFlowState['step']): boolean {
  switch (step) {
    case 'address':
      return state.addressValidated && !!state.address?.street;
    case 'property':
      return !!state.lawnSize && !!state.terrain;
    case 'plan':
      return state.serviceType === 'subscription' 
        ? !!state.plan 
        : !!state.oneTimeService;
    case 'window':
      return !!state.serviceWindow;
    case 'addons':
      return true; // Add-ons are optional
    case 'contact':
      return !!state.contactInfo.email && !!state.contactInfo.phone && !!state.contactInfo.firstName;
    case 'payment':
      return false; // Payment completion handled separately
    case 'confirmation':
      return true;
    default:
      return false;
  }
}

// ==========================================
// DATE & TIME HELPERS
// ==========================================

/**
 * Get the next available service window dates
 */
export function getNextWindowDates(windowType: string): { start: Date; end: Date } {
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  // Map window types to start days (0 = Sunday)
  const windowStartDays: Record<string, number> = {
    'mon_wed': 1, // Monday
    'tue_thu': 2, // Tuesday
    'wed_fri': 3, // Wednesday
    'thu_sat': 4, // Thursday
  };
  
  const startDay = windowStartDays[windowType] ?? 1;
  let daysUntilStart = startDay - dayOfWeek;
  
  // If the window has already started this week, move to next week
  if (daysUntilStart <= 0) {
    daysUntilStart += 7;
  }
  
  // Need at least 2 days notice
  if (daysUntilStart < 2) {
    daysUntilStart += 7;
  }
  
  const start = new Date(today);
  start.setDate(today.getDate() + daysUntilStart);
  start.setHours(7, 0, 0, 0);
  
  const end = new Date(start);
  end.setDate(start.getDate() + 2);
  end.setHours(20, 0, 0, 0);
  
  return { start, end };
}

/**
 * Format date range for display
 */
export function formatDateRange(start: Date, end: Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  };
  
  return `${start.toLocaleDateString('en-CA', options)} – ${end.toLocaleDateString('en-CA', options)}`;
}

/**
 * Check if skip is allowed (48+ hours before window)
 */
export function canSkipService(windowStart: Date): boolean {
  const now = new Date();
  const hoursUntilWindow = (windowStart.getTime() - now.getTime()) / (1000 * 60 * 60);
  return hoursUntilWindow >= 48;
}

// ==========================================
// FORM VALIDATION
// ==========================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

/**
 * Validate phone number (Canadian)
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || cleaned.length === 11;
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Combine class names (simplified clsx)
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Generate a simple unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}
