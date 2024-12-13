import './Button.scss';

const Button = ({ type = 'button', shape, content, disabled, onClick }) => {
  return (
    <button
      className="btn"
      type={type}
      shape={shape}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
