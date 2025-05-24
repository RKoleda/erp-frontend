import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const EditCustomerModal = ({ isOpen, onClose, customer, onSave, onDelete }) => {
  const [form, setForm] = useState(customer || {});

  useEffect(() => {
    setForm(customer || {});
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  onSave(form);
  toast.success('✅ Kunde aktualisiert');
  onClose();
    };

  const handleDelete = () => {
  onDelete(form.id);
  toast.success('✅ Kunde gelöscht');
  onClose();
    };

  if (!form) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <Dialog.Title className="text-lg font-medium">Kunde bearbeiten</Dialog.Title>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <input
                  name="name"
                  placeholder="Name"
                  value={form.name || ''}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
                <input
                  name="email"
                  placeholder="E-Mail"
                  value={form.email || ''}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
                <input
                  name="phone"
                  placeholder="Telefon"
                  value={form.phone || ''}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
                <div className="flex justify-between">
                  <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-3 py-1.5 rounded text-sm">Löschen</button>
                  <button type="submit" className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm">Speichern</button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditCustomerModal;
