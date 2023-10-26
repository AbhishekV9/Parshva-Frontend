import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import FileUpload from "./components/fileUpload";
import FormDetails from "./components/formDetails";
import FormFill from "./components/form";
import Layout from "./components/layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route path="/" element={<FormDetails />} />
            <Route path="fileupload" element={<FileUpload />} />
            <Route path="form" element={<FormFill />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
