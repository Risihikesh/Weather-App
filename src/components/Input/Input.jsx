import './Input.css';
import Icon from '../Icon/Icon';
import glass from './magnifying-glass.svg';

export default function Input({ placeholder, setCityInput, func, value }) {
  return (
    <form className="InputWrapper" onSubmit={func}>
      <input
        value={value}
        className="input"
        placeholder={placeholder}
        onChange={(event) => setCityInput(event.target.value)}
      />
      <Icon icon={glass} onClick={func} />
    </form>
  );
}
