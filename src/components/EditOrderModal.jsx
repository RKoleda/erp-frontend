import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const EditOrderModal = ({ order, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    status: '',
  });

  useEffect(() => {
    if (order) {
      setForm({
        title: order.title,
        price: order.price,
        status: order.status,
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:5000/api/orders/${order.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const updated = await res.json();
      onUpdate(updated.order); // update in parent list
      toast.success('Auftrag aktualisiert!');
      onClose(); // close modal
    } else {
      toast.error('Aktualisierung fehlgeschlagen');
    }
  };

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Auftrag bearbeiten</h2>
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

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrderModal;
