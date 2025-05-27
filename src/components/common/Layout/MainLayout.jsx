import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import CartDrawer from "@/components/cart/CartDrawer/CartDrawer"
import Modal from "../Modal/Modal"
import NotificationContainer from "../Notification/NotificationContainer"

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <Modal />
      <NotificationContainer />
    </div>
  )
}

export default MainLayout
