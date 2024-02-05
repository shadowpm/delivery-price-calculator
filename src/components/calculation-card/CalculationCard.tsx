import { CostBreakDown } from '../../utils/deliveryPriceCalculator';
import PriceItem from './price-item/PriceItem';
import { centToEuroString } from '../../utils/deliveryPriceCalculator';
import './style.css';

interface Props {
  costBreakdown: CostBreakDown;
}

const CalculationCard: React.FC<Props> = ({ costBreakdown }) => {
  return (
    <div className="card">
      <div>
        <h4>Delivery price breakdown</h4>
        <PriceItem
          title="Small order fee"
          amount={centToEuroString(costBreakdown?.smallOrderFee)}
          dataTestId="small-order-fee"
          sign="€"
        />
        <PriceItem
          title="Distance price"
          amount={centToEuroString(costBreakdown?.distancePrice)}
          dataTestId="distance-fee"
          sign="€"
        />
        <PriceItem
          title="Extra items fee"
          amount={centToEuroString(costBreakdown?.extraItemsFee)}
          dataTestId="extra-items-fee"
          sign="€"
        />
        {costBreakdown?.rushHourPercentage !== 0 && (
          <PriceItem
            title="Rush hour rate"
            amount={costBreakdown?.rushHourPercentage}
            dataTestId="rush-hour-fee"
            sign="%"
          />
        )}
      </div>

      <PriceItem
        title="Delivery price"
        amount={centToEuroString(costBreakdown?.deliveryPrice)}
        dataTestId="delivery-price"
        sign="€"
      />
    </div>
  );
};

export default CalculationCard;
