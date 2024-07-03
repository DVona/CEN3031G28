import "./App.css";
import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";

function App() {
  return (
    <div className="App">
      <Route path = '/Login' component={LoginPage} />
      <Route path = '/Register' component={RegistrationPage} />
    </div>
  );
}

export default App;
