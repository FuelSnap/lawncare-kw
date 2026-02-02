'use client';

import { useState, useCallback } from 'react';
import { 
  MapPin, 
  Home, 
  Calendar, 
  Clock, 
  Plus, 
  User, 
  CreditCard, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Leaf,
  AlertCircle,
  Lock,
  Dog,
  Camera,
  Shield
} from 'lucide-react';
import { 
  Button, 
  Input, 
  Card, 
  RadioCard, 
  Checkbox, 
  Progress, 
  Alert,
  Select,
  StepIndicator
} from '@/components/ui';
import { 
  LAWN_SIZES, 
  TERRAIN_OPTIONS, 
  OBSTACLE_OPTIONS,
  PLANS,
  SERVICE_WINDOWS,
  ADD_ONS,
  ONE_TIME_SERVICES,
  EXACT_DAY_PREMIUM,
  SERVICE_AREAS
} from '@/lib/constants';
import { 
  formatPrice, 
  isValidPostalCode, 
  isInServiceArea, 
  isValidEmail, 
  isValidPhone,
  formatPhone,
  getNextWindowDates,
  formatDateRange,
  cn
} from '@/lib/utils';
import { 
  BookingFlowState, 
  LawnSize, 
  TerrainType, 
  Obstacle, 
  PlanFrequency, 
  ServiceWindowType,
  ServiceType
} from '@/types';

// Step definitions for the indicator
const STEPS = [
  { id: 'address', name: 'Address' },
  { id: 'property', name: 'Property' },
  { id: 'plan', name: 'Plan' },
  { id: 'window', name: 'Window' },
  { id: 'addons', name: 'Add-ons' },
  { id: 'contact', name: 'Contact' },
  { id: 'payment', name: 'Payment' },
];

// Initial state
const initialState: BookingFlowState = {
  step: 'address',
  address: null,
  addressValidated: false,
  lawnSize: null,
  terrain: null,
  obstacles: [],
  gateAccess: { hasGate: false },
  petInfo: { hasPets: false, petWillBeSecured: true },
  serviceType: 'subscription',
  plan: null,
  oneTimeService: null,
  serviceWindow: null,
  exactDay: null,
  addOns: [],
  estimatedPrice: null,
  contactInfo: {
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
  },
};

