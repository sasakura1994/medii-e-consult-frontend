import React from 'react';
import { UseRegisterType } from '@/hooks/useRegister';
import { Footer } from '@/components/Layouts/Footer/Footer';
import { HeaderLogoOnly } from '@/components/Layouts/Header/HeaderLogoOnly';
import { ColoredImage } from '@/components/Image/ColoredImage';
import TertiaryButton from '@/components/Button/TertiaryButton';
import { ToastContainer, toast } from 'react-toastify';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';

export const RegistrationCompleted = (props: UseRegisterType) => {
  const { back, email, isSending, registerAgain } = props;

  return (
    <>
      <div className="flex h-full min-h-screen w-full flex-col">
        <HeaderLogoOnly />
        <main className="flex flex-grow justify-center py-10">
          <div className="px-4 lg:w-[600px] lg:px-0">
            <h2 className="text-center text-2xl font-semibold">メールアドレスの確認</h2>
            <p className="mt-6">
              <span className="text-semibold">{email}</span> に確認用のメールを送信しました。
              <br />
              メール本文のURLをクリックして、E-コンサルへの登録を完了してください。
            </p>
            <div className="mt-6 bg-bg-secondary p-6">
              <div className="flex items-center gap-2">
                <ColoredImage src="icons/exclamation-triangle.svg" color="#000000" width="20px" height="20px" />
                <div className="text-lg font-semibold">メールが届かない方</div>
              </div>
              <div className="mt-4 font-light">
                <p>確認用のメールが届かない場合には、下記の内容を確認してください。</p>
                <ul className="ml-6 mt-4 list-disc">
                  <li>迷惑メールフォルダや受信ボックス以外のフォルダに振り分けられていないかご確認ください。</li>
                  <li>
                    ご使用のメールアドレスが正しいかご確認ください。正しくない場合は、新しいメールアドレスを再設定してください。
                  </li>
                </ul>
              </div>
              <div className="mt-4 flex flex-col justify-center gap-4 lg:flex-row">
                {isSending ? (
                  <SpinnerBorder />
                ) : (
                  <>
                    <TertiaryButton size="large" onClick={registerAgain}>
                      確認メールを再送信する
                    </TertiaryButton>
                    <TertiaryButton size="large" onClick={back}>
                      他のメールアドレスを使用する
                    </TertiaryButton>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer noMenu />
      </div>
      <ToastContainer
        hideProgressBar={true}
        autoClose={2000}
        position={toast.POSITION.BOTTOM_CENTER}
        closeButton={false}
        toastClassName={() => 'bg-toast-success text-white text-center py-2 shadow-md'}
      />
    </>
  );
};
