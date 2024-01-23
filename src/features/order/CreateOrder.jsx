// https://uibakery.io/regex-library/phone-number
import { useState } from 'react';
import { Form } from 'react-router-dom';

import { redirect, useActionData } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

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

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigate();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();

  return (
    <div className='px-4 py-6'>
      <h2 className='text-xl font-semibold pb-8'>Ready to order? Let's go!</h2>

      <Form method="post">
        <div className='flex flex-col sm:flex-row py-2 '>
          <label className='sm:basis-40'>First Name</label>
          <input className="input grow" type="text" name="customer" required />
        </div>

        <div className='flex flex-col sm:flex-row py-2 '>
          <label className='sm:basis-40 '>Phone number</label>
          <div className='grow'>
            <input className="input w-full " type="tel" name="phone" required />
        <p className='mt-2 text-red-700 bg-red-100 p-2 rounded-md text-sm'>{formErrors?.phone && formErrors.phone}</p>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row py-2 grow'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input className="input w-full" type="text" name="address" required />
          </div>
        </div>

        <div className='flex items-center  gap-4 my-3'>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 "
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className='font-medium' htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Picking the order' : 'Order now'}
          </Button>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
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
    priority: data.priority === 'on',
  };
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'please enter a valid phone number';
  }

  console.log(errors, Object.keys(errors).length > 0);
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);
  console.log(newOrder);
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
