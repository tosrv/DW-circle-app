import Home from "@/components/costum/Home";
import Profile from "@/components/costum/Profile";
import Sidebar from "@/components/costum/Sidebar";

export default function Dashboard() {
  return (
    <>
      <div className="flex">
        <nav className="w-2/10 flex flex-col">
          <Sidebar />
        </nav>
        <main className="w-5/10 flex flex-col">
          <Home />
        </main>
        <aside className="w-3/10 flex flex-col">
          <Profile />
        </aside>
      </div>
    </>
  );
}
