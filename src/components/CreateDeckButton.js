import React from "react";
import {Link} from "react-router-dom";

function CreateDeckButton(){
    return(
        <div className="row">
            <div className="col-sm-6 mb-2"> 
                <Link to="/decks/new" className="btn btn-secondary text-center">
                 <span style={{fontSize:25}}><strong>+</strong> </span>Create Deck</Link>
            </div>
        </div>
    )
}

export default CreateDeckButton;