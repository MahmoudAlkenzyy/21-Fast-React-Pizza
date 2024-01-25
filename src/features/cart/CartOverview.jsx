import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTotalPrice, getTotalQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
   const cartItemsQuantity = useSelector(getTotalQuantity)
   const cartItemsPrice = useSelector(getTotalPrice)
if(!cartItemsQuantity)return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-3 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold sm:space-x-6">
        <span>{cartItemsQuantity} pizzas</span>
        <span>{formatCurrency(cartItemsPrice)}</span>
      </p>
      <Link to="cart">Open Cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
