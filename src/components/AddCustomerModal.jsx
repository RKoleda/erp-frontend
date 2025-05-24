import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';

const AddCustomerModal = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error('Bitte Name und E-Mail angeben!');
      return;
    }
    onSave(form);
    setForm({ name: '', email: '', phone: '' });
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <Dialog.Title className="text-lg font-medium">Neuen Kunden hinzufügen</Dialog.Title>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <input
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
                <input
                  name="email"
                  placeholder="E-Mail"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
                <input
                  name="phone"
                  placeholder="Telefon (optional)"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded bg-gray-300 px-4 py-2 text-sm"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-sm text-white"
                  >
                    Speichern
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddCustomerModal;
