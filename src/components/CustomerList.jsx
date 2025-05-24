import React, { useEffect, useState } from 'react';

const CustomerList = ({ onSelect }) => {
  const [kunden, setKunden] = useState([]);

  useEffect(() => {
    const fetchKunden = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/customers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setKunden(data);
    };

    fetchKunden();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Kundenliste</h2>
      <table className="w-full border text-sm bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Name (ID)</th>
            <th className="p-2 text-left">E-Mail</th>
            <th className="p-2 text-left">Telefon</th>
            <th className="p-2 text-left">Aktion</th>
          </tr>
        </thead>
        <tbody>
          {kunden.map((kunde) => (
            <tr key={kunde.id} className="border-t hover:bg-gray-50">
              <td className="p-2">
                {kunde.name}
                <span className="text-gray-400 text-xs ml-2">({kunde.id})</span>
              </td>
              <td className="p-2">{kunde.email}</td>
              <td className="p-2">{kunde.phone || '-'}</td>
              <td className="p-2">
                <button
                  onClick={() => onSelect(kunde)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Anzeigen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
