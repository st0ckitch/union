import AdminLayout from '@/components/admin/AdminLayout';
import { FlatOptionList } from '@/components/admin/FlatOptionList';

export default function AdminDoorLocks() {
  return (
    <AdminLayout>
      <FlatOptionList
        table="door_lock_options"
        queryKey="admin-door-locks"
        singularNoun="Lock"
        pluralNoun="Locks"
        codePlaceholder="securemme"
      />
    </AdminLayout>
  );
}
