import './button.styles.css';

export default function Button({
  id,
  title,
  classname,
  handleClick,
  children,
}) {
  return (
    <button
      data-key={id}
      className={`button ${classname}`}
      onClick={handleClick}>
      {title} {children}
    </button>
  );
}
