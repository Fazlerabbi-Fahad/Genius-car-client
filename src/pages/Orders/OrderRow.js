import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleDelete, handleStatus }) => {
    const { _id, service, serviceName, price, phone, customer, status } = order;
    const [orderService, setorderService] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/services/${service}`)
            .then(res => res.json())
            .then(data => setorderService(data))
    }, [service])
    return (
        <tbody>
            <tr>
                <th>
                    <label>
                        <button onClick={() => handleDelete(_id)} className='btn btn-ghost'>X</button>
                    </label>
                </th>
                <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="rounded w-12 h-12">
                                {
                                    orderService?.img &&
                                    <img src={orderService.img} alt="Avatar Tailwind CSS Component" />

                                }
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{customer}</div>
                            <div className="text-sm opacity-50">Phone: {phone}</div>
                        </div>
                    </div>
                </td>
                <td>
                    {serviceName}
                    <br />

                </td>
                <td><span className="badge badge-sm">${price}</span></td>
                <th>

                    <button onClick={() => handleStatus(_id)} className="btn btn-ghost btn-xs">{status ? status : 'pending'}</button>

                </th>
            </tr>
        </tbody >
    );
};

export default OrderRow;