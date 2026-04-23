import AdminLayout from '@/components/admin/AdminLayout';
import { FlatOptionList } from '@/components/admin/FlatOptionList';

export default function AdminDoorModels() {
  return (
    <AdminLayout>
      <FlatOptionList
        table="door_model_options"
        queryKey="admin-door-models"
        singularNoun="Model"
        pluralNoun="Models (Modeli)"
        codePlaceholder="vento"
      />
    </AdminLayout>
  );
}
