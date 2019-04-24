import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { stringifyDiceValues } from '../helpers/stringifyDiceValues';
import { checkScore } from '../helpers/checkScore';

const ScoreContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  border: 1px solid black;
`;
const Title = styled.div`
  font-size: 2rem;
  width: 50%;
  border-right: 1px solid black;
  text-align: center;
  padding: 0.3rem;
  font-weight: bold;
`;
const ScoreButton = styled.button`
  cursor: pointer;
  font-size: 2rem;
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

export default function Scorecard({
  turn,
  scorecard,
  dice,
  setScore,
  isYahtzee,
  total
}) {
  const [bonusYahtzee, setBonusYahtzee] = useState(false);
  useEffect(() => {
    if (isYahtzee) {
      if (checkScore({ id: 'Yahtzee', dice: stringifyDiceValues(dice) })) {
        setBonusYahtzee(true);
      }
    }
  }, [dice]);
  return (
    <>
      {scorecard.map((items, index) => (
        <ScoreContainer key={items.name}>
          <Title>{items.name}</Title>
          {scorecard[index].value !== undefined ? (
            <ScoreButton disabled>{scorecard[index].value}</ScoreButton>
          ) : (
            <ScoreButton
              onClick={() => {
                setScore(
                  index,
                  checkScore({
                    id: scorecard[index].name,
                    dice: stringifyDiceValues(dice)
                  }),
                  bonusYahtzee
                );
              }}
            >
              <>
                {turn === 0 ? (
                  '-'
                ) : (
                  <>
                    {bonusYahtzee
                      ? '100'
                      : checkScore({
                          id: scorecard[index].name,
                          dice: stringifyDiceValues(dice)
                        })}
                  </>
                )}
              </>
            </ScoreButton>
          )}
        </ScoreContainer>
      ))}
      <ScoreContainer>
        <Title>Total</Title>
        <ScoreButton disabled>{total}</ScoreButton>
      </ScoreContainer>
    </>
  );
}
