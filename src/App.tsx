import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";

function App() {
  return (
    <div className="flex-1 min-h-screen">
      <Navigation />
      <Home />
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
