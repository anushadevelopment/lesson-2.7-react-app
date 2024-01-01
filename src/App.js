import Product from "./components/Product";
import { ProductProvider } from "./context/ProductContext";
import { ModeProvider } from "./context/ModeContext";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import UserBar from "./components/UserBar";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <UserBar />
        <ModeProvider>
          <ProductProvider>
            <Product />
          </ProductProvider>
        </ModeProvider>
      </UserProvider>
    </div>
  );
}

export default App;
