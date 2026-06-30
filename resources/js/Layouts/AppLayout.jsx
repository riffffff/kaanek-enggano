import Footer from '../Components/Footer'
import FloatingWA from '../Components/FloatingWA'
import Navbar from '../Components/Navbar'

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface-50 text-neutral-800">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingWA />
    </div>
  )
}
