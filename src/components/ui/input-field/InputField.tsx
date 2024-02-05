import '../styles.css';
import { ChangeEvent } from 'react';

interface Props {
  inputLabel: string;
  inputId: string;
  inputName: string;
  inputPlaceholder: string;
  inputValue: string;
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  dataTestId: string;
}

const InputField: React.FC<Props> = ({
  inputLabel,
  inputId,
  inputName,
  inputPlaceholder,
  inputValue,
  onChangeInput,
  hasError,
  dataTestId,
}) => {
  return (
    <>
      <label htmlFor={inputId}>{inputLabel}</label>
      <input
        type="number"
        id={inputId}
        name={inputName}
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={onChangeInput}
        className={hasError ? 'input-with-error' : ''}
        data-testid={dataTestId}
      />
      {hasError && <p className="error-text">Field cannot be empty!</p>}
    </>
  );
};

export default InputField;
