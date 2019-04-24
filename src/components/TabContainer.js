import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
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

export default function TabContainer({ isGameHandler, isGame }) {
  return (
    <Container>
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
    </Container>
  );
}
