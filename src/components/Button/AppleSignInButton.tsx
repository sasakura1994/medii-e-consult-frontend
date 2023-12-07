/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';
import AppleSignin from 'react-apple-signin-auth';
import { AiFillApple } from 'react-icons/ai';

type Props = {
  children: ReactNode;
  borderColorClassName?: string;
};

export const AppleSignInButton = (props: Props) => {
  const { children, borderColorClassName } = props;

  return (
    <AppleSignin
      authOptions={{
        clientId: 'jp.medii.e-consult',
        scope: 'email',
        redirectURI: `${process.env.ENDPOINT_URL}/apple_auth/callback`,
        state: '',
        nonce: 'nonce',
        usePopup: false,
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess={(response: any) => console.log(response)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render={(props: any) => (
        <button
          className={`
            inline-flex
            h-[56px]
            w-full
            items-center
            justify-center
            gap-1
            rounded-md
            border
            border-solid
            ${borderColorClassName ?? 'border-border-field'}
            px-10
            py-2
            text-base
            font-semibold
            text-text-caption
            hover:bg-monotone-200
          `}
          {...props}
        >
          <AiFillApple className="inline" size="30" />
          {children}
        </button>
      )}
    />
  );
};
