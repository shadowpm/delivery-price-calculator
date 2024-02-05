import '../styles.css';

interface Props {
  buttonName: string;
  onClick?: () => void;
  dataTestId: string;
}

const Button: React.FC<Props> = ({ buttonName, onClick, dataTestId }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="calculate-button"
      data-testid={dataTestId}
    >
      {buttonName}
    </button>
  );
};

export default Button;
