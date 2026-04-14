import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Package, FolderTree, ShoppingCart, MessageSquare, FileText, Image, Store, Star } from 'lucide-react';

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [products, categories, orders, consultations, posts, banners, showrooms, testimonials] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('categories').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }),
        supabase.from('consultations').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('banners').select('id', { count: 'exact', head: true }),
        supabase.from('showrooms').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      ]);

      return {
        products: products.count || 0,
        categories: categories.count || 0,
        orders: orders.count || 0,
        consultations: consultations.count || 0,
        posts: posts.count || 0,
        banners: banners.count || 0,
        showrooms: showrooms.count || 0,
        testimonials: testimonials.count || 0,
      };
    }
  });

  const { data: recentOrders } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: async () => {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      return data || [];
    }
  });

  const { data: recentConsultations } = useQuery({
    queryKey: ['recent-consultations'],
    queryFn: async () => {
      const { data } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      return data || [];
    }
  });

  const statCards = [
    { title: 'Products', value: stats?.products || 0, icon: Package, color: 'text-blue-600 bg-blue-100' },
    { title: 'Categories', value: stats?.categories || 0, icon: FolderTree, color: 'text-green-600 bg-green-100' },
    { title: 'Orders', value: stats?.orders || 0, icon: ShoppingCart, color: 'text-purple-600 bg-purple-100' },
    { title: 'Consultations', value: stats?.consultations || 0, icon: MessageSquare, color: 'text-orange-600 bg-orange-100' },
    { title: 'Blog Posts', value: stats?.posts || 0, icon: FileText, color: 'text-pink-600 bg-pink-100' },
    { title: 'Banners', value: stats?.banners || 0, icon: Image, color: 'text-cyan-600 bg-cyan-100' },
    { title: 'Showrooms', value: stats?.showrooms || 0, icon: Store, color: 'text-amber-600 bg-amber-100' },
    { title: 'Testimonials', value: stats?.testimonials || 0, icon: Star, color: 'text-yellow-600 bg-yellow-100' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome to UNION Admin Panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders?.length === 0 ? (
                <p className="text-gray-500 text-sm">No orders yet</p>
              ) : (
                <div className="space-y-3">
                  {recentOrders?.map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-sm text-gray-500">{order.customer_email}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₾{order.total_amount}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              {recentConsultations?.length === 0 ? (
                <p className="text-gray-500 text-sm">No consultations yet</p>
              ) : (
                <div className="space-y-3">
                  {recentConsultations?.map((consultation) => (
                    <div key={consultation.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{consultation.name}</p>
                        <p className="text-sm text-gray-500">{consultation.phone}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        consultation.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        consultation.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                        consultation.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {consultation.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
