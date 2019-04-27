import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      p1health: 50,
      p2health: 50,
      p1buys: 0,
      p2buys: 0,
      p1attacks: 0,
      p2attacks: 0
    }
  }

  opponent(i) {
    return (i === 1) ? 2 : 1;
  }

  endTurn(i) {
    this.setState({
      [`p${i}buys`]: 0,
      [`p${i}attacks`]: 0
    })
  }

  plus(name, i) {
    const s = `p${i}${name}`
    this.setState({
      [s]: this.state[s] + 1
    });
  }

  minus(name, i, amount=1) {
    const s = `p${i}${name}`
    const setTo = this.state[s] - amount
    this.setState({
      [s]: (setTo < 0)? 0 : setTo
    });
  }

  attackPlayer(i) {
    const attackFor = this.state[`p${i}attacks`];
    this.minus('health', this.opponent(i), attackFor);
    this.minus('attacks', i, attackFor);
  }

  attackShip(i) {
    this.minus('attacks', i);
  }

  spend(i) {
    this.minus('buys', i);
  }

  render() {
    const players = [1,2].map((i) => {
      const props = ['health', 'buys', 'attacks'].reduce((m, prop) => {
        m[prop] = this.state[`p${i}${prop}`]
        return m;
      }, {})
      Object.assign(props, {
        name: `Player ${i}`,
        attackPlayer: () => this.attackPlayer(i),
        attackShip: () => this.attackShip(i),
        endTurn: () => this.endTurn(i),
        addBuy: () => this.plus('buys', i),
        addAttack: () => this.plus('attacks', i),
        addHealth: () => this.plus('health', i),
        spend: () => this.spend(i)
      })
      return <Player { ...props } key={ `p${i}` }/>
    });
    return <div className="field">{ players }</div>
  }
}

function Player(props) {
  const { name, health, attacks, buys, attackPlayer, attackShip, endTurn, addHealth, addBuy, addAttack, spend } = props;
  return <div className="player">
    <header>{ name }</header>
    <ul className="stats">
      <li>{ health }</li>
      <li>{ attacks }</li>
      <li>{ buys }</li>
    </ul>
    <fieldset>
      <button onClick={ addHealth }>+ Health</button>
      <button onClick={ addAttack }>+ Attack</button>
      <button onClick={ addBuy }>+ Buy</button>
    </fieldset>
    <fieldset>
      <button onClick={ attackPlayer }>Attack Player</button>
      <button onClick={ attackShip }>Attack Ship</button>
    </fieldset>
    <fieldset>
      <button onClick={ spend }>Spend 1</button>
    </fieldset>
    <fieldset>
      <button onClick={ endTurn }>End Turn</button>
    </fieldset>
  </div>
}

ReactDOM.render(<Game />, document.getElementById('game'));