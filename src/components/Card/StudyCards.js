import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NotEnoughCards from "./NotEnoughCards";

function StudyCards({deck}){

    const history = useHistory();

    const [cardNo, setCardNo]=useState(0);
    const [face, setFace] = useState(true);

    const allCards = deck.cards;
        // console.log("StudyCards allCards:::", allCards.length, ': ', allCards) ;

    const handleFlip =()=>{
        setFace(!face);
    }

    const handleNext =()=>{
        setCardNo(cardNo +1);
        setFace(true);
        if(cardNo === allCards.length -1){
            return window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.") ? setCardNo(0) : history.push("/");
        }
    }

    if(allCards.length <3){
        return <NotEnoughCards cardNum={allCards.length}/>
    }


    return(
        <div className="row py-2">
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Card {cardNo +1} of {allCards.length}</h5>
                        <p className="card-text">{face ? allCards[cardNo].front : allCards[cardNo].back}</p>
                        <button className="btn btn-secondary mx-2" onClick={handleFlip}>Flip</button>
                        {!face ? <button className="btn btn-primary" onClick={handleNext}>Next</button>:null}
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default StudyCards;