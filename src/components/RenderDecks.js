import React, {useState, UseEffect, useEffect} from "react";
import {Link} from "react-router-dom";
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
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            {/* deck title */}
                            <h4 className="card-title">{deck.name}</h4>
                            {/* cards number in a deck */}
                            <p>{`${cards.length} cards`}</p>
                        </div>
                        {/*  deck description */}
                        <p className="card-text">{deck.description}</p>
                        <div className="d-flex justify-content-between">
                            <div>
                                <Link to={`decks/${deck.id}`} className='btn btn-secondary'>View</Link>
                                <Link to={`decks/${deck.id}/study`} className='btn btn-primary'>Study</Link>
                            </div>
                            <div>
                                <button className='btn btn-danger'>Delete</button>
                            </div>
                        </div>
                    </div>
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