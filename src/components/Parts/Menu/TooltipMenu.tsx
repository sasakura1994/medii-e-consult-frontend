import React from 'react';
import Link from 'next/link';
import styles from './TooltipMenu.module.scss';

type StyleType = {
  nav?: string;
  list?: string;
  item?: string;
  link?: string;
};

type MenuType = {
  text: string;
  link: string;
  icon?: React.ReactNode;
  openInNewTab?: boolean;
};

type PropsType = {
  menus: MenuType[];
  style?: StyleType;
  setControlledVisible?: React.Dispatch<React.SetStateAction<boolean>>;
};

const getNavStyle = (style: StyleType | undefined): string => {
  if (!style) return styles.tooltip_nav;
  if (style.nav && styles.tooltip_nav)
    return `${styles.tooltip_nav} ${style.nav}`;
  if (style.nav) return style.nav;
  return styles.tooltip_nav;
};

const getListStyle = (style: StyleType | undefined): string => {
  if (!style) return styles.tooltip_menu;
  if (style.list && styles.tooltip_menu)
    return `${styles.tooltip_menu} ${style.list}`;
  if (style.list) return style.list;
  return styles.tooltip_menu;
};

const getItemStyle = (style: StyleType | undefined): string => {
  if (!style) return styles.tooltip_menu__item;
  if (style.item && styles.tooltip_menu__item)
    return `${styles.tooltip_menu__item} ${style.item}`;
  if (style.item) return style.item;
  return styles.tooltip_menu__item;
};

const getLinkStyle = (style: StyleType | undefined): string => {
  if (!style) return styles.tooltip_menu__link;
  if (style.link && styles.tooltip_menu__link)
    return `${styles.tooltip_menu__link} ${style.link}`;
  if (style.link) return style.link;
  return styles.tooltip_menu__link;
};

export const TooltipMenu: React.FC<PropsType> = (props) => {
  const { menus, style, setControlledVisible } = props;

  return (
    <nav className={getNavStyle(style)}>
      <ul className={getListStyle(style)}>
        {menus.map((menu, index) => (
          <li className={getItemStyle(style)} key={index}>
            <Link href={menu.link}>
              <a
                className={getLinkStyle(style)}
                target={menu.openInNewTab ? '_blank' : undefined}
                rel={menu.openInNewTab ? 'noopener noreferrer' : undefined}
                onClick={() => {
                  setControlledVisible
                    ? setControlledVisible(false)
                    : undefined;
                }}
              >
                <span className={styles.tooltip_menu__icon}>{menu.icon}</span>
                {menu.text}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
