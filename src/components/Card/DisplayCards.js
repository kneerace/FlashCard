import React, { useEffect,useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard, readDeck } from "../../utils/api";

function DisplayCards({deckID}){
    const{url} = useRouteMatch();
    const history = useHistory();

    const [cards, setCards] = useState(null);

    useEffect(()=>{
        async function getCards(){
            const response = await readDeck(deckID);
            // console.log("DisplayCards getCards response: ", response);
            setCards(response.cards);
        }
        getCards();
    },[deckID]);

    // console.log("DisplayCards cards: ", cards);
    const handleDelete =(event)=>{
        console.log('DisplayCards event.target', event.target);
        if(window.confirm("Delete thi card?\n\nYou will not be able to recover it.")){
            deleteCard(event.target.id);
           const newCards = cards.filter((card)=> 
            {
                // card.id !== event.target.id
                return (card.id!==event.target.id)
            });
            console.log('1 cards', cards, ' newCards:', newCards, ' : ', event.target.id);
            // setCards(newCards);
            deckID = deckID;
            history.push(`${url}`);
            console.log('2 cards', cards, ' newCards:', newCards, ' url: ',url);
        }

    }
    if(cards) {
        console.log("DisplayCard inside if for return", cards);
        return(
            cards.map((card)=>{
                return(
                    <div className="col-sm-6" key={card.id}>
                        <div className="card">
                            <div className="card-body">
                                {/* <div className="d-flex justify-content-between p-1"> */}
                                    <p className="card-text"><strong>{card.front}</strong></p>
                                    <p className="card-text bg">{card.back}</p>
                                {/* </div> */}
                                <div className="d-flex justify-content-end">
                                    <Link to="" className="btn btn-secondary mr-1">Edit</Link>
                                    <button className="btn btn-danger" id={card.id} onClick={handleDelete}>Delete</button>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            })
        )
    }
    return null;
}

export default DisplayCards;