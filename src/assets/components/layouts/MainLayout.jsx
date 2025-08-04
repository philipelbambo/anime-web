import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "../pages/header";
import SideMenu from "../pages/Sidemenu";
import LoadingPage from "../pages/LoadingPage";

const MainLayout = () => {

    return (
        <div className="flex h-screen w-full overflow-x-hidden">
            <SideMenu />
            <div className="h-full w-screen">
                <Header />
                <div className="h-full w-full">
                    <Suspense fallback={<LoadingPage />}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
