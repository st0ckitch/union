import AdminLayout from '@/components/admin/AdminLayout';
import { FlatOptionList } from '@/components/admin/FlatOptionList';

export default function AdminDoorKorobka() {
  return (
    <AdminLayout>
      <FlatOptionList
        table="door_korobka_options"
        queryKey="admin-door-korobka"
        singularNoun="Frame"
        pluralNoun="Frames (Korobka)"
        codePlaceholder="invisible"
      />
    </AdminLayout>
  );
}
