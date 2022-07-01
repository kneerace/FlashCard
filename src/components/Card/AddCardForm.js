import React, { useState,useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { createCard, readCard, updateCard } from "../../utils/api";

function AddCardForm({deck}){

        // console.log("AddCardForm deck::prop:: ",deck);
    const history = useHistory();
    const {deckID, cardId} = useParams();
    const {pathname} = useLocation();

    const [front, setFront] = useState({"front":""})
    const [back, setBack] = useState({"back":""});
    const [isEdit, setIsEdit] = useState(false);

    useEffect(()=> {
        async function fetchCard(){
            const response = await readCard(cardId);
            // console.log('EditCardForm readCard response:::', response)
            setFront({"front":response.front});
            setBack({"back":response.back});
        }
        function editAdd(){
            if(pathname.includes("edit")){
                setIsEdit(true);
                fetchCard();
            }
        }
        editAdd();
    },[cardId,pathname]);

        // console.log("AddCardform  isEdit::::", isEdit);

    const handleFront = (event) =>{
        event.preventDefault();
        setFront({"front":event.target.value});
    }

    const handleBack = (event) =>{
        setBack({"back":event.target.value});

    }

    const handleSave = () =>{
        createCard(deckID, {...front, ...back});
        setFront({"front":""})
        setBack({"back":""})
    }

    const handleCancelDone = () =>{
        history.push(`/decks/${deckID}`);
    }

    function handleUpdate(){
        updateCard({"id":cardId, "deckId":parseInt(deckID), ...front, ...back})
        .then(history.push(`/decks/${deckID}`))
        .catch((e)=> console.log("EditCardForm UpdateCard Error: ", e));
     }

    return(
        <>
            <form>
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
                <button className="btn btn-secondary mr-1" onClick={handleCancelDone}>{isEdit ? "Cancel" : "Done"}</button>
                <button className="btn btn-primary" onClick={isEdit ? handleUpdate : handleSave}>{isEdit ? "Submit" : "Save"}</button>
            </form>
        </>
    )
}

export default AddCardForm;