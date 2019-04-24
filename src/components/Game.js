import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border: 1px solid black;
`;

const Die = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 1px solid black;
  margin: 1rem 0;
  font-size: 2rem;
  cursor: pointer;
  &.held {
    background: grey;
  }
`;

const RollButton = styled.button`
  border: none;
  outline: none;
  padding: 0.5rem;
  background: #36e272;
  margin: 1rem 0;
  width: 100%;
  font-size: 2rem;
  font-family: 'Cute Font', cursive;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
  transition: all linear 0.3s;
  &:hover,
  &:active {
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
  }
  &:disabled {
    background: grey;
    color: white;
  }
`;

const NotificationBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 5px solid black;
  margin: 0.5rem 0;
  h1 {
    margin: 0;
  }
`;

export default function Game({ dice, holdDie, rollDice, turn, isOver }) {
  return (
    <>
      <NotificationBar>
        <h1>Turn: {turn}</h1>
        <h1>Roll Max Value: 50</h1>
      </NotificationBar>
      <Container>
        {dice.map((die, index) => (
          <Die
            key={index}
            onClick={() => {
              holdDie(index);
            }}
            className={die.hold ? 'held' : ''}
          >
            {die.value}
          </Die>
        ))}
      </Container>
      <RollButton disabled={turn === 3} onClick={rollDice}>
        Roll
      </RollButton>
      {isOver && <p>Game Over</p>}
    </>
  );
}
