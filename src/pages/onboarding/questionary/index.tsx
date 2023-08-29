import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import { BreadcrumbItem } from '@/components/Breadcrumb/BreadcrumbItem';
import { BreadcrumbLink } from '@/components/Breadcrumb/BreadcrumbLink';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { CheckBox } from '@/components/Parts/Form/CheckBox';
import { Radio } from '@/components/Parts/Form/Radio';
import React from 'react';

const OnBoardingQuestionary = () => {
  return (
    <div className="mx-6 mb-10 mt-5 max-w-[1024px] lg:mx-auto lg:mt-10">
      <Breadcrumb>
        <BreadcrumbLink href="/top">TOP</BreadcrumbLink>
        <BreadcrumbItem>アンケート</BreadcrumbItem>
      </Breadcrumb>
      <h2 className="mt-2 text-xxl font-semibold">日常診療についてのアンケート</h2>
      <div className="mt-2 text-md">
        アンケート回答のお礼として100ポイントをプレゼントします。ポイント付与はおひとりさま１回のみです。
      </div>
      <div className="mt-2 text-medii-sm font-light text-secondary">
        ※アンケートの回答は統計的に処理され、特定の個人が識別できる情報として公表されることはありません。
        <br />
        ※1,000ポイント以上貯まると、1ポイントを1円のAmazonポイントに変換してお使いいただけます。
      </div>
      <div className="mt-10 flex flex-col gap-6">
        <section>
          <h3 className="text-md font-bold">
            Mediiの提供する医師・医学生限定のオンライン専門医相談サービス「E-コンサル」をご存知ですか？
          </h3>
          <div className="mt-2 flex gap-4 text-md">
            <Radio label="はい" name="questionary_item0" />
            <Radio label="いいえ" name="questionary_item0" />
          </div>
        </section>
        <section>
          <h3 className="text-md font-bold">
            上記のような困った症例、別の医師に意見を仰ぎたい症例に遭遇した際、どのように対応されましたか？
          </h3>
          <div className="mt-2 flex flex-col gap-1 text-md">
            <CheckBox label="自身で論文、症例報告等を参照して自力解決に努めた" name="questionary_item0" />
            <CheckBox label="院内の同科の医師に相談した" name="questionary_item0" />
          </div>
        </section>
      </div>
      <div className="mt-10">
        <PrimaryButton size="large" className="mx-auto px-4">
          アンケートを送信する
        </PrimaryButton>
      </div>
    </div>
  );
};

export default OnBoardingQuestionary;
