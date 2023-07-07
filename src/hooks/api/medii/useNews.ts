import { useCallback, useState, useEffect } from 'react';
import { useAxios } from '@/hooks/network/useAxios';

type NewsResultItem = {
  document: {
    fields: {
      default: {
        mapValue: {
          fields: {
            title: {
              stringValue: string;
            };
            wp_cover: {
              stringValue: string;
            };
            slug: {
              stringValue: string;
            };
            publishedAt: {
              timestampValue: string;
            };
            MQRJlwFO?: {
              booleanValue: boolean;
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

export type News = {
  title: string;
  link: string;
  cover: string;
  date: string;
};

type UseNews = {
  newsList?: News[];
};

export const useNews = (): UseNews => {
  const { axios } = useAxios();
  const [newsList, setNewsList] = useState<News[]>();

  const fetchNews = useCallback(async () => {
    // STUDIOのニュース情報を取得するためのパラメータ
    // 公開済みで、公開日降順で、10件取ってくる
    // 正式にはAPI公開しておらず、ハックしただけなので、急に振る舞いが変わる可能性あり
    const postParam = {
      structuredQuery: {
        from: [{ collectionId: 'published', allDescendants: true }],
        where: {
          compositeFilter: {
            op: 'AND',
            filters: [
              {
                fieldFilter: {
                  field: {
                    fieldPath: '_meta.project.id',
                  },
                  op: 'EQUAL',
                  value: {
                    stringValue: 'l7umbpWijLF061SbJoWL',
                  },
                },
              },
              {
                fieldFilter: {
                  field: {
                    fieldPath: '_meta.schema.key',
                  },
                  op: 'EQUAL',
                  value: {
                    stringValue: 'wp_post_QLlz1udS',
                  },
                },
              },
            ],
          },
        },
        orderBy: [
          {
            field: {
              fieldPath: '_meta.publishedAt',
            },
            direction: 'DESCENDING',
          },
        ],
        limit: 10,
      },
    };

    const response = await axios.post<NewsResultItem[]>(
      'https://api.cms.studiodesignapp.com/documents:runQuery',
      postParam
    );

    setNewsList(
      response.data
        .filter((row) => {
          const isDisplay =
            row.document.fields.default.mapValue.fields.MQRJlwFO;
          return isDisplay?.booleanValue === true;
        })
        .slice(0, 2)
        .map((row) => ({
          title: row.document.fields.default.mapValue.fields.title.stringValue,
          link:
            'https://medii.jp/news/' +
            row.document.fields.default.mapValue.fields.slug.stringValue,
          cover:
            row.document.fields.default.mapValue.fields.wp_cover.stringValue,
          date: row.document.fields._meta.mapValue.fields.publishedAt
            .timestampValue,
        }))
    );
  }, [axios]);

  useEffect(() => {
    if (newsList) {
      return;
    }

    fetchNews();
  }, [fetchNews, newsList]);

  return { newsList };
};
