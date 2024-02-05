import { useState, FormEvent } from 'react';
import CalculationCard from './components/calculation-card/CalculationCard';
import InputField from './components/ui/input-field/InputField';
import Button from './components/ui/button/Button';
import DateAndTimePicker from './components/ui/date-and-time-picker/DateAndTimePicker';
import Tooltip from './components/ui/tooltip/Tooltip';
import {
  CostBreakDown,
  deliveryPriceCalculator,
  euroStringToCent,
} from './utils/deliveryPriceCalculator';
import './App.css';

const App: React.FC = () => {
  const [cartValue, setCartValue] = useState('');
  const [distance, setDistance] = useState('');
  const [itemsAmount, setItemsAmount] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [deliveryCostBreakdown, setDeliveryCostBreakdown] =
    useState<CostBreakDown>({
      smallOrderFee: 0,
      distancePrice: 0,
      extraItemsFee: 0,
      rushHourPercentage: 0,
      deliveryPrice: 0,
    });
  const [formErrors, setFormErrors] = useState({
    cartValue: false,
    distance: false,
    itemsAmount: false,
  });

  const handleDateTimeChange = (newDateTime: Date | null) => {
    if (newDateTime instanceof Date) {
      setDateTime(newDateTime);
    }
  };

  const handleOnClickDeliveryPriceBtn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFormErrors = {
      cartValue: cartValue.trim() === '',
      distance: distance.trim() === '',
      itemsAmount: itemsAmount.trim() === '',
    };
    setFormErrors(newFormErrors);

    if (!Object.values(newFormErrors).some((error) => error)) {
      setDeliveryCostBreakdown(
        deliveryPriceCalculator(
          euroStringToCent(cartValue),
          Number(distance),
          Number(itemsAmount),
          dateTime,
        ),
      );
    }
  };

  return (
    <div className="app">
      <form className="form-container" onSubmit={handleOnClickDeliveryPriceBtn}>
        <fieldset className="form-fieldset">
          <legend>
            <h4>
              Delivery fee calculator
              <Tooltip
                icon="&#9432;"
                description="Please Fill out the form with the desired numbers, choose a date and time, then press the button to calculate"
              />
            </h4>
          </legend>

          <InputField
            inputLabel="Cart value(€):"
            inputName="card-value"
            inputId="card-value"
            dataTestId="card-value"
            inputPlaceholder="e.g. 12"
            inputValue={cartValue}
            onChangeInput={(event) => setCartValue(event.target.value)}
            hasError={formErrors.cartValue}
          />
          <InputField
            inputLabel="Delivery distance in meters:"
            inputName="delivery-distance"
            inputId="delivery-distance"
            inputPlaceholder="e.g. 1225"
            dataTestId="delivery-distance"
            inputValue={distance}
            onChangeInput={(event) => setDistance(event.target.value)}
            hasError={formErrors.distance}
          />
          <InputField
            inputLabel="Amount of items:"
            inputName="number-of-items"
            inputId="number-of-items"
            dataTestId="number-of-items"
            inputPlaceholder="e.g. 2"
            inputValue={itemsAmount}
            onChangeInput={(event) => setItemsAmount(event.target.value)}
            hasError={formErrors.itemsAmount}
          />

          <DateAndTimePicker
            timePickerLabel="Time:"
            onTimePickerChange={(date) => handleDateTimeChange(date)}
            selectedTime={dateTime}
            dataTestId="datetime-picker"
          />
          <Button
            buttonName="Calculate delivery price"
            dataTestId="calculate-button"
          />
        </fieldset>
      </form>
      <CalculationCard costBreakdown={deliveryCostBreakdown} />
    </div>
  );
};

export default App;