export default function BookPage() {
  const [state, setState] = useState<BookingFlowState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate price based on selections
  const calculatePrice = useCallback(() => {
    if (!state.lawnSize || !state.terrain) return null;

    const sizeConfig = LAWN_SIZES.find(s => s.size === state.lawnSize);
    if (!sizeConfig) return null;

    let basePrice = sizeConfig.basePrice;
    
    // Terrain multiplier
    const terrainMultiplier = state.terrain === 'flat' ? 1 : 
                             state.terrain === 'sloped' ? 1.1 : 
                             state.terrain === 'hilly' ? 1.2 : 1.15;
    basePrice *= terrainMultiplier;

    // Obstacle charges
    const obstacleCharges = state.obstacles.length * 5;
    basePrice += obstacleCharges;

    // Add-ons
    const addOnsTotal = state.addOns.reduce((sum, id) => {
      const addon = ADD_ONS.find(a => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);
    basePrice += addOnsTotal;

    // Exact day premium
    if (state.exactDay) {
      basePrice += EXACT_DAY_PREMIUM;
    }

    // Subscription discount
    if (state.serviceType === 'subscription' && state.plan) {
      const plan = PLANS.find(p => p.frequency === state.plan);
      if (plan) {
        basePrice *= (1 - plan.discountPercent / 100);
      }
    }

    // One-time multiplier
    if (state.serviceType === 'one_time' && state.oneTimeService) {
      const service = ONE_TIME_SERVICES.find(s => s.id === state.oneTimeService);
      if (service) {
        basePrice *= service.priceMultiplier;
      }
    }

    return Math.round(basePrice * 100) / 100;
  }, [state]);

  const price = calculatePrice();

  // Update field helper
  const updateField = <K extends keyof BookingFlowState>(field: K, value: BookingFlowState[K]) => {
    setState(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // Navigation
  const goToStep = (step: BookingFlowState['step']) => {
    setState(prev => ({ ...prev, step }));
  };

  const nextStep = () => {
    const stepOrder: BookingFlowState['step'][] = ['address', 'property', 'plan', 'window', 'addons', 'contact', 'payment', 'confirmation'];
    const currentIndex = stepOrder.indexOf(state.step);
    if (currentIndex < stepOrder.length - 1) {
      goToStep(stepOrder[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const stepOrder: BookingFlowState['step'][] = ['address', 'property', 'plan', 'window', 'addons', 'contact', 'payment', 'confirmation'];
    const currentIndex = stepOrder.indexOf(state.step);
    if (currentIndex > 0) {
      goToStep(stepOrder[currentIndex - 1]);
    }
  };

  // Validation
  const validateAddress = () => {
    const newErrors: Record<string, string> = {};
    
    if (!state.address?.street?.trim()) {
      newErrors.street = 'Please enter your street address';
    }
    if (!state.address?.city) {
      newErrors.city = 'Please select your city';
    }
    if (!state.address?.postalCode) {
      newErrors.postalCode = 'Please enter your postal code';
    } else if (!isValidPostalCode(state.address.postalCode)) {
      newErrors.postalCode = 'Please enter a valid postal code (e.g., N2L 3G1)';
    } else if (!isInServiceArea(state.address.postalCode)) {
      newErrors.postalCode = 'Sorry, this address is outside our service area';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateContact = () => {
    const newErrors: Record<string, string> = {};
    
    if (!state.contactInfo.firstName?.trim()) {
      newErrors.firstName = 'Please enter your first name';
    }
    if (!state.contactInfo.lastName?.trim()) {
      newErrors.lastName = 'Please enter your last name';
    }
    if (!state.contactInfo.email?.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!isValidEmail(state.contactInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!state.contactInfo.phone?.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!isValidPhone(state.contactInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Get completed steps
  const completedSteps = STEPS.filter(step => {
    switch (step.id) {
      case 'address': return state.addressValidated;
      case 'property': return !!state.lawnSize && !!state.terrain;
      case 'plan': return state.serviceType === 'subscription' ? !!state.plan : !!state.oneTimeService;
      case 'window': return !!state.serviceWindow;
      case 'addons': return true;
      case 'contact': return !!state.contactInfo.email && !!state.contactInfo.phone;
      default: return false;
    }
  }).map(s => s.id);

  // Render step content
  const renderStep = () => {
    switch (state.step) {
      // ================== ADDRESS STEP ==================
      case 'address':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-primary">
                Where's Your Property?
              </h2>
              <p className="text-neutral-darkgray mt-2">
                We'll verify your address is in our service area.
              </p>
            </div>

            <div className="space-y-4">
              <Input
                label="Street Address"
                placeholder="123 Main Street"
                value={state.address?.street || ''}
                onChange={(e) => updateField('address', { ...state.address, street: e.target.value })}
                error={errors.street}
                required
              />

              <Input
                label="Unit/Apt (Optional)"
                placeholder="Unit 2B"
                value={state.address?.unit || ''}
                onChange={(e) => updateField('address', { ...state.address, unit: e.target.value })}
              />

              <Select
                label="City"
                placeholder="Select your city"
                value={state.address?.city || ''}
                onChange={(e) => updateField('address', { ...state.address, city: e.target.value as any })}
                options={SERVICE_AREAS.map(a => ({ value: a.city, label: a.city }))}
                error={errors.city}
                required
              />

              <Input
                label="Postal Code"
                placeholder="N2L 3G1"
                value={state.address?.postalCode || ''}
                onChange={(e) => updateField('address', { ...state.address, postalCode: e.target.value.toUpperCase() })}
                error={errors.postalCode}
                hint="We serve Kitchener, Waterloo, Cambridge, Guelph and surrounding areas"
                required
              />
            </div>

            <Button 
              fullWidth 
              size="lg"
              onClick={() => {
                if (validateAddress()) {
                  updateField('addressValidated', true);
                  nextStep();
                }
              }}
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        );

      // ================== PROPERTY STEP ==================
      case 'property':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-primary">
                Tell Us About Your Property
              </h2>
              <p className="text-neutral-darkgray mt-2">
                This helps us provide an accurate quote.
              </p>
            </div>

            {/* Lawn Size */}
            <div>
              <label className="block text-base font-medium text-neutral-charcoal mb-3">
                Lawn Size <span className="text-error">*</span>
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {LAWN_SIZES.map((size) => (
                  <RadioCard
                    key={size.size}
                    name="lawnSize"
                    label={size.label}
                    description={size.sqftRange}
                    price={`From ${formatPrice(size.basePrice)}/cut`}
                    checked={state.lawnSize === size.size}
                    onChange={() => updateField('lawnSize', size.size)}
                  />
                ))}
              </div>
            </div>

            {/* Terrain */}
            <div>
              <label className="block text-base font-medium text-neutral-charcoal mb-3">
                Terrain Type <span className="text-error">*</span>
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {TERRAIN_OPTIONS.map((terrain) => (
                  <RadioCard
                    key={terrain.value}
                    name="terrain"
                    label={terrain.label}
                    description={terrain.description}
                    checked={state.terrain === terrain.value}
                    onChange={() => updateField('terrain', terrain.value)}
                  />
                ))}
              </div>
            </div>

            {/* Obstacles */}
            <div>
              <label className="block text-base font-medium text-neutral-charcoal mb-3">
                Obstacles (Select all that apply)
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {OBSTACLE_OPTIONS.map((obstacle) => (
                  <Checkbox
                    key={obstacle.value}
                    label={obstacle.label}
                    checked={state.obstacles.includes(obstacle.value)}
                    onChange={() => {
                      const newObstacles = state.obstacles.includes(obstacle.value)
                        ? state.obstacles.filter(o => o !== obstacle.value)
                        : [...state.obstacles, obstacle.value];
                      updateField('obstacles', newObstacles);
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-neutral-darkgray mt-2">
                Each obstacle may add $3-5 to your price.
              </p>
            </div>

            {/* Gate Access */}
            <div className="bg-brand-50 rounded-xl p-5">
              <Checkbox
                label="My property has a gate"
                description="We'll ask for the code to ensure access"
                checked={state.gateAccess.hasGate}
                onChange={(e) => updateField('gateAccess', { ...state.gateAccess, hasGate: e.target.checked })}
              />
              
              {state.gateAccess.hasGate && (
                <div className="mt-4 ml-10">
                  <Input
                    label="Gate Code"
                    placeholder="Enter gate code"
                    value={state.gateAccess.gateCode || ''}
                    onChange={(e) => updateField('gateAccess', { ...state.gateAccess, gateCode: e.target.value })}
                    leftIcon={<Lock className="w-5 h-5" />}
                    hint="This is stored securely and only shared with our crew"
                  />
                </div>
              )}
            </div>

            {/* Pets */}
            <div className="bg-brand-50 rounded-xl p-5">
              <Checkbox
                label="I have pets (dogs)"
                description="We'll send reminders to secure them before service"
                checked={state.petInfo.hasPets}
                onChange={(e) => updateField('petInfo', { ...state.petInfo, hasPets: e.target.checked })}
              />
              
              {state.petInfo.hasPets && (
                <Alert variant="info" className="mt-4 ml-10">
                  <strong>Pet Safety:</strong> For everyone's safety, please keep dogs inside or in a separate area during your service window.
                </Alert>
              )}
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" onClick={prevStep}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <Button 
                fullWidth 
                size="lg"
                disabled={!state.lawnSize || !state.terrain}
                onClick={nextStep}
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        );

      // ================== PLAN STEP ==================
      case 'plan':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-primary">
                Choose Your Plan
              </h2>
              <p className="text-neutral-darkgray mt-2">
                Subscription or one-time service?
              </p>
            </div>

            {/* Service Type Toggle */}
            <div className="flex bg-neutral-lightgray rounded-xl p-1">
              <button
                className={cn(
                  'flex-1 py-3 px-4 rounded-lg font-medium transition-all',
                  state.serviceType === 'subscription' 
                    ? 'bg-white text-primary shadow-soft' 
                    : 'text-neutral-darkgray hover:text-primary'
                )}
                onClick={() => updateField('serviceType', 'subscription')}
              >
                Subscription
              </button>
              <button
                className={cn(
                  'flex-1 py-3 px-4 rounded-lg font-medium transition-all',
                  state.serviceType === 'one_time' 
                    ? 'bg-white text-primary shadow-soft' 
                    : 'text-neutral-darkgray hover:text-primary'
                )}
                onClick={() => updateField('serviceType', 'one_time')}
              >
                One-Time
              </button>
            </div>

            {/* Subscription Plans */}
            {state.serviceType === 'subscription' && (
              <div className="space-y-3">
                {PLANS.map((plan) => (
                  <RadioCard
                    key={plan.id}
                    name="plan"
                    label={plan.name}
                    description={plan.description}
                    badge={plan.popular ? 'Most Popular' : undefined}
                    checked={state.plan === plan.frequency}
                    onChange={() => updateField('plan', plan.frequency)}
                  >
                    <span className="text-success font-semibold">Save {plan.discountPercent}%</span>
                  </RadioCard>
                ))}
              </div>
            )}

            {/* One-Time Services */}
            {state.serviceType === 'one_time' && (
              <div className="space-y-3">
                {ONE_TIME_SERVICES.map((service) => (
                  <RadioCard
                    key={service.id}
                    name="oneTimeService"
                    label={service.name}
                    description={service.description}
                    checked={state.oneTimeService === service.id}
                    onChange={() => updateField('oneTimeService', service.id as ServiceType)}
                  />
                ))}
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="ghost" onClick={prevStep}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <Button 
                fullWidth 
                size="lg"
                disabled={state.serviceType === 'subscription' ? !state.plan : !state.oneTimeService}
                onClick={nextStep}
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        );

      // ================== WINDOW STEP ==================
      case 'window':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-primary">
                Pick Your Service Window
              </h2>
              <p className="text-neutral-darkgray mt-2">
                We'll arrive within your chosen 2-3 day window.
              </p>
            </div>

            <div className="space-y-3">
              {SERVICE_WINDOWS.map((window) => (
                <RadioCard
                  key={window.type}
                  selected={state.serviceWindow === window.type}
                  onClick={() => updateField('serviceWindow', window.type)}
                  title={window.label}
                  description={window.description}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" onClick={prevStep}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <Button 
                fullWidth 
                size="lg"
                disabled={!state.serviceWindow}
                onClick={nextStep}
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        );

      // ================== ADD-ONS STEP ==================
      case 'addons':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-primary">
                Add-On Services
              </h2>
              <p className="text-neutral-darkgray mt-2">
                Customize your service with these optional extras.
              </p>
            </div>

            <div className="space-y-3">
              {ADD_ONS.map((addon) => (
                <div 
                  key={addon.id}
                  className={cn(
                    'flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all',
                    state.addOns.includes(addon.id)
                      ? 'border-primary bg-brand-50'
                      : 'border-neutral-midgray bg-white hover:border-primary/50'
                  )}
                  onClick={() => {
                    const newAddOns = state.addOns.includes(addon.id)
                      ? state.addOns.filter(a => a !== addon.id)
                      : [...state.addOns, addon.id];
                    updateField('addOns', newAddOns);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <Checkbox
                      label=""
                      checked={state.addOns.includes(addon.id)}
                      onChange={() => {}}
                    />
                    <div>
                      <p className="font-semibold text-primary">{addon.name}</p>
                      <p className="text-sm text-neutral-darkgray">{addon.description}</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-accent">
                    +{formatPrice(addon.price)}
                  </span>
                </div>
              ))}
            </div>

            <Alert variant="info">
              <strong>Tip:</strong> You can always add or remove add-ons later from your account.
            </Alert>

            <div className="flex gap-4">
              <Button variant="ghost" onClick={prevStep}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <Button 
                fullWidth 
                size="lg"
                onClick={nextStep}
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        );

      // ================== CONTACT STEP ==================
      case 'contact':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-primary">
                Your Contact Information
              </h2>
              <p className="text-neutral-darkgray mt-2">
                We'll use this to send notifications and receipts.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="John"
                value={state.contactInfo.firstName}
                onChange={(e) => updateField('contactInfo', { ...state.contactInfo, firstName: e.target.value })}
                error={errors.firstName}
                required
              />
              <Input
                label="Last Name"
                placeholder="Smith"
                value={state.contactInfo.lastName}
                onChange={(e) => updateField('contactInfo', { ...state.contactInfo, lastName: e.target.value })}
                error={errors.lastName}
                required
              />
            </div>

            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={state.contactInfo.email}
              onChange={(e) => updateField('contactInfo', { ...state.contactInfo, email: e.target.value })}
              error={errors.email}
              hint="We'll send confirmations and photo proofs here"
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="(519) 555-1234"
              value={state.contactInfo.phone}
              onChange={(e) => updateField('contactInfo', { ...state.contactInfo, phone: e.target.value })}
              error={errors.phone}
              hint="For service notifications and if we need to reach you"
              required
            />

            <div className="flex gap-4">
              <Button variant="ghost" onClick={prevStep}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <Button 
                fullWidth 
                size="lg"
                onClick={() => {
                  if (validateContact()) {
                    nextStep();
                  }
                }}
              >
                Continue to Payment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        );

      // ================== PAYMENT STEP ==================
      case 'payment':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-primary">
                Secure Payment
              </h2>
              <p className="text-neutral-darkgray mt-2">
                Add your card securely. You're only charged after service.
              </p>
            </div>

            {/* Order Summary */}
            <Card className="bg-brand-50 border-brand-200">
              <h3 className="font-heading text-lg font-semibold text-primary mb-4">
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-darkgray">Service</span>
                  <span className="font-medium">
                    {state.serviceType === 'subscription' 
                      ? PLANS.find(p => p.frequency === state.plan)?.name
                      : ONE_TIME_SERVICES.find(s => s.id === state.oneTimeService)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-darkgray">Lawn Size</span>
                  <span className="font-medium">
                    {LAWN_SIZES.find(s => s.size === state.lawnSize)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-darkgray">Window</span>
                  <span className="font-medium">
                    {SERVICE_WINDOWS.find(w => w.type === state.serviceWindow)?.label}
                  </span>
                </div>
                {state.addOns.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-darkgray">Add-ons</span>
                    <span className="font-medium">{state.addOns.length} selected</span>
                  </div>
                )}
                <div className="border-t border-brand-200 pt-3 mt-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-primary">
                      {state.serviceType === 'subscription' ? 'Per Cut' : 'Total'}
                    </span>
                    <span className="font-bold text-accent">
                      {price ? formatPrice(price) : '--'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 py-4 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Cancel anytime</span>
              </div>
            </div>

            {/* Stripe placeholder */}
            <Card>
              {/* Placeholder for Stripe Elements */}
              <div className="space-y-4">
                <Input
                  label="Card Number"
                  placeholder="4242 4242 4242 4242"
                  disabled
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry"
                    placeholder="MM/YY"
                    disabled
                  />
                  <Input
                    label="CVC"
                    placeholder="123"
                    disabled
                  />
                </div>
              </div>

              <Alert variant="info" className="mt-4">
                <strong>Note:</strong> This is a demo. In production, Stripe Elements would be integrated here for secure payment processing.
              </Alert>
            </Card>

            <p className="text-sm text-neutral-darkgray text-center">
              By completing this booking, you agree to our{' '}
              <a href="/terms" className="text-primary underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-primary underline">Privacy Policy</a>.
            </p>

            <div className="flex gap-4">
              <Button variant="ghost" onClick={prevStep}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <Button 
                fullWidth 
                size="lg"
                loading={isSubmitting}
                onClick={() => {
                  setIsSubmitting(true);
                  // Simulate payment processing
                  setTimeout(() => {
                    setIsSubmitting(false);
                    goToStep('confirmation');
                  }, 2000);
                }}
              >
                Complete Booking
              </Button>
            </div>
          </div>
        );

      // ================== CONFIRMATION STEP ==================
      case 'confirmation':
        const windowDates = state.serviceWindow ? getNextWindowDates(state.serviceWindow) : null;
        
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary mb-2">
                You're All Set!
              </h2>
              <p className="text-xl text-neutral-darkgray">
                Your lawn care is now on autopilot.
              </p>
            </div>

            <Card className="text-left">
              <h3 className="font-heading text-lg font-semibold text-primary mb-4">
                What Happens Next
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-primary">Confirmation Email</p>
                    <p className="text-sm text-neutral-darkgray">
                      Check {state.contactInfo.email} for your booking details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-primary">First Service</p>
                    <p className="text-sm text-neutral-darkgray">
                      {windowDates 
                        ? `We'll arrive between ${formatDateRange(windowDates.start, windowDates.end)}`
                        : 'Your first service is being scheduled'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Camera className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Photo Proof</p>
                    <p className="text-sm text-neutral-darkgray">
                      After each visit, you'll receive before & after photos.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-brand-50 rounded-xl p-6">
              <p className="text-sm text-neutral-darkgray mb-2">Your estimated price per cut:</p>
              <p className="text-4xl font-bold text-accent">
                {price ? formatPrice(price) : '--'}
              </p>
            </div>

            <Button 
              size="lg" 
              fullWidth
              onClick={() => window.location.href = '/'}
            >
              Back to Home
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-offwhite py-8 md:py-12">
      <div className="container-wide max-w-2xl">
        {/* Progress Bar */}
        {state.step !== 'confirmation' && (
          <div className="mb-8">
            <Progress value={completedSteps.length} max={STEPS.length} />
            <div className="flex justify-between mt-2 text-sm text-neutral-darkgray">
              <span>Step {completedSteps.length + 1} of {STEPS.length}</span>
              <span>{Math.round((completedSteps.length / STEPS.length) * 100)}% complete</span>
            </div>
          </div>
        )}

        {/* Step Content */}
        <Card variant="elevated" padding="lg">
          {renderStep()}
        </Card>

        {/* Price Preview - Sticky on larger screens */}
        {state.step !== 'confirmation' && price && (
          <div className="mt-6 bg-white rounded-xl p-4 shadow-soft border border-neutral-midgray flex items-center justify-between">
            <span className="text-neutral-darkgray">
              Estimated {state.serviceType === 'subscription' ? 'per cut' : 'total'}:
            </span>
            <span className="text-2xl font-bold text-accent">
              {formatPrice(price)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
