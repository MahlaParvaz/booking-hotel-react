import Footer from '../ui/Footer';
import NavBar from '../ui/NavBar';
import AuthContextProvider from '../features/authentication/AuthProvider';

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
