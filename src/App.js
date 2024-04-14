import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  const [region, setRegion] = useState("Africa");
  const getRegion = () => {
    return region;
  };

  return (
    <BrowserRouter>
      <div className={classes.App}>
      <Header region={region} setRegion={setRegion} />
        <Routes> 
          <Route path="/" element={<Homepage region={region} />} />
        </Routes>
        {/* <Route path="/coins/:id" component={CoinPage} exact /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
