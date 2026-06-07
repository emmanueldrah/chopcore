import { useBusinessStore, BusinessMode } from '../store/businessStore';

export const getBusinessMode = () => useBusinessStore.getState().mode;

export const isFeatureEnabled = (feature: string): boolean => {
  const mode = getBusinessMode();
  if (!mode) return false;

  const matrix: Record<string, BusinessMode[]> = {
    'TABLES': [BusinessMode.SIT_DOWN, BusinessMode.CHOP_BAR],
    'QUICK_ORDER': [BusinessMode.FAST_FOOD, BusinessMode.CHOP_BAR],
    'RESERVATIONS': [BusinessMode.SIT_DOWN, BusinessMode.CATERING],
    'EVENTS': [BusinessMode.CATERING],
    'DELIVERY': [BusinessMode.FAST_FOOD, BusinessMode.SIT_DOWN, BusinessMode.CHOP_BAR],
    'WAITER_ORDER': [BusinessMode.SIT_DOWN],
    'COURSES': [BusinessMode.SIT_DOWN, BusinessMode.CATERING],
    'LOYALTY': [BusinessMode.FAST_FOOD, BusinessMode.SIT_DOWN, BusinessMode.CHOP_BAR],
  };

  return matrix[feature]?.includes(mode) ?? true;
};
