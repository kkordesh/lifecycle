import React, { Component } from "react";
import "./PokeFetch.css";

class PokeFetch extends Component {
  constructor() {
    super();
    this.state = {
      pokeInfo: "",
      pokeSprite: "",
      pokeName: "",
    };
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    this.setState({remainingTime: 10})
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          remainingTime: 10
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.pokeName !== this.state.pokeName) {
      this.updateTimer()
    }
  }


  updateTimer = () => {
    let internalTimeRemaining = 10 

    const countdown = () => {
      internalTimeRemaining = internalTimeRemaining - 1 

      if (internalTimeRemaining<= 0) {
        clearInterval(newTimer);
        this.setState({remainingTime: 0})
        return
      }

      this.setState({remainingTime: internalTimeRemaining})
    };

    let newTimer = setInterval(countdown, 1000)
  };

  render() {
    return (
      <div className={"wrapper"}>
        <button className={"start"} onClick={() => this.fetchPokemon()}>
          Start!
        </button>
        <h1 className={"timer"}>Timer Display: {this.state.remainingTime}</h1>
        <div className={"pokeWrap"}>
          <img
          style={this.state.remainingTime === 0 ? {filter: "brightness(100%)"} : {filter: "brightness(0%)"}}
            className={"pokeImg"}
            src={this.state.pokeSprite}
            alt="pokemon"
          />
          {this.state.remainingTime === 0 ?  <h1 className={"pokeName"}>{this.state.pokeName}</h1> : null}
        </div>
      </div>
    );
  }
}

export default PokeFetch;
