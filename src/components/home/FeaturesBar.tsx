import { Truck, Shield, CreditCard, Headphones } from 'lucide-react';

const iconMap = { Truck, Shield, CreditCard, Headphones };

const features = [
  { icon: 'Truck', title: 'უფასო მიწოდება', description: 'თბილისის მასშტაბით' },
  { icon: 'Shield', title: 'გარანტია', description: '2 წლიანი გარანტია' },
  { icon: 'CreditCard', title: 'განვადება', description: '0%-იანი განვადება' },
  { icon: 'Headphones', title: '24/7 მხარდაჭერა', description: 'პროფესიონალური კონსულტაცია' },
];

export function FeaturesBar() {
  return (
    <section className="bg-secondary py-8">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div key={feature.icon} className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
