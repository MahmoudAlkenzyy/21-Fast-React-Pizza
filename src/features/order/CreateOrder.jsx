// https://uibakery.io/regex-library/phone-number
import { useState } from 'react';
import { Form } from 'react-router-dom';

import { redirect, useActionData } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { useNavigate } from 'react-router-dom';

const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
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
        <div>
            <h2>Ready to order? Let's go!</h2>

            <Form method="post">
                <div>
                    <label>First Name</label>
                    <input type="text" name="customer" required />
                </div>

                <div>
                    <label>Phone number</label>
                    <div>
                        <input type="tel" name="phone" required />
                    </div>
                </div>
                <p>{formErrors?.phone && formErrors.phone}</p>

                <div>
                    <label>Address</label>
                    <div>
                        <input type="text" name="address" required />
                    </div>
                </div>

                <div>
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                        // value={withPriority}
                        // onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? 'Picking the order' : 'Order now'}
                    </button>
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
