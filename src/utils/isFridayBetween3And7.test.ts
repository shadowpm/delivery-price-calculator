import { isRushHour } from './deliveryPriceCalculator';

describe('isFridayBetween3And7 function', () => {
  it('Should return true for a Friday between 3 PM and 7 PM', () => {
    const fridayAfternoon = new Date('2024-01-19T15:30:00');
    expect(isRushHour(fridayAfternoon)).toBe(true);
  });

  it('Should return false for a non-Friday date', () => {
    const nonFriday = new Date('2024-01-21T16:00:00');
    expect(isRushHour(nonFriday)).toBe(false);
  });

  it('Should return false for a Friday outside the time range', () => {
    const fridayOutsideRange = new Date('2024-01-19T10:00:00');
    expect(isRushHour(fridayOutsideRange)).toBe(false);
  });
});
