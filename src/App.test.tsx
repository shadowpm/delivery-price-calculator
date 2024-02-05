import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

describe('App component', () => {
  test('Should calculate delivery price, with no small order fee and not a Friday', () => {
    render(<App />);

    const cartValueInput = screen.getByTestId('card-value');
    const distanceInput = screen.getByTestId('delivery-distance');
    const amountInput = screen.getByTestId('number-of-items');
    const datetime = screen.getByTestId('datetime-picker');

    const calculateButton = screen.getByTestId('calculate-button');

    act(() => {
      userEvent.type(cartValueInput, '12');
      userEvent.type(distanceInput, '1500');
      userEvent.type(amountInput, '4');
      userEvent.type(datetime, '2024-01-21T16:00:00');

      userEvent.click(calculateButton);
    });
    const smallOrderFee = screen.getByTestId('small-order-fee');
    const distanceFee = screen.getByTestId('distance-fee');
    const extraIItemsFee = screen.getByTestId('extra-items-fee');
    const deliveryPrice = screen.getByTestId('delivery-price');

    expect(smallOrderFee).toHaveTextContent('0.00 €');
    expect(distanceFee).toHaveTextContent('3.00 €');
    expect(extraIItemsFee).toHaveTextContent('0.00 €');
    expect(deliveryPrice).toHaveTextContent('3.00 €');
  });

  test('Should calculate delivery price, with small order fee', () => {
    render(<App />);

    const cartValueInput = screen.getByTestId('card-value');
    const distanceInput = screen.getByTestId('delivery-distance');
    const amountInput = screen.getByTestId('number-of-items');

    const calculateButton = screen.getByTestId('calculate-button');

    act(() => {
      userEvent.type(cartValueInput, '8');
      userEvent.type(distanceInput, '1499');
      userEvent.type(amountInput, '5');

      userEvent.click(calculateButton);
    });
    const smallOrderFee = screen.getByTestId('small-order-fee');
    const distanceFee = screen.getByTestId('distance-fee');
    const extraIItemsFee = screen.getByTestId('extra-items-fee');
    const deliveryPrice = screen.getByTestId('delivery-price');

    expect(smallOrderFee).toHaveTextContent('2.00 €');
    expect(distanceFee).toHaveTextContent('3.00 €');
    expect(extraIItemsFee).toHaveTextContent('0.50 €');
    expect(deliveryPrice).toHaveTextContent('5.50 €');
  });
});
