import React from "react";
import CreateDeckButton from "./../components/CreateDeckButton";
import RenderDecks from "./../components/RenderDecks";

function Home({decks}){
    return(
        <div className="container">
      <CreateDeckButton />
      <RenderDecks decks={decks}/>
    </div>
    )
}

export default Home;