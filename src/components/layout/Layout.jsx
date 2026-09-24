import { Outlet, useLocation } from 'react-router-dom'
import { Component as KineticNavbar } from '../ui/sterling-gate-kinetic-navigation'
import Footer from './Footer'

const Layout = ({ children }) => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col w-full">
      <KineticNavbar />
      <main className="flex-grow w-full">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
