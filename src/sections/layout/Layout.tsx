import { Outlet } from "react-router-dom"

import { Header } from "./Header"
import { Footer } from "./Footer"
import { ErrorBoundary } from "./ErrorBoundary"

import styles from './Layout.module.scss';

export function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <ErrorBoundary>
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  )
}