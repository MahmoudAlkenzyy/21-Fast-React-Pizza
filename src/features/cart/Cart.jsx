import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const userName = useSelector(state=>state.user.userName)
  const cart = fakeCart;

  return (
    <div>
      <LinkButton
        className="text-sm text-blue-500 hover:text-blue-600"
        to="/menu"
      >
        &larr; Back to menu
      </LinkButton>

      <h2>Your cart, {userName}</h2>

      <div>
        <Button to="/order/new">Order pizzas</Button>
        <button>Clear cart</button>
      </div>
    </div>
  );
}

export default Cart;
