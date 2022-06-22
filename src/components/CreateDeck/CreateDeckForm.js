import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import { createDeck, listDecks } from "../../utils/api";

function CreateDeckForm({decks}){
    const history = useHistory();
    const [name, setName]=useState({"name":""});
    const [description, setDecription] = useState({"description":""});

    const handleName = (event)=>{
        setName({...name, "name": event.target.value});
    }

    const handleDecription = (event)=>{
        setDecription({...description, "description": event.target.value});

    }

    const handleCancel =(event)=>{
        event.preventDefault();
        history.goBack();
    }

    async function handleCreate(){
        try{
        await createDeck({...name, ...description});
        const response = await listDecks();
        // console.log("CreateDeckForm response: ", response);
        const latestDeckId = Math.max(...response.map(deck => deck.id));
        // console.log('latestDeckID: ', latestDeckId);
        history.push(`/decks/${latestDeckId}`);
        // history.push("/");
        // console.log("handle Submit -----------")
        } catch(error){
            console.log('CreateDeckFormError: ', error);
        }
    }

    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" value={name.name||""}
                    placeholder="Deck Name" onChange={handleName} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" row="5" value={description.description||""}
                    placeholder="Brief description of the deck" onChange={handleDecription} />
                </div>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                <button type="button" className="btn btn-primary ml-1"
                onClick={handleCreate}>Submit</button>
            </form>
        </div>
    );
}

export default CreateDeckForm;