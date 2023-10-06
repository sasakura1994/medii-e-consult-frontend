import { useCallback, useState, useEffect } from 'react';
import { useAxios } from '@/hooks/network/useAxios';
import { useRouter } from 'next/router';

type StudioItem = {
  document: {
    fields: {
      default: {
        mapValue: {
          fields: {
            title: {
              stringValue: string;
            };
            cover?: {
              stringValue: string;
            };
            slug: {
              stringValue: string;
            };
          };
        };
      };
      _meta: {
        mapValue: {
          fields: {
            publishedAt: {
              timestampValue: string;
            };
          };
        };
      };
    };
  };
};

export type MediiMagazinePost = {
  title: string;
  link: string;
  cover: string;
  date: string;
};

type UseNews = {
  posts?: MediiMagazinePost[];
};

export const useMediiMagazine = (): UseNews => {
  const router = useRouter();
  const { axios } = useAxios();
  const [posts, setPosts] = useState<MediiMagazinePost[]>();

  const fetchMediiMagazine = useCallback(async () => {
    // STUDIOのニュース情報を取得するためのパラメータ
    // 公開済みで、公開日降順で、10件取ってくる
    // 正式にはAPI公開しておらず、ハックしただけなので、急に振る舞いが変わる可能性あり

    const response = await axios.get<StudioItem[]>(
      'https://api.cms.studiodesignapp.com/documents:runQuery' +
        '?q=eyJzdHJ1Y3R1cmVkUXVlcnkiOnsiZnJvbSI6W3siY29sbGVjdGlvbklkIjoicHVibGlzaGVkIiwiYWxsRGVzY2VuZGFudHMiOnR' +
        'ydWV9XSwid2hlcmUiOnsiY29tcG9zaXRlRmlsdGVyIjp7Im9wIjoiQU5EIiwiZmlsdGVycyI6W3siZmllbGRGaWx0ZXIiOnsiZmllb' +
        'GQiOnsiZmllbGRQYXRoIjoiX21ldGEucHJvamVjdC5pZCJ9LCJvcCI6IkVRVUFMIiwidmFsdWUiOnsic3RyaW5nVmFsdWUiOiJsN3V' +
        'tYnBXaWpMRjA2MVNiSm9XTCJ9fX0seyJmaWVsZEZpbHRlciI6eyJmaWVsZCI6eyJmaWVsZFBhdGgiOiJfbWV0YS5zY2hlbWEua2V5I' +
        'n0sIm9wIjoiRVFVQUwiLCJ2YWx1ZSI6eyJzdHJpbmdWYWx1ZSI6ImpBOERKTXZUIn19fSx7ImZpZWxkRmlsdGVyIjp7ImZpZWxkIjp' +
        '7ImZpZWxkUGF0aCI6Il9maWx0ZXIifSwib3AiOiJBUlJBWV9DT05UQUlOUyIsInZhbHVlIjp7InN0cmluZ1ZhbHVlIjoiYjlHaThzR' +
        'Tk6NmcwNEpJUXgifX19XX19LCJvcmRlckJ5IjpbeyJmaWVsZCI6eyJmaWVsZFBhdGgiOiJfbWV0YS5wdWJsaXNoZWRBdCJ9LCJkaXJ' +
        'lY3Rpb24iOiJERVNDRU5ESU5HIn1dLCJsaW1pdCI6MTB9fQ%3D%3D'
    );

    setPosts(
      response.data.slice(0, 2).map((row) => {
        const image = row.document.fields.default.mapValue.fields.cover?.stringValue;
        return {
          title: row.document.fields.default.mapValue.fields.title.stringValue,
          link: 'https://medii.jp/magazine/' + row.document.fields.default.mapValue.fields.slug.stringValue,
          cover: image && image !== '' ? image : 'images/top/medii-info.png',
          date: row.document.fields._meta.mapValue.fields.publishedAt.timestampValue,
        };
      })
    );
  }, [axios]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (posts) {
      return;
    }

    fetchMediiMagazine();
  }, [fetchMediiMagazine, posts, router.isReady]);

  return { posts };
};
