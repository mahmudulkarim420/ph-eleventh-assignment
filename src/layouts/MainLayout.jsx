import { Outlet } from 'react-router';
import Navbar from '../components/Shared/Navbar/Navbar';
import Footer from '../components/Shared/Footer/Footer';

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-screen bg-[#004643] text-white">
      <Navbar />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
