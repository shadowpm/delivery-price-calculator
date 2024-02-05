import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles.css';

interface Props {
  timePickerLabel: string;
  onTimePickerChange: (date: Date) => void;
  selectedTime: Date;
  dataTestId: string;
}

const DateAndTimePicker: React.FC<Props> = ({
  timePickerLabel,
  onTimePickerChange,
  selectedTime,
  dataTestId,
}) => {
  return (
    <>
      <label htmlFor="date-time">{timePickerLabel}</label>
      <div data-testid={dataTestId}>
        <DatePicker
          selected={selectedTime}
          id="date-time"
          name="date-time"
          onChange={onTimePickerChange}
          className="date-time-picker"
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
    </>
  );
};

export default DateAndTimePicker;
