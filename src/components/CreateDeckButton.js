import React from "react";
import {Link} from "react-router-dom";

function CreateDeckButton(){
    return(
        <div className="row">
            <div className="">
                <Link to="/decks/new" className="btn btn-secondary">
                    <strong>+ Create Deck</strong></Link>
            </div>
        </div>
    )
}

export default CreateDeckButton;