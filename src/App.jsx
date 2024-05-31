import React from "react";
import Navbar from "./components/navbar";
import Main from "./components/main";
import Roadmap from "./components/roadmap";
import { Web3Provider } from "./components/web3context";

function App() {
  return (
    <div className="bg-[url('./assets/full-bg.jpg')] font-bod">
      {/* [#0f172a] bg-[url('./assets/bg-image.png')] w-full h-screen  ...*/}
      <Web3Provider>
        <Navbar />

        <Main />

        <Roadmap />
      </Web3Provider>
    </div>
  );
}

export default App;
