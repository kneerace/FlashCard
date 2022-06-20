import React, {useState, UseEffect, useEffect} from "react";
import {listDecks} from "./../utils/api/index";

function RenderDecks(){
    // setting up deck, default as blank Array
    const [decks, setDecks]=useState([]);

    useEffect(()=>{
        async function fetchDecks() {
            const response = await listDecks();
            setDecks(response);
        }
        fetchDecks();
    },[]);
    console.log(decks);

    const deckList = decks.map((deck)=>{
        const cards = deck.cards;

        return(
            <div className="col-sm-6" key={deck.id}>
                <div className="card">
                    <div className="card-body d-flex justify-content-between">
                        {/* deck title */}
                        <h4 className="card-title">{deck.name}</h4>
                        {/* cards number in a deck */}
                        <p>{`${cards.length} cards`}</p>
                    </div>
                    {/*  deck description */}
                    <p className="card-text">{deck.description}</p>
                </div>
            </div>
        )
    })
   
   return(
    <div className="row">
        {deckList}
    </div>
   );
}

export default RenderDecks;