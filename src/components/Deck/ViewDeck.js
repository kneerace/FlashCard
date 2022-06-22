import React,{useState, useEffect} from "react";
import {Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { deleteDeck, readDeck } from "../../utils/api";
import DisplayCards from "../Card/DisplayCards";

function ViewDeck(){
    const {deckID} = useParams();
    // console.log("ViewDeck deckID: ", deckID);
    const history = useHistory();
    const {url, path} = useRouteMatch();

    const [deck, setDeck] = useState(null);

    // const abort = new AbortController();
    // //Fetching Decks
    useEffect(() => {
        async function getDeck() {
            try{
          const response = await readDeck(deckID);
          setDeck(response);
        //   console.log('Inside getDeck response: ', response)
            }catch(e){
                console.log("getDeck Error: ", e)
            }
        }
        getDeck();
    
        }, [deckID]);

    const deleteDeckHandler =(event)=>{
        if(window.confirm(`Are you sure to delete this Deck? \n\nYou will not be able to recover it.`)){
            deleteDeck(deckID);
            console.log(deckID);
            history.go(0);
        }
        
    }

    if(deck){
    return(
        <>
            <div className="col-sm-12 p-0">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{deck.name}</h5>
                        <p className="card-text">{deck.description}</p>
                        <div className="d-flex justify-content-between">
                            <div>
                                <Link to="" className="btn btn-secondary mr-1">Edit</Link>
                                <Link to="" className="btn btn-primary mr-1">Study</Link>
                                <Link to="" className="btn btn-primary mr-1"><span style={{fontSize:18}}><strong>+</strong> </span>Add Cards</Link>
                            </div>
                            <div>
                                <button className="btn btn-danger" onClick={deleteDeckHandler}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h1>Cards</h1>
            </div>
            <DisplayCards deckID={deckID} />
            
        </>
    )
}
return null;
}


export default ViewDeck;