import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import AddCardForm from "./AddCardForm";

function AddCard(){

    const {deckID} = useParams();
        // console.log("AddCard deckID:: ", deckID);
    
    const [deck, setDeck] = useState(null);

    useEffect(()=>{
        async function getDeck(){
            const response = await readDeck(deckID);
            setDeck(response);
        }
        getDeck();
    },[deckID]);


    if(deck){
        const StudyDeckNaviLink =()=>{
            return(
                <nav aria-label="breadcurmb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckID}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active">Add Card</li>
                    </ol>
                </nav>
                )
            }

        return(
            <>
                <StudyDeckNaviLink />
                <h1>{`${deck.name}: Add Card`}</h1>
                <AddCardForm deck={deck} />
            </>
        )
    }
    return null;
}
export default AddCard;