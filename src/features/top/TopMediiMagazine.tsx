import React from 'react';
import { Interview, TopMediiMagazineItem } from './TopMediiMagazineItem';

const interviews: Interview[] = [
  {
    title: '若手医師が感じる経験不足をE-コンサルで補う。迷ったら、まず気軽に質問してみることが患者さんのためになる。',
    url: 'https://note.com/medii_ecns/n/ndada7a1e5305?magazine_key=mc775b94f3819',
    medicalSpeciality: 'リウマチ膠原病内科医',
    doctorName: '多田先生',
    thumbnailUrl:
      'https://assets.st-note.com/production/uploads/images/93272671/rectangle_large_type_2_49ce1ce697e149f47bff0721306e1900.png?width=200',
  },
  {
    title: 'オンラインで気軽に匿名相談できる手軽さや質問の返答が60分以内と早くて満足。',
    url: 'https://note.com/medii_ecns/n/n27ae8f034ecd?magazine_key=mc775b94f3819',
    medicalSpeciality: '総合診療内科',
    doctorName: '谷崎隆太郎先生',
    thumbnailUrl:
      'https://assets.st-note.com/production/uploads/images/93272758/rectangle_large_type_2_a55b94487d366ae20032bf32b235c0f7.png?width=200',
  },
];

export const TopMediiMagazine = () => {
  return (
    <>
      <div className="flex items-center">
        <p className="flex-grow text-xxl font-bold text-text-primary">Medii Magazine</p>
        <a href="https://medii.jp/magazine/tag/consultant" target="_blank" rel="noreferrer">
          <button className="text-md text-text-secondary">もっと見る</button>
        </a>
      </div>
      {interviews.map((interview) => (
        <TopMediiMagazineItem key={interview.url} interview={interview} />
      ))}
    </>
  );
};
