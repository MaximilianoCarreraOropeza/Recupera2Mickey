import React, { useContext } from "react";
import {
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SingInPage from "../modules/auth/SingInPage";
import AuthContext from "../config/context/auth-context";
import AdminLayout from "../modules/admin/AdminLayout";
import UserLayout from "../modules/admin/users/UserLayout";
import User from "../modules/admin/users/User";
import Client from "../modules/admin/users/Client";
import Admin from "../modules/admin/users/Admin";

const AppRouter = () => {
  const { user } = useContext(AuthContext);
  const rol = localStorage.getItem("rol");
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/*
        {
          user.signed ? (
          <>
              <Route path='/' element={<AdminLayout/>}>
                <Route path='/admin' element={<AdminLayout/>}/>
              </Route>
              </>
            ) : (
              <Route path='/' element={<SingInPage/>} />
            )
        }
      */}
        {user.signed && rol == "ADMIN_ROLE" ? (
          <>
            <Route path="/" element={<AdminLayout />}>
              <Route path="admin" element={<Admin />} />
            </Route>
          </>
        ) : (
          <Route path="/" element={<SingInPage />} />
        )}
        <Route path="/" element={<>404 Not Found</>} />
        {user.signed && rol == "USER_ROLE" ? (
          <>
            <Route path="/" element={<AdminLayout />}>
              <Route path="user" element={<User />} />
            </Route>
          </>
        ) : (
          <Route path="/" element={<SingInPage />} />
        )}
        <Route path="/" element={<>404 Not Found</>} />
        {user.signed && rol == "CLIENT_ROLE" ? (
          <>
            <Route path="/" element={<AdminLayout />}>
              <Route path="client" element={<Client />} />
            </Route>
          </>
        ) : (
          <Route path="/" element={<SingInPage />} />
        )}
        <Route path="/" element={<>404 Not Found</>} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
