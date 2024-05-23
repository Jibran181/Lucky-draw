import React from "react";
import Navbar from "./components/navbar";
import Main from "./components/main";
import Roadmap from "./components/roadmap";
function App() {
  return (
      <div className="bg-[url('./assets/full-bg.jpg')] font-bod">
          
        {/* [#0f172a] bg-[url('./assets/bg-image.png')] w-full h-screen  ...*/}
        <Navbar />

        <Main />

        <Roadmap />
        
      </div>
  )
}

export default App
