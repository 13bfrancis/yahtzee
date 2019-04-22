import React, { useState } from 'react';
import styled from 'styled-components';
import Game from './components/Game';
import Scorecard from './components/Scorecard';
import { beginDice } from './helperFunctions';

const AppHeader = styled.header`
  text-align: center;
  background: #36e272;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  h1 {
    margin: 0;
    font-size: 3em;
  }
`;

const TabContainer = styled.div`
  width: 100%;
  display: flex;
`;

const TabButton = styled.button`
  flex-grow: 1;
  padding: 0.5rem;
  background: none;
  border: 1px solid black;
  font-size: 1.2rem;
  cursor: pointer;
  &.active {
    background: #36e272;
  }
`;
const Container = styled.div`
  margin: 1rem;
`;

const App = () => {
  const [isGame, setIsGame] = useState(true);
  const [dice, setDice] = useState(beginDice);
  const [gameTurn, setGameTurn] = useState(1);
  const [turn, setTurn] = useState(0);

  const isGameHandler = (isGameVal = !isGame) => {
    setIsGame(isGameVal);
  };
  const rollDice = () => {
    let newDice = [];
    dice.forEach(die => {
      if (die.hold) {
        newDice.push(die);
      } else {
        newDice.push({
          value: Math.floor(Math.random() * 6 + 1),
          hold: false
        });
      }
    });
    setDice(newDice);
    if (turn === 3) {
      setTimeout(() => {
        setIsGame(!isGame);
      }, 3000);
    }
  };
  const holdDie = index => {
    let newDice = [];
    dice.forEach((die, i) => {
      if (i === index) {
        newDice.push({
          value: die.value,
          hold: !die.hold
        });
      } else {
        newDice.push({
          ...die
        });
      }
    });
    console.log(newDice);
    setDice(newDice);
  };
  return (
    <>
      <AppHeader>
        <h1>Yahtzee</h1>
      </AppHeader>
      <TabContainer>
        <TabButton
          onClick={() => {
            isGameHandler(true);
          }}
          className={isGame ? 'active' : ''}
        >
          Game
        </TabButton>
        <TabButton
          onClick={() => {
            isGameHandler(false);
          }}
          className={isGame ? '' : 'active'}
        >
          Scorecard
        </TabButton>
      </TabContainer>
      <Container>
        {isGame ? (
          <Game dice={dice} holdDie={holdDie} rollDice={rollDice} />
        ) : (
          <Scorecard />
        )}
      </Container>
    </>
  );
};

export default App;
