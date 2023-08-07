import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { PublicLayout } from '@/components/Layouts/PublicLayout';
import { Card } from '@/components/Parts/Card/Card';
import { TextField } from '@/components/Parts/Form/TextField';
import { usePasswordResetRequest } from '@/features/password/passwordResetRequest/usePasswordResetRequest';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';

const PasswordResetRequestPage: NextPageWithLayout = () => {
  const { errorMessage, isCompleted, isSending, mailAddress, sendPasswordResetRequest, setMailAddress } =
    usePasswordResetRequest();

  return (
    <>
      <Card className="p-4">
        {!isCompleted ? (
          <>
            <h1 className="text-center text-2xl">Medii パスワードリセット</h1>
            <form onSubmit={sendPasswordResetRequest}>
              <div className="mt-4 flex justify-center">
                <div className="mx-auto w-52">
                  <div className="text-left font-bold">メールアドレス</div>
                  <div className="mt-1">
                    <TextField
                      name="mail_address"
                      type="email"
                      value={mailAddress}
                      onChange={(e) => setMailAddress(e.target.value)}
                      required
                    />
                  </div>
                  {!isSending ? (
                    <div className="my-6 text-center">
                      <PrimaryButton type="submit" className="mx-auto">
                        送信
                      </PrimaryButton>
                    </div>
                  ) : (
                    <div className="mt-4 text-center">
                      <SpinnerBorder />
                    </div>
                  )}
                  {errorMessage !== '' && <ErrorMessage className="text-center">{errorMessage}</ErrorMessage>}
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
