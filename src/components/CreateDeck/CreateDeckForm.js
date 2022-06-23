import React, { useEffect, useState } from "react";
import {useHistory, useLocation} from "react-router-dom";
import { createDeck, listDecks, updateDeck } from "../../utils/api";

function CreateDeckForm({deck}){
    const {pathname}= useLocation();
        // console.log('CreateDeckForm pathname:', pathname);
        // console.log('CreateDeckForm initial deck:', deck);
    const history = useHistory();
    
    const [editFlag, setEditFlag] = useState(true);
    const [name, setName]=useState({"name":""});
    const [description, setDecription] = useState({"description":""});

    useEffect(()=>{
        function editflag(){
            if(pathname.includes("edit")){
                setName({"name":deck.name});
                setDecription({"description":deck.description});
            }
            else{
                setEditFlag(false);
            }
        }
        editflag();
    },[deck, pathname]);
    

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

    async function handleUpdate(){
        try{
            await updateDeck({"id":deck.id, ...name, ...description});
            history.push(`/decks/${deck.id}`);
        }
        catch(e){
            console.log("CreadeDeckForm UpdateDeck Error: ", e);
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
                onClick={editFlag ? handleUpdate : handleCreate}>Submit</button>
            </form>
        </div>
    );
}

export default CreateDeckForm;