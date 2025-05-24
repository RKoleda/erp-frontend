import { useEffect, useState } from 'react';
import CustomerList from '../components/CustomerList';
import OrderList from '../components/OrderList';
import InventoryList from '../components/InventoryList';
import AddOrderModal from '../components/AddOrderModal';
import EditOrderModal from '../components/EditOrderModal';
import AddCustomerModal from '../components/AddCustomerModal';
import AddInventoryModal from '../components/AddInventoryModal';
import EditCustomerModal from '../components/EditCustomerModal';
import EditInventoryModal from '../components/EditInventoryModal';
import CustomerManagerModal from '../components/CustomerManagerModal';
import CustomerNotesModal from '../components/CustomerNotesModal';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showCustomerManager, setShowCustomerManager] = useState(false);
  const [editOrderModalOpen, setEditOrderModalOpen] = useState(false);
  const [editCustomerModalOpen, setEditCustomerModalOpen] = useState(false);
  const [editInventoryModalOpen, setEditInventoryModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const resDashboard = await fetch('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dashboardData = await resDashboard.json();
        setData(dashboardData);

        const resOrders = await fetch('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(await resOrders.json());

        const resCustomers = await fetch('http://localhost:5000/api/customers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(await resCustomers.json());

        const resProducts = await fetch('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(await resProducts.json());
      } catch (err) {
        console.error('Fehler beim Laden des Dashboards:', err);
        toast.error('❌ Fehler beim Laden der Daten!');
      }
    };

    fetchData();
  }, []);

  if (!data) return <p className="text-center mt-10">Lade Dashboard...</p>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">Willkommen, {data.email} 👋</h1>

      <div className="grid grid-cols-3 gap-8">
        {/* Aufträge */}
        <div className="space-y-4 max-w-md">
          <div className="bg-green-100 p-4 rounded shadow text-green-800 font-semibold text-center">
            📦 Aufträge: {data.auftraege}
          </div>

          <OrderList
            orders={orders}
            customers={customers}
            onDelete={async (id) => {
              try {
                const token = localStorage.getItem('token');
                const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
                  method: 'DELETE',
                  headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error();
                setOrders(orders.filter((o) => o.id !== id));
                toast.success('✅ Auftrag gelöscht');
              } catch {
                toast.error('❌ Auftrag konnte nicht gelöscht werden');
              }
            }}
            onUpdate={(order) => {
              setSelectedOrder(order);
              setEditOrderModalOpen(true);
            }}
          />

          <button
            onClick={() => setShowOrderModal(true)}
            className="bg-green-600 text-white text-sm px-3 py-1.5 rounded hover:bg-green-700 w-full"
          >
            ➕ Neuen Auftrag hinzufügen
          </button>
        </div>

        {/* Kunden */}
        <div className="space-y-4 max-w-md">
          <div className="bg-blue-100 p-4 rounded shadow text-blue-800 font-semibold text-center">
            📇 Kunden: {data.kunden}
          </div>

          <button
            onClick={() => setShowCustomerManager(true)}
            className="bg-purple-600 text-white text-sm px-3 py-1.5 rounded hover:bg-purple-700 w-full"
          >
            📋 Alle Kunden anzeigen
          </button>

          <CustomerList
            customers={customers}
            onSelect={(kunde) => {
              setSelectedCustomer(kunde);
              setShowNotesModal(true);
            }}
            onEdit={{
              addNew: () => setShowCustomerModal(true),
              edit: (kunde) => {
                setSelectedCustomer(kunde);
                setEditCustomerModalOpen(true);
              },
              delete: async (id) => {
                try {
                  const token = localStorage.getItem('token');
                  const res = await fetch(`http://localhost:5000/api/customers/${id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  if (!res.ok) throw new Error();
                  setCustomers(customers.filter((c) => c.id !== id));
                  toast.success('✅ Kunde gelöscht');
                } catch {
                  toast.error('❌ Kunde konnte nicht gelöscht werden');
                }
              },
            }}
          />

          <button
            onClick={() => setShowCustomerModal(true)}
            className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700 w-full"
          >
            ➕ Neuen Kunden hinzufügen
          </button>
        </div>

        {/* Lagerbestand */}
        <div className="space-y-4 max-w-md">
          <div className="bg-yellow-100 p-4 rounded shadow text-yellow-800 font-semibold text-center">
            🏷️ Lagerbestand
          </div>

          <InventoryList
            items={products}
            onEdit={{
              addNew: () => setShowInventoryModal(true),
              edit: (item) => {
                setSelectedInventory(item);
                setEditInventoryModalOpen(true);
              },
              delete: async (id) => {
                try {
                  const token = localStorage.getItem('token');
                  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  if (!res.ok) throw new Error();
                  setProducts(products.filter((p) => p.id !== id));
                  toast.success('✅ Lagerartikel gelöscht');
                } catch {
                  toast.error('❌ Lagerartikel konnte nicht gelöscht werden');
                }
              },
            }}
          />

          <button
            onClick={() => setShowInventoryModal(true)}
            className="bg-yellow-500 text-white text-sm px-3 py-1.5 rounded hover:bg-yellow-600 w-full"
          >
            ➕ Neuer Lagerartikel
          </button>
        </div>
      </div>

      {/* Modals */}
      <AddOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        onSave={async (newOrder) => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(newOrder),
            });
            if (!res.ok) throw new Error();
            const created = await res.json();
            setOrders([...orders, created]);
            toast.success('✅ Auftrag gespeichert');
          } catch {
            toast.error('❌ Auftrag konnte nicht gespeichert werden');
          }
        }}
        customers={customers}
      />

      <EditOrderModal
        isOpen={editOrderModalOpen}
        onClose={() => setEditOrderModalOpen(false)}
        customers={customers}
        initialOrder={selectedOrder}
        onSave={async (updatedOrder) => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/orders/${updatedOrder.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(updatedOrder),
            });
            if (!res.ok) throw new Error();
            const updated = await res.json();
            setOrders(orders.map((o) => (o.id === updated.id ? updated : o)));
            toast.success('✅ Auftrag aktualisiert');
          } catch {
            toast.error('❌ Auftrag konnte nicht aktualisiert werden');
          }
        }}
      />

      <AddCustomerModal
        isOpen={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        onSave={async (newCustomer) => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/customers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(newCustomer),
            });
            if (!res.ok) throw new Error();
            const created = await res.json();
            setCustomers([...customers, created]);
            toast.success('✅ Kunde hinzugefügt');
          } catch {
            toast.error('❌ Kunde konnte nicht gespeichert werden');
          }
        }}
      />

      <EditCustomerModal
        isOpen={editCustomerModalOpen}
        onClose={() => setEditCustomerModalOpen(false)}
        customer={selectedCustomer}
        onSave={async (updatedCustomer) => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/customers/${updatedCustomer.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(updatedCustomer),
            });
            if (!res.ok) throw new Error();
            const updated = await res.json();
            setCustomers(customers.map((c) => (c.id === updated.id ? updated : c)));
            toast.success('✅ Kunde aktualisiert');
          } catch {
            toast.error('❌ Kunde konnte nicht aktualisiert werden');
          }
        }}
        onDelete={async (id) => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/customers/${id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error();
            setCustomers(customers.filter((c) => c.id !== id));
            toast.success('✅ Kunde gelöscht');
          } catch {
            toast.error('❌ Kunde konnte nicht gelöscht werden');
          }
        }}
      />

      <AddInventoryModal
        isOpen={showInventoryModal}
        onClose={() => setShowInventoryModal(false)}
        onSave={async (newItem) => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/products', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(newItem),
            });
            if (!res.ok) throw new Error();
            const created = await res.json();
            setProducts([...products, created]);
            toast.success('✅ Lagerartikel hinzugefügt');
          } catch {
            toast.error('❌ Lagerartikel konnte nicht gespeichert werden');
          }
        }}
      />

      <EditInventoryModal
        isOpen={editInventoryModalOpen}
        onClose={() => setEditInventoryModalOpen(false)}
        item={selectedInventory}
        onSave={async (updatedItem) => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/products/${updatedItem.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(updatedItem),
            });
            if (!res.ok) throw new Error();
            const updated = await res.json();
            setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
            toast.success('✅ Lagerartikel aktualisiert');
          } catch {
            toast.error('❌ Lagerartikel konnte nicht aktualisiert werden');
          }
        }}
        onDelete={async (id) => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error();
            setProducts(products.filter((p) => p.id !== id));
            toast.success('✅ Lagerartikel gelöscht');
          } catch {
            toast.error('❌ Lagerartikel konnte nicht gelöscht werden');
          }
        }}
      />

      <CustomerManagerModal
        isOpen={showCustomerManager}
        onClose={() => setShowCustomerManager(false)}
        customers={customers}
        onEdit={(kunde) => {
          setSelectedCustomer(kunde);
          setEditCustomerModalOpen(true);
        }}
        onDelete={async (id) => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/customers/${id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error();
            setCustomers(customers.filter((c) => c.id !== id));
            toast.success('✅ Kunde gelöscht');
          } catch {
            toast.error('❌ Kunde konnte nicht gelöscht werden');
          }
        }}
      />

      <CustomerNotesModal
        isOpen={showNotesModal}
        onClose={() => setShowNotesModal(false)}
        customer={selectedCustomer}
      />
    </div>
  );
}
