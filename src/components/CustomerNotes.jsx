import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CustomerNotes = ({ customerId }) => {
  const [notes, setNotes] = useState([]);
  const [newText, setNewText] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editText, setEditText] = useState('');

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/notes/${customerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setNotes(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  useEffect(() => {
    if (customerId) {
      console.log('📡 Lade Notizen für:', customerId);
      fetchNotes();
    }
  }, [customerId]);

  const addNote = async () => {
    if (!newText.trim()) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/notes/${customerId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: newText }),
    });

    if (res.ok) {
      setNewText('');
      fetchNotes();
      toast.success('Notiz hinzugefügt');
    }
  };

  const deleteNote = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
      toast.success('Notiz gelöscht');
    }
  };

  const updateNote = async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: editText }),
    });
    if (res.ok) {
      setEditingNoteId(null);
      setEditText('');
      fetchNotes();
      toast.success('Notiz aktualisiert');
    }
  };

  return (
    <div className="mt-6 bg-white shadow rounded p-4">
      <p className="text-xs text-gray-500 mb-2">Aktueller Kunde: {customerId}</p>
      <h3 className="text-lg font-semibold mb-4">Kundennotizen</h3>

      <div className="flex gap-2 mb-4">
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Neue Notiz schreiben..."
          className="flex-grow border p-2 rounded"
        />
        <button onClick={addNote} className="bg-blue-600 text-white px-4 py-2 rounded">
          Speichern
        </button>
      </div>

      <ul className="space-y-3">
        {notes.map((note) => (
          <li key={note.id} className="border p-3 rounded bg-gray-50 relative">
            <div className="text-xs text-gray-500 mb-1">
              {new Date(note.createdAt).toLocaleString()}
            </div>

            {editingNoteId === note.id ? (
              <div className="space-y-2">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full border p-2 rounded text-sm"
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => updateNote(note.id)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    Speichern
                  </button>
                  <button onClick={() => setEditingNoteId(null)} className="text-gray-600 text-sm">
                    Abbrechen
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <p className="text-sm">{note.text}</p>
                <div className="flex gap-2 text-sm">
                  <button
                    onClick={() => {
                      setEditingNoteId(note.id);
                      setEditText(note.text);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-600 hover:underline"
                  >
                    Löschen
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerNotes;
