import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface AdminAuthState {
  isLoading: boolean;
  isAdmin: boolean;
  user: any | null;
}

// ⚠️  PUBLIC ACCESS MODE — remove this flag and restore the auth
//    check below once a real admin user is configured in Supabase.
const PUBLIC_ADMIN = true;

export function useAdminAuth() {
  const [state, setState] = useState<AdminAuthState>({
    isLoading: PUBLIC_ADMIN ? false : true,
    isAdmin: PUBLIC_ADMIN ? true : false,
    user: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (PUBLIC_ADMIN) return; // skip all auth checks

    const checkAdminRole = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user) {
          setState({ isLoading: false, isAdmin: false, user: null });
          navigate('/admin/login');
          return;
        }

        // Check if user has admin role using the has_role function
        const { data: hasRole, error } = await supabase.rpc('has_role', {
          _user_id: session.user.id,
          _role: 'admin'
        });

        if (error) {
          console.error('Error checking admin role:', error);
          setState({ isLoading: false, isAdmin: false, user: session.user });
          navigate('/admin/login');
          return;
        }

        if (!hasRole) {
          setState({ isLoading: false, isAdmin: false, user: session.user });
          navigate('/admin/login');
          return;
        }

        setState({ isLoading: false, isAdmin: true, user: session.user });
      } catch (error) {
        console.error('Admin auth error:', error);
        setState({ isLoading: false, isAdmin: false, user: null });
        navigate('/admin/login');
      }
    };

    checkAdminRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setState({ isLoading: false, isAdmin: false, user: null });
        navigate('/admin/login');
      } else if (event === 'SIGNED_IN' && session?.user) {
        checkAdminRole();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signOut = async () => {
    if (PUBLIC_ADMIN) {
      navigate('/');
      return;
    }
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return { ...state, signOut };
}
