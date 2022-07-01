import React,{useState, useEffect} from "react";
import {Switch, Route, useRouteMatch} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home"
import CreateDeck from "./../components/CreateDeck/CreateDeck";
import ViewDeck from "../components/Deck/ViewDeck"
import {listDecks} from "./../utils/api/index";
import EditDeck from "../components/Deck/EditDeck";
import StudyDeck from "../components/Deck/StudyDeck";
import AddCard from "../components/Card/AddCard";
import EditCard from "../components/Card/EditCard";


function Layout() {

    // setting up deck, default as blank Array
    const [decks, setDecks] = useState([]);
    
    const {url} = useRouteMatch();

    useEffect(() => {
      listDecks().then(setDecks);

    }, [url]);

      // console.log("LayoutIndex::::decks::::", decks);

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
          <Route exact path="/decks/:deckID/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckID/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckID/study">
            <StudyDeck />
          </Route>
          <Route exact path="/decks/:deckID/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckID" >
            <ViewDeck />
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
