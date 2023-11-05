import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function UserLayout() {
  return (
    <div
      className='relative'
    >
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}