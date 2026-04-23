import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface AdminAuthState {
  isLoading: boolean;
  isAdmin: boolean;
  user: any | null;
}

/**
 * Gates the /admin area. Checks that the visitor:
 *   1. has a Supabase session (signed in)
 *   2. has the 'admin' role via public.has_role()
 *
 * If either fails, redirects to /admin/login. Having a real session here
 * is REQUIRED — every admin mutation hits RLS policies that check
 * auth.uid() + has_role(). Without a session, RLS silently filters all
 * rows, so deletes/updates appear to succeed but change nothing.
 */
export function useAdminAuth() {
  const [state, setState] = useState<AdminAuthState>({
    isLoading: true,
    isAdmin: false,
    user: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user) {
          setState({ isLoading: false, isAdmin: false, user: null });
          navigate('/admin/login');
          return;
        }

        const { data: hasRole, error } = await supabase.rpc('has_role', {
          _user_id: session.user.id,
          _role: 'admin',
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
      } catch (err) {
        console.error('Admin auth error:', err);
        setState({ isLoading: false, isAdmin: false, user: null });
        navigate('/admin/login');
      }
    };

    checkAdminRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
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
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return { ...state, signOut };
}
