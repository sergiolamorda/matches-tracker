import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

import logoACB from '../../assets/images/logo-acb-4a.png';

export function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.header__container}>
        <div>
          <Link to="/">
            <img src={logoACB} alt="Logo" />
          </Link>
        </div>
      </section>
    </header>
  )
}