import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="app">
            <AppHeader />

            <main className="main-content">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;