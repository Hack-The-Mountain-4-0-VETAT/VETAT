import { React } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Provider } from "react-redux"
import Store from "./redux/store";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Orders from "./components/Orders";
import BuyForm from "./components/BuyForm";
import Navbar from "./components/navbar";
import SimBottomNavigation from "./components/bottomNav";
import ShowHideBottomNav from "./components/showHideBottomNav";
import Profile from "./screens/Profile";
function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Signup />} />
          <Route exact path='/main' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/orders' element={<Orders />} />
          <Route exact path='/form' element={<BuyForm />} />
        </Routes>
        <ShowHideBottomNav>
          <SimBottomNavigation />
        </ShowHideBottomNav>
      </Router>
    </Provider>
  );
}
export default App;
