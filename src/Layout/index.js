import React,{useState, useEffect} from "react";
import {Switch, Route, useRouteMatch} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home"
import CreateDeck from "./../components/CreateDeck/CreateDeck";
import ViewDeck from "../components/Deck/ViewDeck"
import {listDecks} from "./../utils/api/index";
import EditDeck from "../components/Deck/EditDeck";


function Layout() {

    // setting up deck, default as blank Array
    const [decks, setDecks] = useState([]);

    const abort = new AbortController();
    const {url} = useRouteMatch();
    // console.log('Layout index path: ', path, ' url:', url)

    //Fetching Decks
    useEffect(()=>{
        async function fetchDecks() {
            try{
                const response = await listDecks(abort.signal);
                await setDecks(response);
                // console.log("fetchDeck response: ", response)
            }catch(err){
                console.log('Error: ', err); //-------TODO 
            }
                }
        fetchDecks();
    }, [`${url}`]);


  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/" >
            <Home decks={decks}/>
          </Route>
          <Route path="/decks/new" >
            <CreateDeck decks={decks}/>
          </Route>
          <Route path="/decks/:deckID" >
            <ViewDeck />
          </Route>
          <Route path="/decks/:deckID/edit">
            <EditDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
