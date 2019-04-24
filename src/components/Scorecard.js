import React from 'react';
import styled from 'styled-components';

import { stringifyDiceValues } from '../helpers/stringifyDiceValues';
import { checkScore } from '../helpers/checkScore';

const ScoreContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  border: 1px solid black;
`;
const Title = styled.div`
  width: 50%;
  border-right: 1px solid black;
  text-align: center;
  padding: 0.3rem;
  font-weight: bold;
`;
const Instructions = styled.div`
  width: 25%;
  border-right: 1px solid black;
  text-align: center;
  padding: 0.3rem;
`;
const ScoreButton = styled.button`
  flex-grow: 1;
  text-align: center;
  padding: 0.3rem;
  background: none;
  border: none;
  color: grey;
  font-weight: bold;
  &:disabled {
    color: black;
  }
`;

export default function Scorecard({ scorecard, dice, setScore }) {
  return (
    <>
      {Object.keys(scorecard).map(key => (
        <ScoreContainer key={key}>
          {console.log(scorecard[key])}
          <Title>{key}</Title>
          {scorecard[key] !== undefined ? (
            <ScoreButton disabled>{scorecard[key]}</ScoreButton>
          ) : (
            <ScoreButton
              onClick={() => {
                setScore(
                  key,
                  checkScore({ id: key, dice: stringifyDiceValues(dice) })
                );
              }}
            >
              {checkScore({ id: key, dice: stringifyDiceValues(dice) })}
            </ScoreButton>
          )}
        </ScoreContainer>
      ))}
      <ScoreContainer>
        <Title>Total</Title>
        <ScoreButton disabled>40</ScoreButton>
      </ScoreContainer>
    </>
  );
}
