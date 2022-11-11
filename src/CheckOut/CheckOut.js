import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Context/Auth/AuthProvider';

const CheckOut = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const phone = form.phone.value;
        const email = user?.email || 'unregistered';
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(order),

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    alert('Order placed successfully');
                    form.reset();
                }
            })
            .catch(err => console.log(err))


    }

    return (
        <form onSubmit={handlePlaceOrder} className='text-center'>
            <h2 className='text-4xl font-bold my-4'>Service Name: {title}</h2>
            <p className='text-3xl text-orange-600 mb-4'>Price: ${price}</p>
            <div className='grid gap-4 grid-cols-1 lg:grid-cols-2 mb-4'>
                <input type="text" name='firstName' placeholder="First Name" className="input input-bordered  " />
                <input type="text" name='lastName' placeholder="Last Name" className="input input-bordered " />
                <input type="text" name='phone' placeholder="Phone" className="input input-bordered " />
                <input type="email" name='email' placeholder="Email" defaultValue={user?.email} className="input input-bordered " readOnly />

            </div>
            <textarea name='message' className="textarea textarea-bordered w-full mb-4" placeholder="Your Message"></textarea>
            <input type="submit" className='btn btn-warning mb-4' value="Check Out" />

        </form>
    );
};

export default CheckOut;