import { BusinessMode } from '../store/businessStore';

export const useTerminology = (mode: BusinessMode | null) => {
  const terms = {
    [BusinessMode.FAST_FOOD]: {
      orders: 'Orders',
      tables: 'Counters',
      staff: 'Counter Staff',
      customer: 'Customer',
      reservation: 'Pre-order',
      pos: 'Counter POS',
    },
    [BusinessMode.SIT_DOWN]: {
      orders: 'Orders',
      tables: 'Tables',
      staff: 'Waiters',
      customer: 'Guest',
      reservation: 'Reservation',
      pos: 'Table POS',
    },
    [BusinessMode.CHOP_BAR]: {
      orders: 'Sales',
      tables: 'Spots',
      staff: 'Staff',
      customer: 'Customer',
      reservation: 'Booking',
      pos: 'POS',
    },
    [BusinessMode.CATERING]: {
      orders: 'Events',
      tables: 'Venues',
      staff: 'Catering Team',
      customer: 'Client',
      reservation: 'Event Booking',
      pos: 'Event POS',
    },
  };

  const defaultTerms = terms[BusinessMode.SIT_DOWN];
  const activeTerms = mode ? terms[mode] : defaultTerms;

  return (key: keyof typeof defaultTerms) => activeTerms[key] || defaultTerms[key];
};
