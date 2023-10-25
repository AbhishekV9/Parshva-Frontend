import Navbar from "./navBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <div>
      <ToastContainer />
      <div>
        <Navbar />
      </div>
      <div
        style={{
          marginTop: "70px",
          height: "88vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
