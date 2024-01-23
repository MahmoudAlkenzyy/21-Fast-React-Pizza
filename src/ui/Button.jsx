import { Link } from 'react-router-dom';
const className =
  'inline-block rounded-full bg-yellow-400  px-4 py-3 sm:px-5 sm:py-4 font-semibold uppercase tracking-wide transition-colors hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';
function Button({ children, disabled, to }) {
  if (to)
    return (
      <Link to={to} className={className}>
        {' '}
        {children}
      </Link>
    );
  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
