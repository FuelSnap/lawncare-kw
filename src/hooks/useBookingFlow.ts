'use client';

import { useState, useCallback, useMemo } from 'react';
import { BookingFlowState, BookingStep, LawnSize, TerrainType, Obstacle, PlanFrequency, ServiceWindowType } from '@/types';
import { calculateSubscriptionPrice, calculateOneTimePrice, isStepComplete, getNextBookingStep, getPreviousBookingStep, getBookingProgress } from '@/lib/utils';

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

export function useBookingFlow() {
  const [state, setState] = useState<BookingFlowState>(initialState);

  // Update a single field
  const updateField = useCallback(<K extends keyof BookingFlowState>(
    field: K,
    value: BookingFlowState[K]
  ) => {
    setState(prev => ({ ...prev, [field]: value }));
  }, []);

  // Update multiple fields at once
  const updateFields = useCallback((fields: Partial<BookingFlowState>) => {
    setState(prev => ({ ...prev, ...fields }));
  }, []);

  // Navigate to next step
  const nextStep = useCallback(() => {
    const next = getNextBookingStep(state.step);
    if (next && isStepComplete(state, state.step)) {
      setState(prev => ({ ...prev, step: next }));
    }
  }, [state]);

  // Navigate to previous step
  const prevStep = useCallback(() => {
    const prev = getPreviousBookingStep(state.step);
    if (prev) {
      setState(prev => ({ ...prev, step: prev }));
    }
  }, [state.step]);

  // Go to specific step
  const goToStep = useCallback((step: BookingStep) => {
    setState(prev => ({ ...prev, step }));
  }, []);

  // Toggle obstacle
  const toggleObstacle = useCallback((obstacle: Obstacle) => {
    setState(prev => ({
      ...prev,
      obstacles: prev.obstacles.includes(obstacle)
        ? prev.obstacles.filter(o => o !== obstacle)
        : [...prev.obstacles, obstacle],
    }));
  }, []);

  // Toggle add-on
  const toggleAddOn = useCallback((addOnId: string) => {
    setState(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId)
        ? prev.addOns.filter(a => a !== addOnId)
        : [...prev.addOns, addOnId],
    }));
  }, []);

  // Calculate price
  const priceBreakdown = useMemo(() => {
    if (!state.lawnSize || !state.terrain) return null;

    if (state.serviceType === 'subscription' && state.plan) {
      return calculateSubscriptionPrice(
        state.lawnSize,
        state.terrain,
        state.obstacles,
        state.plan,
        state.addOns,
        !!state.exactDay
      );
    }

    if (state.serviceType === 'one_time' && state.oneTimeService) {
      const price = calculateOneTimePrice(
        state.oneTimeService,
        state.lawnSize,
        state.terrain,
        state.obstacles,
        state.addOns
      );
      return {
        basePrice: 0,
        terrainAdjustment: 0,
        obstacleCharges: 0,
        addOnsTotal: 0,
        exactDayPremium: 0,
        subtotal: price,
        discount: 0,
        finalPrice: price,
      };
    }

    return null;
  }, [state]);

  // Progress percentage
  const progress = useMemo(() => getBookingProgress(state.step), [state.step]);

  // Check if current step is complete
  const currentStepComplete = useMemo(() => isStepComplete(state, state.step), [state]);

  // Reset flow
  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  // Get completed steps for step indicator
  const completedSteps = useMemo(() => {
    const steps: BookingStep[] = ['address', 'property', 'plan', 'window', 'addons', 'contact', 'payment', 'confirmation'];
    const currentIndex = steps.indexOf(state.step);
    
    return steps.filter((step, index) => {
      if (index < currentIndex) return true;
      return isStepComplete(state, step);
    });
  }, [state]);

  return {
    state,
    updateField,
    updateFields,
    nextStep,
    prevStep,
    goToStep,
    toggleObstacle,
    toggleAddOn,
    priceBreakdown,
    progress,
    currentStepComplete,
    completedSteps,
    reset,
  };
}

export type UseBookingFlowReturn = ReturnType<typeof useBookingFlow>;
