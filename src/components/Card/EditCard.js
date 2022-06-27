import React, { useEffect, useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api";
import AddCardForm from "./AddCardForm";
// import EditCardForm from "./EditCardForm";


function EditCard(){

    const [deck, setDeck]=useState(null);
    const {path, url} = useRouteMatch();
    console.log("EditCard :: url", url, ' path:::', path);

    const {deckID, cardId} = useParams();
    console.log("EditCard useParams deckID::::",deckID, ': cardId:: ', cardId);

    const abort = new AbortController();
    useEffect(() => {
        readDeck(deckID,abort.signal).then(setDeck);
      }, [deckID]);

      console.log("EditCard readDeck deck::::",deck);

    if (deck){
    const EditCardNaviLink = ()=>{
        return(
            <nav aria-label="breadcurmb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckID}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item">Edit Card {cardId}</li>
            </ol>
        </nav>
        )
    }

    return(
        <>
            <EditCardNaviLink />
            <h1>Edit Card</h1>
            {/* <EditCardForm deck={deck} /> */}
            <AddCardForm deck={deck}/>
        </>
    )
}
return null;
}

export default EditCard;