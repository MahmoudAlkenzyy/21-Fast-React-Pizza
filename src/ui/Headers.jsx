import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from './../features/user/Username';
function Headers() {
  return (
    <header className="flex items-center justify-between bg-yellow-400 px-4 py-2 font-semibold sm:px-6">
      <Link to="/" className="uppercase tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Headers;
