import { useState } from 'react';

const OrderList = ({ orders, customers, onDelete, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getCustomerName = (id) => {
    const customer = customers.find(c => c.id === id);
    return customer ? customer.name : 'Unbekannter Kunde';
  };

  const filteredOrders = orders.filter(order =>
    (order?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order?.status || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order?.price?.toString() || '').includes(searchTerm)
  );

  return (
    <div className="space-y-2 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold">Aufträge</h2>

      <input
        type="text"
        placeholder="Suche Titel, Kunde, Status..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded p-1 w-full text-sm"
      />

      {filteredOrders.length === 0 ? (
        <p className="text-gray-500 text-sm">Keine Aufträge gefunden.</p>
      ) : (
        <ul className="space-y-1">
          {filteredOrders.map(order => (
            <li key={order.id} className="border p-2 rounded text-sm flex justify-between items-center">
              <div>
                <p><strong>{order.title}</strong> ({getCustomerName(order.customerId)})</p>
                <p>{order.price} € – {order.status}</p>
                {order.note && <p className="text-xs text-gray-500">Notiz: {order.note}</p>}
              </div>
              <div className="flex space-x-2">
                <button onClick={() => onUpdate(order)} className="text-blue-600 hover:underline">Bearbeiten</button>
                <button onClick={() => onDelete(order.id)} className="text-red-600 hover:underline">Löschen</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
