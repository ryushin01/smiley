import './Chip.scss';

const Chip = ({ name, value, content }) => {
  return (
    <label className="chip">
      <input type="checkbox" name={name} value={value} />
      <span>{content}</span>
    </label>
  );
};

export default Chip;
