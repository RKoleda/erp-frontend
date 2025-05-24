import React, { useState } from 'react';

const AddProductForm = ({ setProducts }) => {
  const [form, setForm] = useState({
    name: '',
    sku: '',
    description: '',
    stock: '',
    unit: 'Stück',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      setProducts((prev) => [...prev, data.product]);
      setForm({ name: '', sku: '', description: '', stock: '', unit: 'Stück' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Neues Produkt hinzufügen</h2>

      {success && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
          Produkt erfolgreich hinzugefügt!
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-2">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">SKU</label>
          <input name="sku" value={form.sku} onChange={handleChange} className="w-full border rounded p-2" required />
        </div>
        <div className="col-span-2">
          <label className="block mb-1 font-medium">Beschreibung</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Bestand</label>
          <input type="number" name="stock" value={form.stock} onChange={handleChange} className="w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Einheit</label>
          <select name="unit" value={form.unit} onChange={handleChange} className="w-full border rounded p-2">
            <option value="Stück">Stück</option>
            <option value="Pack">Pack</option>
            <option value="kg">kg</option>
            <option value="Liter">Liter</option>
            <option value="Meter">Meter</option>
          </select>
        </div>
        <div className="col-span-2">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Speichern
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
