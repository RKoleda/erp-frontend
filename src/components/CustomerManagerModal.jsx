import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const CustomerManagerModal = ({ isOpen, onClose, customers, onEdit, onDelete }) => {
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
            <Dialog.Panel className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
              <Dialog.Title className="text-xl font-bold text-center mb-4">
                Alle Kunden
              </Dialog.Title>

              {customers.length === 0 ? (
                <p className="text-center text-gray-500">Keine Kunden gefunden.</p>
              ) : (
                <ul className="space-y-2 max-h-[500px] overflow-y-auto">
                  {customers.map((c) => (
                    <li
                      key={c.id}
                      className="p-3 border rounded flex justify-between items-center text-sm"
                    >
                      <div>
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-gray-600">{c.email}</p>
                        <p className="text-gray-600">{c.phone || '-'}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEdit(c)}
                          className="text-blue-600 hover:underline"
                        >
                          Bearbeiten
                        </button>
                        <button
                          onClick={() => onDelete(c.id)}
                          className="text-red-600 hover:underline"
                        >
                          Löschen
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex justify-end mt-4">
                <button
                  onClick={onClose}
                  className="rounded bg-gray-300 px-4 py-2 text-sm"
                >
                  Schließen
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomerManagerModal;
