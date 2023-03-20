import React from 'react';
import Link from 'next/link';
import styles from './HeaderMenu.module.scss';

export const RegistrationHeaderMenu: React.FC = () => {
  return (
    <>
      <nav className={styles.header_nav}>
        {/* PC Menu */}
        <ul className={styles.header_menu}>
          <li className={styles.header_menu__item}>
            <Link href="/login">
              <a className={styles.header_menu__link}>ログイン</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
