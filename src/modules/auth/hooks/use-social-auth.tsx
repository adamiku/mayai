import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type SocialProvider = 'google' | 'github';

export interface UseSocialAuthOptions {
  callbackURL?: string;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export function useSocialAuth(options: UseSocialAuthOptions = {}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const callbackURL = options.callbackURL || '/';
  
  const handleSocialAuth = (provider: SocialProvider) => {
    setError(null);
    setPending(true);

    authClient.signIn.social(
      {
        provider,
        callbackURL,
      },
      {
        onSuccess: () => {
          setPending(false);
          if (options.onSuccess) {
            options.onSuccess();
          } else {
            router.push(callbackURL);
          }
        },
        onError: ({ error }) => {
          const errorMessage = error.message;
          setError(errorMessage);
          setPending(false);
          if (options.onError) {
            options.onError(errorMessage);
          }
        },
      }
    );
  };

  return {
    handleSocialAuth,
    pending,
    error,
  };
}
