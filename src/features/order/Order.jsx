// Test ID: IIDSAT

import { getOrder } from '../../services/apiRestaurant';

import { useFetcher, useLoaderData } from 'react-router-dom';

import OrderItem from './OrderItem';
import { calcMinutesLeft,formatCurrency,formatDate,} from '../../utils/helpers';
import { useEffect } from 'react';

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
    // console.log(order);
    // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart, } = order;

    const deliveryIn = calcMinutesLeft(estimatedDelivery);

  useEffect(() => {
  if(!fetcher.data&& fetcher.state==='idle')  fetcher.load('/menu')
  },[fetcher])
  
  
    return (
        <div className='space-y-6 px-4 py-6'>
            <div className='flex flex-wrap space-y-3 items-center justify-between'>
                <h2 className=' font-bold'>Order ${id} Status</h2>

                <div className='sm:space-x-2  items-center flex-col sm:flex-row'>
                    {priority && <span className='bg-red-500  uppercase tracking-wider  text-red-50 rounded-full px-3 py-1 text-sm '>Priority</span>}
                    <span className='bg-green-500  uppercase tracking-wider  text-green-50 rounded-full px-3 py-1 text-sm'>{status} or</span>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} ingredients={fetcher?.data?.find(el=>el.id===item.pizzaId).ingredients??[]}  isLoadingIngredients={fetcher.state==='loading'} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
