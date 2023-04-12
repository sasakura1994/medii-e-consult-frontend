import React from 'react';
import Link from 'next/link';
import styles from './HeaderSubMenu.module.scss';
import { Tooltip } from '@/components/Parts/Menu/Tooltip';
import { TooltipMenu } from '@/components/Parts/Menu/TooltipMenu';
import { TooltipSpMenu } from '@/components/Parts/Menu/TooltipSpMenu';

export const HeaderSubMenu: React.FC = () => {
  return (
    <>
      <nav className={styles.header_subnav}>
        {/***** PC Submenu *****/}
        <ul className={styles.header_submenu}>
          <li className={styles.header_submenu__item}>
            <Tooltip delayHide={100} offset={[50, 4]} showArrow={true}>
              <Link href="/">
                <a className={styles.header_submenu__link}>
                  <span
                    className={`${styles.header_submenu__link_text} ${styles.header_submenu__link_text___menu}`}
                  >
                    メニュー
                  </span>
                </a>
              </Link>
              <TooltipMenu
                menus={[
                  {
                    text: 'E-コンサルの使い方',
                    link: '/',
                    icon: <img src="/icons/help.svg" />,
                  },
                  {
                    text: 'よくある質問',
                    link: '/',
                    icon: <img src="/icons/faq.svg" />,
                  },
                  {
                    text: 'お問合わせ',
                    link: '/',
                    icon: <img src="/icons/contact.svg" />,
                  },
                ]}
                style={{
                  nav: `bg-white mt-4 rounded shadow-[0_5px_5px_0_rgba(0,0,0,0.5)]`,
                }}
              />
            </Tooltip>
          </li>
          <li className={styles.header_submenu__item}>
            <Link href="/seminar">
              <a className={styles.header_submenu__link}>
                <span
                  className={`${styles.header_submenu__link_text} ${styles.header_submenu__link_text___seminar}`}
                >
                  セミナー
                </span>
              </a>
            </Link>
          </li>
          <li className={styles.header_submenu__item}>
            <Tooltip delayHide={300} offset={[-28, 4]} showArrow={true}>
              <a className={styles.header_submenu__link}>
                <span
                  className={`${styles.header_submenu__link_text} ${styles.header_submenu__link_text___mypage}`}
                >
                  マイページ
                </span>
              </a>
              <TooltipMenu
                menus={[
                  {
                    text: 'プロフィール',
                    link: '/EditProfile',
                    icon: <img src="/icons/my_profile.svg" />,
                  },
                  {
                    text: 'Mediiポイント',
                    link: '/PointHistory',
                    icon: <img src="/icons/point.svg" />,
                  },
                  {
                    text: 'Amazonギフト',
                    link: '/AmazonGift',
                    icon: <img src="/icons/gift.svg" />,
                  },
                  {
                    text: '医師紹介',
                    link: '/Affiliate',
                    icon: <img src="/icons/invite.svg" />,
                  },
                  {
                    text: '通知設定',
                    link: '/NotifySettings',
                    icon: <img src="/icons/noti_setting.svg" />,
                  },
                ]}
                style={{
                  nav: `bg-white mt-4 rounded shadow-[0_5px_5px_0_rgba(0,0,0,0.5)]`,
                }}
              />
            </Tooltip>
          </li>
        </ul>
      </nav>

      {/***** SP Submenu *****/}
      <nav className={styles.header_subnav_sp}>
        <ul className={styles.header_submenu_sp}>
          <li className={styles.header_submenu_sp__item}>
            <Link href="/seminar">
              <a
                className={`${styles.header_submenu_sp__link} ${styles.header_submenu_sp__link___seminar}`}
              >
                セミナー
              </a>
            </Link>
          </li>
          <li className={styles.header_submenu_sp__item}>
            <Tooltip triggerAction="click" offset={[-80, 14]}>
              <div className={styles.header_submenu__link}>
                <span
                  className={`${styles.header_submenu_sp__link} ${styles.header_submenu_sp__link___menu}`}
                >
                  メニュー
                </span>
              </div>
              <TooltipSpMenu
                menus={{
                  mypage: [
                    {
                      text: 'プロフィール',
                      link: '/EditProfile',
                      icon: <img src="/icons/my_profile.svg" />,
                    },
                    {
                      text: 'Mediiポイント',
                      link: '/PointHistory',
                      icon: <img src="/icons/point.svg" />,
                    },
                    {
                      text: 'Amazonギフト',
                      link: '/AmazonGift',
                      icon: <img src="/icons/gift.svg" />,
                    },
                    {
                      text: '医師紹介',
                      link: '/Affiliate',
                      icon: <img src="/icons/invite.svg" />,
                    },
                    {
                      text: '通知設定',
                      link: '/NotifySettings',
                      icon: <img src="/icons/noti_setting.svg" />,
                    },
                  ],
                  service: [
                    {
                      text: 'E-コンサルの使い方',
                      link: '/',
                      icon: <img src="/icons/help.svg" />,
                    },
                    {
                      text: 'よくある質問',
                      link: '/',
                      icon: <img src="/icons/faq.svg" />,
                    },
                    {
                      text: 'お問合わせ',
                      link: '/',
                      icon: <img src="/icons/contact.svg" />,
                    },
                  ],
                }}
              />
            </Tooltip>
          </li>
        </ul>
      </nav>
    </>
  );
};
