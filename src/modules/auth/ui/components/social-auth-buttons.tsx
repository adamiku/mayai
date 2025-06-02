'use client';

import { Button } from '@/components/ui/button';
import { useSocialAuth, UseSocialAuthOptions } from '@/modules/auth/hooks/use-social-auth';
import { FaGithub, FaGoogle } from 'react-icons/fa';

export interface SocialAuthButtonsProps extends UseSocialAuthOptions {}

export const SocialAuthButtons = (props: SocialAuthButtonsProps) => {
  const { handleSocialAuth, pending } = useSocialAuth(props);
  return (
    <>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-card text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="w-full"
          type="button"
          disabled={pending}
          onClick={() => handleSocialAuth('google')}
        >
          <FaGoogle />
        </Button>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          disabled={pending}
          onClick={() => handleSocialAuth('github')}
        >
          <FaGithub />
        </Button>
      </div>
    </>
  );
};
