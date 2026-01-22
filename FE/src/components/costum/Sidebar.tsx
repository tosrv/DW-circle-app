import { useAuth } from "@/hooks/useAuth";
import { CircleUser, Heart, House, LogOutIcon, Search } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  onCreatePost: () => void;
};

const menu = [
  { icon: <House />, label: "Home" },
  { icon: <Search />, label: "Search" },
  { icon: <Heart />, label: "Follows" },
  { icon: <CircleUser />, label: "Profile" },
];

export default function Sidebar({onCreatePost}: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex flex-col items-start justify-between h-screen py-6 px-4 mx-0">
      <section className="space-y-5 w-full p-2">
        <h1 className="text-5xl font-bold text-green-500">Circle</h1>
        <ul className="space-y-3">
          {menu.map((item, index) => (
            <li key={index}>
              <Button className="border-0 bg-transparent hover:bg-transparent hover:text-white text-gray-500 hover:cursor-pointer">
                {item.icon}
                <span className="text-xl">{item.label}</span>
              </Button>
            </li>
          ))}
        </ul>
        <Button
          onClick={onCreatePost}
          className="h-10 font-semibold bg-green-500 text-white hover:text-black w-full rounded-2xl text-xl"
        >
          Create post
        </Button>
      </section>

      <Button
        onClick={handleLogout}
        className="border-0 bg-transparent hover:bg-transparent text-gray-500 hover:text-white hover:cursor-pointer"
      >
        <LogOutIcon />
        <span className="text-xl">Logout</span>
      </Button>
    </div>
  );
}
