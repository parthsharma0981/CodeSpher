import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const token = searchParams.get('token');
    const provider = searchParams.get('provider') || 'OAuth';
    const demo = searchParams.get('demo');
    const error = searchParams.get('error');

    if (error) {
      toast.error(error);
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    if (!token) {
      toast.error('Authentication token missing. Please try logging in again.');
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    const completeAuth = async () => {
      try {
        await loginWithToken(token);
        const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
        toast.success(`Successfully signed in with ${providerName}!`);

        if (demo === 'true') {
          setTimeout(() => {
            toast(
              `Demo mode active. Add ${provider.toUpperCase()}_CLIENT_ID & SECRET in server/.env for live OAuth!`,
              {
                icon: 'ℹ️',
                duration: 6000,
              }
            );
          }, 600);
        }

        navigate(ROUTES.DASHBOARD, { replace: true });
      } catch (err) {
        toast.error('Failed to complete sign-in. Please try again.');
        navigate(ROUTES.LOGIN, { replace: true });
      }
    };

    completeAuth();
  }, [searchParams, loginWithToken, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-950 p-4">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-lg">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
          Authenticating
        </h2>
        <p className="text-sm text-neutral-500">
          Completing sign-in and loading your workspaces...
        </p>
      </div>
    </div>
  );
};

export default OAuthCallback;
