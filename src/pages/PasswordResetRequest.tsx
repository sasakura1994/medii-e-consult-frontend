import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { PublicLayout } from '@/components/Layouts/PublicLayout';
import { Card } from '@/components/Parts/Card/Card';
import { TextField } from '@/components/Parts/Form/TextField';
import { usePasswordResetRequest } from '@/features/password/passwordResetRequest/usePasswordResetRequest';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';

const PasswordResetRequestPage: NextPageWithLayout = () => {
  const {
    errorMessage,
    isCompleted,
    isSending,
    mailAddress,
    sendPasswordResetRequest,
    setMailAddress,
  } = usePasswordResetRequest();

  return (
    <>
      <Card className="p-4">
        {!isCompleted ? (
          <>
            <h1 className="text-center text-2xl">Medii パスワードリセット</h1>
            <form onSubmit={sendPasswordResetRequest}>
              <div className="mt-4 flex justify-center">
                <div>
                  <div className="font-bold">メールアドレス</div>
                  <div className="mt-1">
                    <TextField
                      name="mail_address"
                      value={mailAddress}
                      onChange={(e) => setMailAddress(e.target.value)}
                      required
                    />
                  </div>
                  {!isSending ? (
                    <div className="my-6 text-center">
                      <button type="submit">送信</button>
                    </div>
                  ) : (
                    <div className="mt-4 text-center">
                      <SpinnerBorder />
                    </div>
                  )}
                  {errorMessage !== '' && (
                    <ErrorMessage className="text-center">
                      {errorMessage}
                    </ErrorMessage>
                  )}
                </div>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center" data-testid="result-text">
            {mailAddress}にパスワードリセット用のメールをお送りしました。
            <br />
            メール本文内のリンクからパスワードのリセットをお願いいたします。
            <br />
          </div>
        )}
      </Card>
    </>
  );
};

PasswordResetRequestPage.getLayout = (page: React.ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default PasswordResetRequestPage;
