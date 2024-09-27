import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Main = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer>Allright Reserve</footer>
    </div>
  );
};

export default Main;
