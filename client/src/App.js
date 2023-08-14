import { Fragment, useState } from "react";
import DataProvider from "./context/DataProvider";
/*Which components should have routes should be wrapped in Routes.
For providing the url we should use Route
 */
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
/*Importing the components */
import Login from "./components/account/login";
import Home from "./components/home/home";
import Header from "./components/Headers/header";
import CreatePost from "./components/create/CreatePost";
import DetailView from "./components/DetailView/DetailView";
import UpdateBlog from "./components/create/updateBlog";

/*Creating private Route for checking whehter user is logged in,
If logged in then show all the components, else show only the login
 */
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <Fragment>
      <Header></Header>
      <Outlet></Outlet>
    </Fragment>
  ) : (
    <Navigate replace to="/login"></Navigate>
  );
};
function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <div className="App">
      {/*Wrapping the components which required data exported from 
      dataProvider */}
      <DataProvider>
        {/*Enabling routing in application using BrowserRouter */}
        <BrowserRouter>
          {/*Wrapping components which requre routing in the Routes */}
          <div style={{ marginTop: 60 }}>
            <Routes>
              {/*Adding routing url and respective component*/}
              <Route
                path="/login"
                element={
                  <Login isUserAuthenticated={isUserAuthenticated}></Login>
                }
              ></Route>
              <Route
                path="/"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path="/" element={<Home></Home>}></Route>
              </Route>
              <Route
                path="/create"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route
                  path="/create"
                  element={<CreatePost></CreatePost>}
                ></Route>
              </Route>
              <Route
                path="/details/:id"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route
                  path="/details/:id"
                  element={<DetailView></DetailView>}
                ></Route>
              </Route>
              <Route
                path="/update/:id"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route
                  path="/update/:id"
                  element={<UpdateBlog></UpdateBlog>}
                ></Route>
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
