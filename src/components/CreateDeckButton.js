import React from "react";
import {Link} from "react-router-dom";

function CreateDeckButton(){
    return(
        <div className="row">
            <div className="">
                <Link to="/decks/new" className="btn btn-secondary text-center">
                 <span style={{fontSize:25}}><strong>+</strong> </span>Create Deck</Link>
            </div>
        </div>
    )
}

export default CreateDeckButton;