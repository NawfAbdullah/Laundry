// import Logo from './assets/images/logo.png'
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./pages/TotalRoutes";
import { UserProvider } from "./utils/UserContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter forceRefresh={true}>
            <AnimatedRoutes />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
