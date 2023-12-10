import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import store from './store/index';
import App from './App';
import './index.module.scss';

const RoutesLayout = React.lazy(() => import('./Routs/RoutesLayout'));
const User = React.lazy(() => import('./pages/User'));
const Post = React.lazy(() => import('./pages/Post'));
const MainJoke = React.lazy(() => import('./pages/MainJoke'));
const Form = React.lazy(() => import('./components/form/Form'));
const TopTenJokes = React.lazy(() => import('./pages/TopTenJokes'));
const AllJokes = React.lazy(() => import('./pages/AllJokes'));
const Joke = React.lazy(() => import('./pages/Jokes'));
const Policies = React.lazy(() => import('./pages/PrivacyAndPolicy'));
const Account = React.lazy(() => import('./pages/AccountCreation'));
const Registration = React.lazy(() => import('./pages/Registration'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RoutesLayout />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: '/',
            element: <MainJoke />,
            children: [
              {
                path: '/',
                element: <Form />,
                children: [{ children: [{ path: '/:id', element: <Post /> }] }],
              },
            ],
          },

          { path: '/top-10', element: <TopTenJokes /> },
          { path: '/all-posts', element: <AllJokes /> },
          { path: '/posts', element: <Joke /> },
          {
            path: '/profile',
            element: <User />,
          },
          { path: '/profile/create-account', element: <Account /> },
          { path: '/profile/conect', element: <Registration /> },

          { path: '/cookie and policies', element: <Policies /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
