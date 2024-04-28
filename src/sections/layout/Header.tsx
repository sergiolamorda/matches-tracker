import styles from './Header.module.scss';

import logoACB from '../../assets/images/logo-acb-4a.png';

export function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.header__container}>
        <div>
          <img src={logoACB} alt="Logo" />
          <span>Matches Tracker</span>
        </div>
      </section>
    </header>
  )
}