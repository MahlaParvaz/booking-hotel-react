import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import AuthContextProvider from '../context/AuthProvider';

function AppLayout({ children }) {
  return (
    <div className=" appLayout flex flex-col min-h-screen">
      <AuthContextProvider>
        <NavBar />
        <main className=" flex-grow">{children}</main>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}

export default AppLayout;
