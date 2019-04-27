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
      p1attacks: 10,
      p2attacks: 10
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

  minus(name, i) {
    const s = `p${i}${name}`
    if (this.state[s] > 0) {
      this.setState({
        [s]: this.state[s] - 1
      });
    }
  }

  attackPlayer(i) {
    this.minus('health', this.opponent(i));
    this.minus('attacks', i);
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
        attackPlayer: () => this.attackPlayer(i),
        attackShip: () => this.attackShip(i),
        endTurn: () => this.endTurn(i),
        addBuy: () => this.plus('buys', i),
        addAttack: () => this.plus('attacks', i),
        spend: () => this.spend(i)
      })
      return <Player { ...props } key={ `p${i}` }/>
    });
    return <div>{ players }</div>
  }
}

function Player(props) {
  const { health, attacks, buys, attackPlayer, attackShip, endTurn, addBuy, addAttack, spend } = props;
  return <div className="player">
    <button onClick={ addAttack }>+ Attack</button>
    <button onClick={ addBuy }>+ Buy</button>
    <p>health: {health}</p>
    <p>attacks: { attacks }</p>
    <button onClick={ attackPlayer }>Attack Player</button>
    <button onClick={ attackShip }>Attack Ship</button>
    <p>buys: { buys }</p>
    <button onClick={ spend }>Spend 1</button>
    <button onClick={ endTurn }>End Turn</button>
  </div>
}

ReactDOM.render(<Game />, document.getElementById('game'));