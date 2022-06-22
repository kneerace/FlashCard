import React from "react";
import {Link, useHistory} from "react-router-dom";
import {deleteDeck} from "./../utils/api/index";


function RenderDecks({decks}){
    // // setting up deck, default as blank Array
    // const [decks, setDecks] = useState([]);
    const history = useHistory();

    // console.log("RenderDecks", decks)

    // const abort = new AbortController;
    // //Fetching Decks
    // useEffect(()=>{
    //     async function fetchDecks() {
    //         try{
    //             const response = await listDecks(abort.signal);
    //             await setDecks(response);
    //             console.log("RenderDeck response: ", response)
    //         }catch(err){
    //             console.log('Error: ', err); //-------TODO 
    //         }
    //             }
    //     fetchDecks();
    // }, []);

    // console.log(decks);

    // Mapping each deck from the response
    const deckList = decks.map((deck)=>{
        const cards = deck.cards;
    
        const deleteHandler = (event)=>{
            event.preventDefault();
            if(window.confirm(`Are you sure to delete this Deck? \n\nYou will not be able to recover it.`)){
                deleteDeck(deck.id);
                
                const newDeck = decks.filter((deckitem)=> deckitem.id !== deck.id);
                // console.log('newDeck', newDeck);
                // setDecks(newDeck);
            }
            history.go(0);
        }

        return(
            <div className="col-sm-6" key={deck.id}>
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            {/* deck title */}
                            <h5 className="card-title">{deck.name}</h5>
                            {/* cards number in a deck */}
                            <p>{`${cards.length} cards`}</p>
                        </div>
                        {/*  deck description */}
                        <p className="card-text">{deck.description}</p>
                        <div className="d-flex justify-content-between">
                            <div>
                                <Link to={`decks/${deck.id}`} className='btn btn-secondary'>View</Link>
                                <Link to={`decks/${deck.id}/study`} className='btn btn-primary ml-1'>Study</Link>
                            </div>
                            <div>
                                <button className='btn btn-danger' onClick={deleteHandler}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
   
   return(
    <div className="row">
        {deckList}
    </div>
   );
}

export default RenderDecks;