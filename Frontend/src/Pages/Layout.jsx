import Header from '../Components/Home/Header'
import Footer from '../Components/Home/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../Components/ScrollToTop'
// import LiveActivityFeed from '@/Components/Rocket/LiveActivityFeed'
// import CTASection from '@/Components/Rocket/CTASection'
function Layout() {
    return (
        <div>
            <ScrollToTop />
            <Header />
         
            <Outlet />
              {/* <LiveActivityFeed/> */}
              {/* <CTASection/> */}
            <Footer />
         
        </div>
    )
}

export default Layout
