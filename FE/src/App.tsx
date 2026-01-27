import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Threads from "@/pages/Threads";
import ThreadDetail from "@/components/thread/ThreadDetail";
import Profile from "@/pages/Profile";

import PrivateRoute from "@/layouts/PrivateRoutes";
import Dashboard from "@/layouts/Dashboard";
import Follows from "./pages/Follows";
import Search from "./pages/Search";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<Dashboard />}>
              <Route path="/" element={<Threads />} />
              <Route path="/thread/:id" element={<ThreadDetail />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/follows" element={<Follows />} />
              <Route path="/search" element={<Search />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
