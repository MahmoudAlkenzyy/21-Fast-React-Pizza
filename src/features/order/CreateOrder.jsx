// https://uibakery.io/regex-library/phone-number
import { useState } from 'react';
import { redirect, useActionData , Form , useNavigate, useFetcher} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector , useDispatch } from 'react-redux';
import { clearCart, getCart, getTotalPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';


const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );


function CreateOrder() {
  
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigate();
  const formErrors = useActionData();
  const dispatch = useDispatch()
  
  const {address,position,status:AddresStatus,userName, errors:addresErrors}= useSelector(state=> state.user)
  const totalCartPrice = useSelector(getTotalPrice)
  const cart = useSelector(getCart);
  
  const isSubmitting = navigation.state === 'submitting';
  const isAddressLoading = AddresStatus === 'loader';

  const priority = withPriority ? totalCartPrice * .2 : 0
  const totalPrice = totalCartPrice+ priority

 
 


  if(!cart.length)return <EmptyCart/>
  return (
    <div className='px-4 py-6'>
      <h2 className='text-xl font-semibold pb-8'>Ready to order? Let's go!</h2>


      <Form method="post">


        <div className='flex flex-col sm:flex-row py-2 '>
          <label className='sm:basis-40'  >First Name</label>
          <input className="input grow" defaultValue={userName} type="text" name="customer" required />
        </div>

        <div className='flex flex-col sm:flex-row py-2 '>
          <label className='sm:basis-40  '>Phone number</label>
          <div className='grow '>
            <input className="input w-full " type="tel" name="phone" required />
        {formErrors?.phone && <p className='mt-2 text-red-700 bg-red-100 p-2 rounded-md text-sm'>{formErrors.phone}</p>}
          </div>
        </div>

        <div className='flex flex-col sm:flex-row py-2 grow '>
          <label className='sm:basis-40 '>Address </label>
    
          <div className='grow relative'>
            <input disabled={isAddressLoading} defaultValue={address} className="input w-full" type="text" name="address" required />

            <span className='absolute right-[3px] top-[3px]'>
              <Button disabled={isAddressLoading} type="small" onClick={(e) => {
                e.preventDefault()
                dispatch(fetchAddress());
              }}>get location</Button>
            </span>
          {addresErrors && <p className='mt-2  text-red-700 bg-red-100 p-2 rounded-md text-sm'>{addresErrors}</p>}
          </div>
        </div>

        <div className='flex items-center  gap-4 my-3'>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 "
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className='font-medium' htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Picking the order' : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input type="hidden" name="position" value={position.latitude&&position.longitude?`${position.latitude,position.longitude}`:""} />
       
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',

  };
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'please enter a valid phone number';
  }

  console.log(errors, Object.keys(errors).length > 0);
  if (Object.keys(errors).length > 0) {
    return errors;
  }
store.dispatch(clearCart())
  const newOrder = await createOrder(order);
  console.log(newOrder);
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
