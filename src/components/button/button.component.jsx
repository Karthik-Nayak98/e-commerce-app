import './button.styles.css';

export default function Button({ classname, title, children, ...otherProps }) {
  return (
    <button className={`button ${classname}`} {...otherProps}>
      {title} {children}
    </button>
  );
}
