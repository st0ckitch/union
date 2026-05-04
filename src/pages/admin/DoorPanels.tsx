import AdminLayout from '@/components/admin/AdminLayout';
import { FlatOptionList } from '@/components/admin/FlatOptionList';

export default function AdminDoorPanels() {
  return (
    <AdminLayout>
      <FlatOptionList
        table="door_panel_options"
        queryKey="admin-door-panels"
        singularNoun="Panel"
        pluralNoun="Decorative panels"
        codePlaceholder="boss"
      />
    </AdminLayout>
  );
}
