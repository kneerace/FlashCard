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
        // console.log('DisplayCards event.target', event.target);
        const cardid = event.target.id;
        if(window.confirm("Delete thi card?\n\nYou will not be able to recover it.")){
            deleteCard(event.target.id);
            const newCards = cards.filter((item)=> item.id != cardid);
            setCards(newCards);
            // setCards(current=> {
            //     return current.filter((item)=>item.id != cardid)
            // })
            // console.log('cards::::', cards);
            history.push(`${url}`);
           
        }

    }
    if(cards) {
        // console.log("DisplayCard inside if for return", cards);
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
                                    <Link to={`${url}/cards/${card.id}/edit`} className="btn btn-secondary mr-1">Edit</Link>
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