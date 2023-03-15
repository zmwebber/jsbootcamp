import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './features/shared/ErrorPage';
import { RegistrationPage } from './features/userManagement/RegistrationPage';
import { HomePage } from './features/homePage/HomePage';
import { LoginPage } from './features/userManagement/LoginPage';
import { ProfilePage } from './features/profile/ProfilePage';
import { UserManagementPage } from './features/userManagement/UserManagementPage';

const container = document.getElementById('root')!;
const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: "",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
      {
        path: "/users",
        element: <UserManagementPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
