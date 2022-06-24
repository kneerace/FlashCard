import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readCard, updateCard } from "../../utils/api";

function AddCardForm({deck}){

        // console.log("AddCardForm deck::prop:: ",deck);
    const history = useHistory();
    const {deckID, cardId} = useParams();
    
    const [front, setFront] = useState({"front":""})
    const [back, setBack] = useState({"back":""});

    const abort = new AbortController()
    useEffect(()=> {
        async function fetchCard(){
            const response = await readCard(cardId,abort.signal);
            console.log('EditCardForm readCard response:::', response)
            setFront({"front":response.front});
            setBack({"back":response.back});
        }
        fetchCard()
    },[cardId]);

    const handleFront = (event) =>{
        event.preventDefault();
        setFront({"front":event.target.value});
        // console.log("handleFront:::::", event.target.value)
    }

    const handleBack = (event) =>{
        setBack({"back":event.target.value});

    }

    // const handleUpdate = () =>{
    //     console.log("EditCardForm handleSubmit::::", cardId, '::::', deckID, front, back)
    //     updateCard({"id": cardId, "deckId":deckID, ...front, ...back});
    //     history.push(`/decks/${deckID}`);
        
    // }
    console.log('front', front);
    console.log('back', back);

     function handleUpdate(){
       updateCard({"id":cardId, "deckId":parseInt(deckID), ...front, ...back})
       .then(history.push(`/decks/${deckID}`))
       .catch((e)=> console.log("EditCardForm UpdateCard Error: ", e));
    }



    const handleCancel = () =>{
        history.push(`/decks/${deckID}`);
    }


    return(
        <>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea className="form-control" id='front' rows="3" placeholder="Front side of card"
                        value={front.front} onChange={handleFront}></textarea>
                </div>
                <div className="form-group">
                <label htmlFor="back">Back</label>
                    <textarea className="form-control" id='back' rows="3" placeholder="Back side of card"
                        value={back.back} onChange={handleBack}></textarea>
                </div>
                <button className="btn btn-secondary mr-1" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default AddCardForm;