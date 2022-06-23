import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";


function StudyDeck(){

    const {deckID} = useParams();
        // console.log("StudyDeck deckID::: ", deckID);
    const [deck, setDeck] = useState(null);
    // const history = useHistory();

    useEffect(()=>{
        async function getDeck(){
            const response = await readDeck(deckID);
            setDeck(response)
                console.log("StudyDeck readDeck response::: ", response);
            // const allCards = deck.cards;
        }
        getDeck();
    },[deckID]);

        // console.log("StudyDeck deck::: ", deck);
        // console.log("StudyDeck deck.cards::: ", deck.cards);
        // console.log("StudyDeck deck.cards::: ", deck.cards);


    
    const [front, setFront] = useState(true);

    const handleFlip =(side)=>  setFront(!side) ;

    const StudyDeckNaviLink =()=>{
        return(
            <nav aria-label="breadcurmb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckID}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active">Study</li>
            </ol>
        </nav>
        )
    }

    function cardsAtaTime(){
            // if(allCards.length <3){
                // return <NotEnoughCards allCards={allCards} />
            // }
    }
    if(deck){
    return(
        <>
        < StudyDeckNaviLink />
        <h1>{`Study: ${deck.name}`}</h1>
        
        </>
    )
    }
    
    return null;
}

export default StudyDeck;