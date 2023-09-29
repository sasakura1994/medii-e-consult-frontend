import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

export const HowToUse: React.FC = () => {
  const router = useRouter();
  const { test } = router.query;
  return (
    <div className="flex justify-center bg-white lg:mt-6 lg:bg-transparent">
      <div className="hidden md:block">
        <p className="my-2 text-base text-gray-700">
          <Link href="#consult-sample">
            <a>E-コンサルの事例集</a>
          </Link>
        </p>
        <p className="text-base text-gray-700">
          <Link href="#use">
            <a>E-コンサルの使い方</a>
          </Link>
        </p>
        <div className="ml-2 align-baseline text-sm font-light">
          <p className="my-2">
            <Link href="#home">
              <a>ホーム画面について</a>
            </Link>
          </p>
          <p className="my-2">
            <Link href="#start">
              <a>E-コンサルの始め方</a>
            </Link>
          </p>
          <p className="my-2">
            <Link href="#resolve">
              <a>E-コンサルの解決方法（質問受ける医師）</a>
            </Link>
          </p>
          <p className="my-2">
            <Link href="#file">
              <a>ファイル添付</a>
            </Link>
          </p>
          <p>
            <Link href="#profile">
              <a>プロフィールの変更</a>
            </Link>
          </p>
          <p className="my-2">
            <Link href="#inquiry">
              <a>お問合せ・ご要望</a>
            </Link>
          </p>
        </div>
      </div>

      <div>
        <div className="mx-auto ml-2 mb-12 flex-wrap p-4 lg:max-w-2xl">
          <div className="mx-auto box-border w-full rounded-lg border-gray-300 bg-white pt-6 pb-6 text-center font-sans lg:border lg:shadow-lg">
            <div
              id="consult-sample"
              className="mb-4 text-2xl font-bold text-gray-700"
            >
              E-コンサルの事例集
            </div>
            <div className="mx-6">
              <div className="mx-2 text-left align-baseline font-normal">
                リウマチ膠原病内科の先生へのコンサル例
              </div>
              <div className="my-4 mx-2 border-x-2 border-b border-gray-400 opacity-25" />
              <div className="flex items-center">
                <img
                  src="images/howtouse/doctor.png"
                  className="m-3 hidden h-28 md:block"
                />
                <div className="h-auto rounded-lg border border-gray-400 p-3 md:h-32">
                  <p className="text-left text-primary">
                    30代妊娠希望の女性の関節リウマチ
                  </p>
                  <p className="text-left">
                    MTX8mg,
                    PSL10mg内服していますが、関節炎増悪しており生物学的製剤を含めた選択肢を教えていただけないでしょうか。
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <img
                  src="images/howtouse/doctor.png"
                  className="m-3 hidden  h-28 md:block"
                />
                <div className="h-auto rounded-lg border border-gray-400 p-3 md:h-32">
                  <p className="text-left text-primary">
                    40代女性抗核抗体80倍でHOMO/SPE陽性
                  </p>
                  <p className="text-left">
                    SLEやシェーグレンを疑うような症状はないものの、次に何を検査、フォローしたらいいのか教えてください。
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <img
                  src="images/howtouse/doctor.png"
                  className="m-3 hidden h-28 md:block"
                />
                <div className="h-auto rounded-lg border border-gray-400 p-3 md:h-32">
                  <p className="text-left text-primary">
                    70代男性 多発血管炎性肉芽腫症
                  </p>
                  <p className="text-left">
                    PSL10mg内服中の方で、胆嚢炎に対する胆嚢摘出術を予定しています。ステロイドカバーについてご教示お願いいたします。
                  </p>
                </div>
              </div>
              <div
                id="use"
                className="my-14 mb-4 text-2xl font-bold text-gray-700"
              >
                E-コンサルの使い方
              </div>
              <div
                id="home"
                className="mx-2 text-left align-baseline font-normal"
              >
                ホーム画面について
              </div>
              <div className="my-4 mx-2 border-x-2 border-b border-gray-400 opacity-25" />
              <img src="images/howtouse/01.png" className="mx-auto" />
              <img src="images/howtouse/02.png" className="mx-auto mt-5" />
              <div className="ml-2 mt-8 text-left md:ml-10 ">
                <div className="my-2">
                  <span className="mr-2 text-red-500">1</span>
                  <span>コンサル中のルーム一覧が表示されます。</span>
                </div>
                <div className="my-2">
                  <span className="mr-2 text-red-500">2</span>
                  <span>解決済みのコンサルルーム一覧が表示されます。</span>
                </div>
                <div className="my-2">
                  <span className="mr-2 text-red-500">3</span>
                  <span>新規コンサルルームが作成できます。</span>
                </div>
                <div className="my-2">
                  <span className="mr-2 text-red-500">4</span>
                  <span>患者詳細、コンサル中の医師情報が表示されます。</span>
                </div>
                <div className="my-2">
                  <span className="mr-2 text-red-500">5</span>
                  <span>メッセージ内容が表示されます。</span>
                </div>
                <div>
                  <span className="mr-2 text-red-500">6</span>
                  <span>マイページで登録情報・ポイントの確認ができます。</span>
                </div>
              </div>
              <div
                id="start"
                className="mx-2 mt-10 text-left align-baseline font-normal"
              >
                E-コンサルの始め方
              </div>
              <div className="my-4 mx-2 border-x-2 border-b border-gray-400 opacity-25" />
              <div className="text-left">
                <div className="my-10">
                  <span className="mr-2">1</span>
                  <span>ホーム画面から、＋ボタンを押下</span>
                  <img src="images/howtouse/03.png" />
                </div>
                <div className="my-10">
                  <span className="mr-2">2</span>
                  <span>専門医指定で方法、担当科を選択</span>
                  <br />
                  <p className="my-2 ml-4 text-sm">
                    『担当科を指定する（医師指定なし）』を選択した場合は、コンサルしたい担当科を選択してください。また、『専門医を指定する（医師指定あり）』を選択した場合は、詳細を入力し、医師を選択してください。
                  </p>
                  <div className="h-2" />
                  <img src="images/howtouse/04.png" className="mx-auto" />
                </div>
                <div className="my-10">
                  <span className="mr-2">3</span>
                  <span>
                    患者情報/患者背景/コンサル文を入力し、ルームを作成する
                  </span>
                  <div className="h-2" />
                  <img src="images/howtouse/05.png" className="mx-auto" />
                </div>
                <div className="my-10">
                  <span className="mr-2">4</span>
                  <span>E-コンサルルームで相談する</span>
                  <br />
                  <div className="h-2" />
                  <p className="my-4 ml-4 text-sm">
                    作成したルームに専門医がアサインされるのをお待ちください。専門医がアサインされる前でもファイルやメッセージを送ることは可能です。
                  </p>
                  <div className="h-2" />
                  <img src="images/howtouse/06.png" className="mx-auto" />
                </div>
              </div>
              <div
                id="resolve"
                className="mx-2 mb-10 text-left align-baseline font-normal"
              >
                E-コンサルの解決方法（質問受ける医師）
                <div className="my-4 mx-2 border-x-2 border-b border-gray-400 opacity-25" />
                <p className="my-2">「解決済にする」ボタンを押下</p>
                <p className="mb-2 ml-4 text-sm">
                  専門外の質問の場合は「回答パス」ボタンを押下します。未解決の場合は「チャット継続」ボタンを押下するとチャットの継続が可能になります。
                </p>
                <img src="images/howtouse/07.png" className="mx-auto" />
              </div>
              <div
                id="file"
                className="mx-2 mb-10 text-left align-baseline font-normal"
              >
                ファイル添付
                <div className="my-4 mx-2 border-x-2 border-b border-gray-400 opacity-25" />
                <p>「ファイル添付ボタン」を押下</p>
                <img src="images/howtouse/08.png" className="mx-auto" />
              </div>
              <div
                id="profile"
                className="mx-2 text-left align-baseline font-normal"
              >
                プロフィールの変更
                <div className="my-4 mx-2 border-x-2 border-b border-gray-400 opacity-25" />
                <p>メニューの「マイページ」からプロフィールの確認・変更</p>
              </div>
              <div className="h-8"></div>
              <img src="images/howtouse/10.png" className="mx-auto" />
              <div
                id="inquiry"
                className="mx-2 mt-10  text-left align-baseline font-normal"
              >
                お問合せ・ご要望
                <div className="my-4 mx-2 border-x-2 border-b border-gray-400 opacity-25" />
                <p className="text-sm">
                  メニューの「お問合せ・ご要望」から件名・本文を入力いただき「送信」ボタンを押下してください。ご不明点やご要望がありましたら、ぜひこちらよりご連絡ください。
                </p>
                <img src="images/howtouse/11.png" className="mx-auto" />
              </div>
            </div>
          </div>
        </div>

        <a
          href="#consult-sample"
          className={
            test === '1'
              ? 'fixed bottom-10 right-6 md:bottom-10 md:right-28'
              : 'fixed bottom-16 right-6 md:bottom-10 md:right-28'
          }
        >
          <PrimaryButton>上へ戻る</PrimaryButton>
        </a>
      </div>
    </div>
  );
};
