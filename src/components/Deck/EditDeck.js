import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CreateDeckForm from "../CreateDeck/CreateDeckForm";

function EditDeck(){

    const [deck, setDeck]= useState(null);
    const {deckID} = useParams();
    useEffect(()=>{
        
        async function getDeck(){
           
            try{
            const response = await readDeck(deckID);
            setDeck(response);
                // console.log('EditDeck deck::::', deck);
            }
            catch(e){ console.log('EditDeck getDeck error:: ', e);
            }
        }
        getDeck();
    },[deckID]);

        // console.log('EditDeck deck_outside::::', deck);

    const EditDeckNaviLink =()=>{
        return(
            <nav aria-label="breadcurmb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item">{deck.name}</li>
            </ol>
        </nav>
        )
    }
    if(deck){
    return(
        <>
            <EditDeckNaviLink />
            <h1>Edit Deck</h1>
            <CreateDeckForm deck={deck}/>
         </>
    )
}
return null;
}

export default EditDeck;