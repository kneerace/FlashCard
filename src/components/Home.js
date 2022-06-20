import React from "react";
import CreateDeckButton from "./../components/CreateDeckButton";
import RenderDecks from "./../components/RenderDecks";

function Home(){
    return(
        <div className="container">
      <CreateDeckButton />
      <RenderDecks />
    </div>
    )
}

export default Home;