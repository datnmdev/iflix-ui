import { Outlet } from 'react-router-dom'

import HeaderAdmin from '../components/HeaderAdmin'
import Footer from '../components/Footer'

export default function AdminLayout() {
  return (
    <div>
      <HeaderAdmin />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}