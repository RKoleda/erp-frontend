import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { toast } from 'react-toastify'

const AddOrderModal = ({ isOpen, onClose, onSave, customers }) => {
  const [orderData, setOrderData] = useState({
    customerId: '',
    title: '',
    price: '',
    note: '',
    status: 'offen',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setOrderData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!orderData.customerId || !orderData.title || !orderData.price) {
      toast.error('Bitte alle Pflichtfelder ausfüllen!')
      return
    }

    onSave(orderData)
    toast.success("Auftrag erfolgreich gespeichert ✅", {
      position: "bottom-right",
    })
    onClose()
    setOrderData({
      customerId: '',
      title: '',
      price: '',
      note: '',
      status: 'offen',
    })
  }

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
              <Dialog.Title className="text-lg font-medium">
                Neuen Auftrag hinzufügen
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                {/* Kunden Dropdown */}
                <select
                  name="customerId"
                  value={orderData.customerId}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  required
                >
                  <option value="">Kunde auswählen</option>
                  {customers.map((kunde) => (
                    <option key={kunde.id} value={kunde.id}>
                      {kunde.name}
                    </option>
                  ))}
                </select>

                {/* Titel des Auftrags */}
                <input
                  name="title"
                  placeholder="Titel des Auftrags"
                  value={orderData.title}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  required
                />

                {/* Preis */}
                <input
                  name="price"
                  type="number"
                  placeholder="Preis in €"
                  value={orderData.price}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  required
                />

                {/* Notizenfeld */}
                <textarea
                  name="note"
                  placeholder="Notizen zum Auftrag (optional)"
                  value={orderData.note}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  rows={3}
                />

                {/* Status */}
                <select
                  name="status"
                  value={orderData.status}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                >
                  <option value="offen">Offen</option>
                  <option value="in Bearbeitung">In Bearbeitung</option>
                  <option value="abgeschlossen">Abgeschlossen</option>
                </select>

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
  )
}

export default AddOrderModal
