import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./customDatePicker.module.scss"; // use your CSS module

export default function CustomDatePicker({ selected, onChange, placeholder }) {
  const today = new Date();
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      placeholderText={placeholder}
      className={styles.input + ' outline-0 shadow-none'}
      calendarClassName={styles.calendar}
      dateFormat="dd-MM-yyyy"
      minDate={today}
      showPopperArrow={false}
      wrapperClassName="d-block w-100"
    />
  );
}
