import React from 'react';
import { useProfile } from '../../../hooks/useProfile';
import { CaptionWithBody } from '@/components/Parts/CaptionWithBody';
import { OutlinedSquareButton } from '@/components/Parts/Button/OutlinedSquareButton';
import { Card } from '@/components/Parts/Card/Card';
import { removeAuthToken } from '@/libs/cookie';
import { useRouter } from 'next/router';

export const ProfileDetail: React.FC = () => {
  const router = useRouter();
  const {
    profile,
    email,
    hospital,
    editProfileScreen,
    openEdit,
    getMedicalSpecialityNameByCode,
    getPrefectureNameByCode,
  } = useProfile();

  if (!editProfileScreen.isDetailOpen) {
    return null;
  }

  return (
    <>
      <Card className="px-4 pb-8 pt-10 lg:px-[84px] lg:py-10">
        <div className="item mb-10 flex items-center justify-between">
          <h2
            className="text-2xl leading-8"
            data-testid="h-edit-profile-detail"
          >
            プロフィール
          </h2>
          <OutlinedSquareButton
            type="button"
            onClick={openEdit}
            dataTestId="btn-profile-edit"
          >
            プロフィールを編集
          </OutlinedSquareButton>
        </div>

        <div className="mb-10">
          <h3 className="mb-4 text-primary">■ 利用者情報</h3>
          <div className="flex">
            <CaptionWithBody
              caption="名前"
              body={`${profile?.last_name} ${profile?.first_name}`}
              classNames={{
                block: 'mb-6 flex-1',
                caption: 'text-[#999999] mb-2',
              }}
            />
            <CaptionWithBody
              caption="名前（よみ）"
              body={`${profile?.last_name_hira} ${profile?.first_name_hira}`}
              classNames={{
                block: 'mb-6 flex-1',
                caption: 'text-[#999999] mb-2',
              }}
            />
          </div>

          <CaptionWithBody
            caption="生年月日"
            body={`${profile?.birthday_year}年 ${profile?.birthday_month}月 ${profile?.birthday_day}日`}
            classNames={{ block: 'mb-6', caption: 'text-[#999999] mb-2' }}
          />

          {email && !email.is_apple && (
            <div>
              <CaptionWithBody
                caption="メールアドレス"
                body={email.mail_address}
                classNames={{ block: 'mb-2', caption: 'text-[#999999] mb-2' }}
              />
              <button
                type="button"
                className="inline-block
                         rounded
                         border
                         border-solid
                         border-[#999999]
                         bg-white
                         px-2
                         py-2
                         text-sm
                         leading-none"
                onClick={() => console.log('メールアドレス編集')}
              >
                メールアドレスを変更
              </button>
            </div>
          )}
        </div>

        <div className="mb-10">
          <h3 className="mb-4 text-primary">■ 医療従事経歴</h3>

          <CaptionWithBody
            caption="医師資格取得年"
            body={`${profile?.qualified_year} 年`}
            classNames={{ block: 'mb-6', caption: 'text-[#999999] mb-2' }}
          />

          <CaptionWithBody
            caption="専門科"
            body={getMedicalSpecialityNameByCode(profile?.main_speciality)}
            classNames={{ block: 'mb-6', caption: 'text-[#999999] mb-2' }}
          />

          <div className="mb-6">
            <p className="mb-2 text-[#999999]">その他（対応可能な科目）</p>
            {getMedicalSpecialityNameByCode(profile?.speciality_2) && (
              <p className="mb-2">
                {getMedicalSpecialityNameByCode(profile?.speciality_2)}
              </p>
            )}
            {getMedicalSpecialityNameByCode(profile?.speciality_3) && (
              <p className="mb-2">
                {getMedicalSpecialityNameByCode(profile?.speciality_3)}
              </p>
            )}
            {getMedicalSpecialityNameByCode(profile?.speciality_4) && (
              <p className="mb-2">
                {getMedicalSpecialityNameByCode(profile?.speciality_4)}
              </p>
            )}
          </div>

          <CaptionWithBody
            caption="特によく診てきた疾患・領域"
            body={profile?.expertise}
            classNames={{ block: 'mb-6', caption: 'text-[#999999] mb-2' }}
          />

          <CaptionWithBody
            caption="専門医資格"
            body={profile?.qualification}
            classNames={{ block: 'mb-6', caption: 'text-[#999999] mb-2' }}
          />
        </div>

        <div className="mb-10">
          <h3 className="mb-4 text-primary">■ 所属病院</h3>

          {(profile?.hospital_id || profile?.hospital_name) && (
            <>
              <CaptionWithBody
                caption="勤務病院の所在地"
                body={getPrefectureNameByCode(profile?.prefecture_code)}
                classNames={{ block: 'mb-6', caption: 'text-[#999999] mb-2' }}
              />

              <CaptionWithBody
                caption="勤務先病院名"
                body={hospital?.hospital_name}
                classNames={{ block: 'mb-6', caption: 'text-[#999999] mb-2' }}
              />
            </>
          )}
        </div>

        <div className="mb-10">
          <h3 className="mb-4 text-primary">■ E-コンサル利用区分</h3>
          <p>
            {profile?.want_to_be_consultant
              ? '回答医&相談（E−コンサルへの回答も行います）'
              : '相談医'}
          </p>
        </div>
      </Card>

      <div className="mt-12 text-center lg:pb-20">
        <button
          type="button"
          className="text-[#999999] underline"
          onClick={() => {
            removeAuthToken();
            router.push('/login');
          }}
        >
          ログアウト
        </button>
      </div>
    </>
  );
};
