import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Game from './components/Game';
import Scorecard from './components/Scorecard';
import { beginDice } from './helpers/helperFunctions';
import { defaultScorecard } from './helpers/scorecard';
import TabContainer from './components/TabContainer';

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

const Container = styled.div`
  margin: 1rem;
`;

const App = () => {
  const [isGame, setIsGame] = useState(true);
  const [isOver, setIsOver] = useState(false);
  const [dice, setDice] = useState(beginDice);
  const [gameTurn, setGameTurn] = useState(1);
  const [turn, setTurn] = useState(0);
  const [scorecard, setScorecard] = useState(defaultScorecard);
  const [isYahtzee, setIsYahtzee] = useState(false);
  const [isBonus, setIsBonus] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (checkOver()) {
      setIsOver(true);
    }
    if (!isBonus && checkBonus()) {
      setIsBonus(true);
    }
    setTotal(calculateTotal());
  }, [scorecard]);

  useEffect(() => {
    if (isBonus) {
      let newScorecard = [...scorecard];
      newScorecard[6].value = 35;
      setScorecard(newScorecard);
    }
  }, [isBonus]);

  const calculateTotal = () => {
    let values = scorecard.map(item => item.value);
    let sum = 0;
    values.forEach(value => {
      if (value) {
        sum += value;
      }
    });
    return sum;
  };

  const isGameHandler = (isGameVal = !isGame) => {
    setIsGame(isGameVal);
  };
  //roll dice function
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
    setTurn(turn + 1);
  };
  //hold dice function
  const holdDie = index => {
    if (turn === 0) return;
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
    setDice(newDice);
  };
  //next turn function
  const nextTurn = () => {
    setGameTurn(gameTurn + 1);
    setTurn(0);
    setDice(beginDice);
  };

  const checkOver = () => {
    let values = scorecard.map(item => item.value);
    for (let i = 0; i < values.length; i++) {
      if (values[i] === undefined) {
        return false;
      }
    }
    return true;
  };

  const setScore = (index, value, bonus) => {
    let newScorecard = [...scorecard];
    if (turn === 0) return;
    if (index === 12 && value === 50) {
      setIsYahtzee(true);
    }
    if (bonus) {
      newScorecard[index].value = 0;
      newScorecard[newScorecard.length - 1].value =
        newScorecard[newScorecard.length - 1].value + 100;
      setScorecard(newScorecard);
    } else {
      newScorecard[index].value = value;
      setScorecard(newScorecard);
    }
    nextTurn();
  };

  const checkBonus = () => {
    let values = scorecard.map(item => item.value);
    let sum = 0;
    for (let i = 0; i < 6; i++) {
      if (values[i]) {
        sum += values[i];
      }
    }
    return sum >= 63;
  };
  return (
    <>
      <AppHeader>
        <h1>Yahtzee</h1>
      </AppHeader>
      <TabContainer isGameHandler={isGameHandler} isGame={isGame} />
      <Container>
        {isGame ? (
          <Game
            isOver={isOver}
            turn={turn}
            setTurn={turn}
            dice={dice}
            holdDie={holdDie}
            rollDice={rollDice}
            next={nextTurn}
            total={total}
          />
        ) : (
          <Scorecard
            setScore={setScore}
            scorecard={scorecard}
            dice={dice}
            isYahtzee={isYahtzee}
            setScorecard={setScorecard}
            total={total}
            turn={turn}
          />
        )}
      </Container>
    </>
  );
};

export default App;
