import { Outlet } from "react-router-dom"

import { Header } from "./Header"
import { ErrorBoundary } from "./ErrorBoundary"

export function Layout() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </>
  )
}