import React, { useEffect, useState } from 'react';

const AddOrderForm = ({ setOrders }) => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    title: '',
    price: '',
    status: 'offen',
    customerId: ''
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/customers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // ✅ HIER
    console.log('📥 handleSubmit wurde aufgerufen');
  

    const res = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        createdAt: new Date().toISOString()
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Antwort vom Server:', data);
      console.log('setOrders wird aufgerufen mit:', data.order);
      setSuccess(true);
      setForm({ title: '', price: '', status: 'offen', customerId: '' });

      // Auftrag direkt zur Tabelle hinzufügen
      setOrders(prev => [...prev, data.order]);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Neuen Auftrag hinzufügen</h2>

      {success && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
          Auftrag erfolgreich hinzugefügt!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Titel</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Preis (€)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="offen">offen</option>
            <option value="in Bearbeitung">in Bearbeitung</option>
            <option value="abgeschlossen">abgeschlossen</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Kunde</label>
          <select
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">– Bitte auswählen –</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Auftrag speichern
        </button>
      </form>
    </div>
  );
};

export default AddOrderForm;
