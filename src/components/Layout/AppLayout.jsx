import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

function AppLayout({children}) {
    return (
        <div className=" appLayout flex flex-col min-h-screen">
          <NavBar />
          <main className=" flex-grow">{children}</main>
          <Footer />
        </div>
      );
}

export default AppLayout;
