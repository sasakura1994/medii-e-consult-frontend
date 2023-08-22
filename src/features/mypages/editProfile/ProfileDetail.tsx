import React from 'react';
import { CaptionWithBody } from '@/components/Parts/CaptionWithBody';
import { OutlinedSquareButton } from '@/components/Parts/Button/OutlinedSquareButton';
import { Card } from '@/components/Parts/Card/Card';
import { removeAuthToken } from '@/libs/cookie';
import { useRouter } from 'next/router';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { usePrefecture } from '@/hooks/prefecture/usePrefecture';
import { useProfile } from '@/hooks/useProfile';
import Link from 'next/link';
import { EditProfileHeading } from './EditProfileHeading';

type Props = {
  onEdit: () => void;
};

export const ProfileDetail: React.FC<Props> = ({ onEdit }: Props) => {
  const router = useRouter();
  const { getMedicalSpecialityName } = useMedicalSpeciality();
  const { getPrefectureNameByCode } = usePrefecture();
  const { profile, email, hospitalName } = useProfile();

  return (
    <>
      <Card className="px-4 pb-8 pt-10 lg:px-[84px] lg:py-10">
        <div className="item mb-10 flex items-center justify-between">
          <h2 className="text-2xl leading-8" data-testid="h-edit-profile-detail">
            プロフィール
          </h2>
          <OutlinedSquareButton type="button" onClick={onEdit} dataTestId="btn-profile-edit">
            プロフィールを編集
          </OutlinedSquareButton>
        </div>

        {profile && (
          <>
            <div className="mb-10">
              <EditProfileHeading className="mb-4">利用者情報</EditProfileHeading>
              <div className="flex">
                <CaptionWithBody
                  caption="名前"
                  className="mb-6 flex-1"
                >{`${profile.last_name} ${profile.first_name}`}</CaptionWithBody>
                <CaptionWithBody
                  caption="名前（よみ）"
                  className="mb-6 flex-1"
                >{`${profile.last_name_hira} ${profile.first_name_hira}`}</CaptionWithBody>
              </div>

              <CaptionWithBody
                caption="生年月日"
                className="mb-6"
              >{`${profile.birthday_year}年 ${profile.birthday_month}月 ${profile.birthday_day}日`}</CaptionWithBody>

              {profile.graduated_university && (
                <CaptionWithBody caption="卒業大学" className="mb-6">
                  {profile.graduated_university}
                </CaptionWithBody>
              )}

              {email && !email.is_apple && (
                <div>
                  <CaptionWithBody caption="メールアドレス" className="mb-2">
                    {email.mail_address}
                  </CaptionWithBody>
                  <Link href="/editemail">
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
                    >
                      メールアドレスを変更
                    </button>
                  </Link>
                </div>
              )}
            </div>

            <div className="mb-10">
              <EditProfileHeading className="mb-4">医療従事経歴</EditProfileHeading>

              <CaptionWithBody
                caption="医師資格取得年"
                className="mb-6"
              >{`${profile.qualified_year} 年`}</CaptionWithBody>

              <CaptionWithBody caption="専門科" className="mb-6">
                {getMedicalSpecialityName(profile.main_speciality)}
              </CaptionWithBody>

              <div className="mb-6">
                <p className="mb-2 text-[#999999]">その他（対応可能な科目）</p>
                {getMedicalSpecialityName(profile.speciality_2) && (
                  <p className="mb-1">{getMedicalSpecialityName(profile.speciality_2)}</p>
                )}
                {getMedicalSpecialityName(profile.speciality_3) && (
                  <p className="mb-1">{getMedicalSpecialityName(profile.speciality_3)}</p>
                )}
                {getMedicalSpecialityName(profile.speciality_4) && (
                  <p className="mb-1">{getMedicalSpecialityName(profile.speciality_4)}</p>
                )}
              </div>

              <CaptionWithBody caption="特によく診てきた疾患・領域" className="mb-6">
                {profile.expertise}
              </CaptionWithBody>

              <CaptionWithBody caption="専門医資格" className="mb-6">
                {profile.qualification}
              </CaptionWithBody>
            </div>

            <div className="mb-10">
              <EditProfileHeading className="mb-4">所属病院</EditProfileHeading>

              {(profile.hospital_id || profile.hospital_name) && (
                <>
                  <CaptionWithBody caption="勤務病院の所在地" className="mb-6">
                    {getPrefectureNameByCode(profile.prefecture_code)}
                  </CaptionWithBody>

                  <CaptionWithBody caption="勤務先病院名" className="mb-6">
                    {hospitalName}
                  </CaptionWithBody>
                </>
              )}
            </div>

            {profile.registration_source !== 'nmo' && (
              <div className="mb-10" data-testid="profile-detail-usage-classification">
                <EditProfileHeading className="mb-4">E-コンサル利用区分</EditProfileHeading>
                <p>{profile.want_to_be_consultant ? '回答医&相談（E−コンサルへの回答も行います）' : '相談医'}</p>
              </div>
            )}

            <div className="mt-12 lg:pb-10">
              <Link href="/withdrawal/confirm">
                <a className="text-md text-distructive underline">アカウントを削除</a>
              </Link>
            </div>
          </>
        )}
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
