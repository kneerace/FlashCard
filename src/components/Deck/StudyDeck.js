import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import StudyCards from "../Card/StudyCards";


function StudyDeck(){

    const {deckID} = useParams();
        // console.log("StudyDeck deckID::: ", deckID);
    const [deck, setDeck] = useState(null);
    // const history = useHistory();

    useEffect(()=>{
        async function getDeck(){
            try{
            const response = await readDeck(deckID);
            setDeck(response)
                // console.log("StudyDeck readDeck response::: ", response);
            // const allCards = deck.cards;
        }
        catch(e){ console.log("StudyDeck GetDeck Error:: ", e)}
    }
        getDeck();
    },[deckID]);    

    if(deck){
        
        const StudyDeckNaviLink =({deck})=>{
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
    
    return(
        <>
        < StudyDeckNaviLink deck={deck}/>
        <h1>{`Study: ${deck.name}`}</h1>
        <StudyCards deck={deck} />
        </>
    )
    }
    
    return null;
}

export default StudyDeck;