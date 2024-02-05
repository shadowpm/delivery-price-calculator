import {
  minumumCartValueCent,
  maximumDeliveryCost,
  freeDeliveryQualifiedAmountCent,
  rushHourPercentage,
  numberOfItemsFreeOfCharge,
  minimumDistanceFeeCent,
  addedDistanceUnit,
  extraItemSurplusFeeCent,
  numberOfItemsBulk,
  bulkSurchargeFeeCent,
} from './constants';

export interface CostBreakDown {
  smallOrderFee: number;
  distancePrice: number;
  extraItemsFee: number;
  rushHourPercentage: number;
  deliveryPrice: number;
}

const calculateDistanceFee = (distanceMeter: number) =>
  Math.max(
    Math.ceil(distanceMeter / addedDistanceUnit) * 100,
    minimumDistanceFeeCent,
  );
const calculateSmallOrderFee = (cartValueCent: number) =>
  cartValueCent < minumumCartValueCent
    ? minumumCartValueCent - cartValueCent
    : 0;
const calculateExtraItemsFee = (numberOfItems: number) => {
  let result = 0;
  if (numberOfItems > numberOfItemsFreeOfCharge) {
    result =
      (numberOfItems - numberOfItemsFreeOfCharge) * extraItemSurplusFeeCent;
    if (numberOfItems > numberOfItemsBulk) {
      result += bulkSurchargeFeeCent;
    }
  }

  return result;
};
const calculateDeliveryPrice = (
  smallOrderFee: number,
  distancePrice: number,
  numberOfItemsFee: number,
  datetime: Date,
) => {
  let result = smallOrderFee + distancePrice + numberOfItemsFee;
  if (isRushHour(datetime)) {
    result += (result * 20) / 100;
  }

  return Math.min(result, maximumDeliveryCost);
};

export const isRushHour = (datetime: Date): boolean => {
  const isFriday = datetime.getDay() === 5;
  const isBetween3And7 = datetime.getHours() >= 15 && datetime.getHours() <= 19;

  return isFriday && isBetween3And7;
};

export const deliveryPriceCalculator = (
  cartValueCent: number,
  distanceMeter: number,
  numberOfItems: number,
  datetime: Date,
): CostBreakDown => {
  let costBreakdown: CostBreakDown = {
    smallOrderFee: 0,
    distancePrice: 0,
    extraItemsFee: 0,
    rushHourPercentage: 0,
    deliveryPrice: 0,
  };

  if (cartValueCent >= freeDeliveryQualifiedAmountCent) {
    costBreakdown.deliveryPrice = 0;
  } else {
    costBreakdown.smallOrderFee = calculateSmallOrderFee(cartValueCent);
    costBreakdown.distancePrice = calculateDistanceFee(distanceMeter);
    costBreakdown.extraItemsFee = calculateExtraItemsFee(numberOfItems);
    costBreakdown.rushHourPercentage = isRushHour(datetime)
      ? rushHourPercentage
      : 0;
    costBreakdown.deliveryPrice = calculateDeliveryPrice(
      costBreakdown.smallOrderFee,
      costBreakdown.distancePrice,
      costBreakdown.extraItemsFee,
      datetime,
    );
  }

  return costBreakdown;
};

export const centToEuroString = (cent: number): string =>
  (cent / 100).toFixed(2);

export const euroStringToCent = (euro: string): number => Number(euro) * 100;
