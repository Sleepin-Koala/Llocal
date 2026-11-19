// App.tsx
import { Sidebar } from "./components/layouts/Sidebar";
import { TopBar } from "./components/layouts/Topbar";
import { PlayerBar } from "./components/layouts/Playerbar";
import { createBrowserRouter, Navigate, RouterProvider, Outlet, useNavigate } from "react-router"
import Home from "./views/home/HomeView";
import Library from "./views/library/LibraryView";
import { useState } from "react";
import { CoreStore } from "./stores/core";
import { FirstTimeView } from "./views/FirstTimeView";

export enum NavigationPath {
  home = "/home",
  Library = "/library",
  playsists = "/playlists",
  analytics = "/analytics",
  settings = "/settings"
}





function FirstView(){
  const is_first_launch = CoreStore((s)=>s.first_launch)
  if (is_first_launch) return <FirstTimeView/>
  return <Navigate to="/home" replace />
}







const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <FirstView/>,
      },
      {
        path: NavigationPath.home,
        Component: Home
      },
      {
        path: NavigationPath.Library,
        Component: Library
      }
    ]
  }
])

function AppLayout() {
  const [path, setPath] = useState<NavigationPath>(NavigationPath.home)

  const navigate = useNavigate();

  const handleNavigation = (targetPath: NavigationPath) => {
    setPath(targetPath); 
    navigate(targetPath);      
  };

  return (
    <div className="grid grid-cols-[var(--layout-sidebar-width)_minmax(0,1fr)] grid-rows-[minmax(0,1fr)_var(--layout-player-height)] h-screen bg-(--color-bg)">
      <div className="col-start-1 row-start-1">
        <Sidebar currentPath={path} navigation={handleNavigation} />
      </div>

      {/* Main Container */}
      <div className="col-start-2 row-start-1 flex flex-col min-h-0 min-w-0">
        <TopBar />
        <main className="flex-1 min-h-0 overflow-y-auto px-(--layout-gutter) scrollbar-gutter-stable">
          <Outlet />
        </main>
      </div>

      {/* Player Bar */}
      <div className="col-span-full row-start-2">
        <PlayerBar />
      </div>
    </div>
  );
}

// 3. Votre point d'entrée App se contente d'injecter le routeur
export default function App() {
  return <RouterProvider router={router} />;
}
