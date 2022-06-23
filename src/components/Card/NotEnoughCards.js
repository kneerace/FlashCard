import React from "react";
import { useHistory, useParams } from "react-router-dom";

function NotEnoughCards({cardNum}){

    const {deckID} = useParams();
    const history = useHistory();

    return(
        <>
        <h3>Not enough cards.</h3>
        <p>You need at least 3 cards to study. There are {cardNum} cards in this deck.</p>
        <button className="btn btn-primary" onClick={()=>history.push(`/decks/${deckID}/cards/new`)}><strong>+</strong> Add Cards</button>
        </>
    )
}

export default NotEnoughCards;