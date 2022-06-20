import React from "react";
import CreateDeckForm from "./../CreateDeck/CreateDeckForm";
import NaviLink from "./../CreateDeck/NaviLink";

function CreateDeck(){
    return(
        <div>
            <NaviLink />
            <h1>Create Deck</h1>
            <CreateDeckForm />
        </div>
    )
}

export default CreateDeck;