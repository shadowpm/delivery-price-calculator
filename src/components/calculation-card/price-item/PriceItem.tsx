import './styles.css';

interface Props {
  title: string;
  amount: number | string;
  addedStyle?: string;
  sign: string;
  dataTestId: string;
}

const PriceItem: React.FC<Props> = ({
  title,
  amount,
  addedStyle,
  sign,
  dataTestId,
}) => {
  return (
    <div className={'price-item ' + addedStyle}>
      <b>{title}</b>
      <span data-testid={dataTestId}>
        {amount} {sign}
      </span>
    </div>
  );
};

export default PriceItem;
