import React from "react";
import CreateDeckForm from "./CreateDeckForm";
import NaviLink from "./NaviLink";


function CreateDeck({decks}){
        return(
           <div>
            <NaviLink />
            <h1>Create Deck</h1>
            <CreateDeckForm decks={decks}/>
           </div>
        )
    }
    
export default CreateDeck;