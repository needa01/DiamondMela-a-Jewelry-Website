import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Category from "./Components/Category";
import Catalogue from "./Components/Catalogue";
import SingleProduct from "./Components/SingleProduct";
import Compare from "./Components/Compare";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/Category" Component={Category} />
          <Route exact path="/" Component={Category} />
          <Route exact path="/products/:id?" Component={Catalogue} />
          <Route exact path="/product/:productID?" Component={SingleProduct}/>
          <Route exact path="/compare" Component={Compare}/>
          <Route exact path={"/products/:id?&:price?"} Component={Catalogue} />
          {/* <Route exact path="/Earrings" Component={Catalogue}/>
         <Route exact path="/Pendants" Component={Catalogue}/>
        <Route exact path="/Bangles" Component={Catalogue}/>
        <Route exact path="/Rings" Component={Catalogue}/>
        <Route exact path="/Bracelets" Component={Catalogue}/>
        <Route exact path="/Pendants & Sets" Component={Catalogue}/>
        <Route exact path="/Nosepin" Component={Catalogue}/>
        <Route exact path="/Necklace" Component={Catalogue}/>
        <Route exact path="/Bands" Component={Catalogue}/> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
