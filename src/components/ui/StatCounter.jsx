import useCountUp from '../../hooks/useCountUp.js';

export default function StatCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 2000,
}) {
  const { value: v, ref } = useCountUp(value, { duration, decimals });
  const display = decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toLocaleString('en-IN');
  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
