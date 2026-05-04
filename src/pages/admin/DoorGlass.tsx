import AdminLayout from '@/components/admin/AdminLayout';
import { FlatOptionList } from '@/components/admin/FlatOptionList';

export default function AdminDoorGlass() {
  return (
    <AdminLayout>
      <FlatOptionList
        table="door_glass_options"
        queryKey="admin-door-glass"
        singularNoun="Glass"
        pluralNoun="Glass options"
        codePlaceholder="transparent"
      />
    </AdminLayout>
  );
}
