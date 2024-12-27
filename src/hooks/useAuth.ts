import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../lib/constants';

export function useAuth() {
  const navigate = useNavigate();
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      try {
        setLoading(true);
        
        // Check current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted) {
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        if (!session && window.location.pathname !== ROUTES.REGISTER) {
          navigate(ROUTES.LOGIN);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, setUser, setLoading]);
}