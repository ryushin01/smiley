import Button from '../Button/Button';
import './Input.scss';

const Input = ({
  type = 'text',
  name,
  placeholder,
  isValidation,
  required,
  isButton,
  buttonFunction,
  forwardRef,
}) => {
  return (
    <div className="input-wrap">
      <label className="input-label">
        <input
          className="input"
          type={type}
          name={name}
          placeholder={placeholder}
          data-validation={isValidation}
          ref={forwardRef}
          required={required}
        />
        {status === 'error' && <p>error</p>}
      </label>
      {isButton && (
        <Button
          type="button"
          shape="outline"
          content="중복 확인"
          onClick={buttonFunction}
        />
      )}
    </div>
  );
};

export default Input;
