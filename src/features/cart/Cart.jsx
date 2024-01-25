import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import { useSelector,useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';


function Cart() {
  const userName = useSelector(state=>state.user.userName)
  const cart =  useSelector(getCart);
  const dispatch = useDispatch()
 

if(!cart.length) return <EmptyCart/>
  function clearHandler() { 
 
dispatch(clearCart())
  }

 

  return (
    <div className='px-3 sm:px-0'>
      <LinkButton
        className="text-sm text-blue-500 hover:text-blue-600"
        to="/menu"
      >
        &larr; Back to menu
      </LinkButton>

      <h2>Your cart, {userName}</h2>
<ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={clearHandler}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
