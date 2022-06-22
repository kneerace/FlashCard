import React from "react";
import { Link, useParams } from "react-router-dom";

function EditDeck(){

    const {deckID} = useParams();
    console.log(deckID);

    const EditDeckNaviLink =()=>{
        return(
            <nav aria-label="breadcurmb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item">Deckname</li>
            </ol>
        </nav>
        )
    }
    return(
        <>
            <EditDeckNaviLink />
            <h1>Edit Deck</h1>
         </>
    )
}

export default EditDeck;