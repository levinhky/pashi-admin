import React, {Fragment} from 'react';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import Loading from "./components/Loading/Loading";
import routes from "./configs/routes";

function App() {
  return (
      <React.Suspense fallback={<Loading />} >
        <Routes>
          {routes.map((route, index) => {
            const Layout = route.layout === null ? Fragment : DefaultLayout;
            return (
                <Route
                    key={index}
                    path={route.path}
                    element={<Layout>{route.element}</Layout>}
                /> 
            )
          })}
        </Routes>
        <ToastContainer />
      </React.Suspense>
  );
}

export default App;
