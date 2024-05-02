import { Container } from './Container';

import styles from './Footer.module.scss';


export function Footer() {

  function renderYear() {
    return new Date().getFullYear();
  }

  return (
    <footer className={styles.footer}>
      <Container>
        <p>© {renderYear()} - Todos los derechos reservados</p>
      </Container>
    </footer>
  )
}