import { useState } from 'react';

const InventoryList = ({ items, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-2 max-w-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Lagerbestand</h2>
        <button
          onClick={onEdit.addNew}
          className="bg-yellow-500 text-white text-sm px-3 py-1.5 rounded hover:bg-yellow-600"
        >
          ➕ Neuen Lagerartikel hinzufügen
        </button>
      </div>

      <input
        type="text"
        placeholder="Suchen..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded p-1 w-full text-sm"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">Keine Artikel gefunden.</p>
      ) : (
        <ul className="space-y-1">
          {filtered.map(item => (
            <li key={item.id} className="p-2 border rounded text-sm flex justify-between items-center">
              <div>
                <strong>{item.name}</strong> – {item.quantity} Stück
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit.edit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Bearbeiten
                </button>
                <button
                  onClick={() => onEdit.delete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Löschen
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InventoryList;
