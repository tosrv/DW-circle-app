import { Outlet } from "react-router-dom";
import Menu from "@/layouts/Menu";
import Navbar from "@/layouts/Navbar";
import { ThreadProvider } from "@/context/ThreadProvider";
import { ProfileProvider } from "@/context/ProfileProvider";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <ProfileProvider>
      <ThreadProvider>
        <div className="flex justify-center w-full">
          <div
            className="grid gap-6
          grid-cols-1
          sm:grid-cols-[280px_minmax(600px,1fr)_300px] 
          lg:grid-cols-[380px_minmax(600px,890px)_550px] w-fit"
          >
            {/* Left Sidebar */}
            <aside className="sticky top-0 h-screen hidden sm:block">
              <Menu />
            </aside>

            {/* Main Content */}
            <main className="flex flex-col border-x-2 w-full max-w-[890px] mx-auto">
              <Navbar />
              <Outlet />
            </main>

            {/* Right Sidebar */}
            <aside className="sticky top-0 h-screen p-5 space-y-5 hidden lg:block">
              <Sidebar />
            </aside>
          </div>
        </div>
      </ThreadProvider>
    </ProfileProvider>
  );
}
