import React, { Component } from "react";
import XmenCard from "./components/XmenCard";
import Wrapper from "./components/Wrapper";
import "./App.css";

import Score from "./components/Score"
import xmens from "./xmens.json";

class App extends Component {
  
  state = {
    xmens,
    clickedXmenIds: [],
    score: 0,
    goal: 12,
    status: ""
  };

  //shuffle 
  shuffleScoreCard = id => {
    let clickedXmenIds = this.state.clickedXmenIds;

    if(clickedXmenIds.includes(id)){
      this.setState({ clickedPuppyIds: [], score: 0, status:  "You lost, That's all folks!" });
      return;
    }else{
      clickedXmenIds.push(id)

      if(clickedXmenIds.length === 12){
        this.setState({score: 12, status: "You are victorious!", clickedXmenIds: []});
        console.log('You Rock');
        return;
      }

      this.setState({ xmens, clickedXmenIds, score: clickedXmenIds.length, status: " " });

      for (let i = xmens.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [xmens[i], xmens[j]] = [xmens[j], xmens[i]];
      }
    }
  }

  // render a xmencard component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">X-Men Memory Game</h1>
          <p className="App-intro">
            Only click photo once!
          </p>
        </header>
        <Score total={this.state.score}
               goal={12}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.xmens.map(xmen => (
            <XmenCard
              shuffleScoreCard={this.shuffleScoreCard}
              id={xmen.id}
              key={xmen.id}
              image={xmen.image}
            />
          ))}
        </Wrapper>
        <footer>
          <p>By Par Othi</p>
        </footer>
    </div>
    );
  }
}

export default App;
