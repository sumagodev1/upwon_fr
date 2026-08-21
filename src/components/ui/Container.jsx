export default function Container({ children, className = '' }) {
  return (
    <div className={`container-max container-px ${className}`}>{children}</div>
  );
}
