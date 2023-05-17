import React from 'react';
import Link from 'next/link';
import styles from './TooltipSpMenu.module.scss';

type MenuType = {
  text: string;
  link: string;
  icon?: React.ReactNode;
  openInNewTab?: boolean;
};

type MenuListType = {
  mypage: MenuType[];
  service: MenuType[];
};

type PropsType = {
  menus: MenuListType;
  setControlledVisible?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TooltipSpMenu: React.FC<PropsType> = (props) => {
  const { menus, setControlledVisible } = props;

  return (
    <div className={styles.tooltip_sp}>
      <div className={styles.tooltip_sp_nav}>
        <h2 className={styles.tooltip_sp_nav__heading}>マイページ</h2>
        <ul className={styles.tooltip_sp_menu}>
          {menus.mypage.map((menu, index) => (
            <li className={styles.tooltip_sp_menu__item} key={index}>
              <Link href={menu.openInNewTab ? menu.link : ''}>
                <a
                  onClick={() => {
                    if (menu.openInNewTab) {
                      window.open(menu.link, '_blank');
                      window.focus();
                    }
                    setControlledVisible
                      ? setControlledVisible(false)
                      : undefined;
                  }}
                  className={`${styles.tooltip_sp_menu__link}`}
                >
                  <span className={styles.tooltip_sp_menu__icon}>
                    {menu.icon}
                  </span>
                  {menu.text}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.tooltip_sp_nav}>
        <h2 className={styles.tooltip_sp_nav__heading}>サービス関連情報</h2>
        <ul className={styles.tooltip_sp_menu}>
          {menus.service.map((menu, index) => (
            <li className={styles.tooltip_sp_menu__item} key={index}>
              <Link href={menu.link}>
                <a className={`${styles.tooltip_sp_menu__link}`}>
                  <span className={styles.tooltip_sp_menu__icon}>
                    {menu.icon}
                  </span>
                  {menu.text}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
