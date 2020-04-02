import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { CheckoutContext } from '../context/CheckoutContext';
import CheckoutCard from './checkout/CheckoutCard';
import CheckoutHistoryCard from './checkout/CheckoutHistoryCard';
import OrderDetailsCard from './OrderDetails';
import Contols from './Controls';
import Loading from './Loading';
import FlipMove from 'react-flip-move';

const Container = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 625px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Headline = styled.h4`
  margin: 5px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10px;
  @media (max-width: 625px) {
    padding-top: 0;
    max-width: 600px;
    width: 100%;
    ${(props) =>
      props.hide &&
      css`
        display: none;
      `};
  }
`;

const Recent = styled(Section)`
  max-height: calc(100vh - 110px);
  flex: 0 0 55%;
  max-width: 550px;
  min-width: 300px;
`;

const History = styled(Section)`
  flex: 0 0 40%;
  max-width: 430px;
  min-width: 250px;
  .header {
    margin-bottom: 0;
  }
`;

export default function CheckoutContainer() {
  const { state, dispatch } = useContext(CheckoutContext);
  const [recentCheckouts, setRecentCheckouts] = useState([]);
  const [historyCheckouts, setHistoryCheckouts] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const recent = state.checkouts
      .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))
      .slice(0, 3);
    setRecentCheckouts(recent);
  }, [state.checkouts]);

  useEffect(() => {
    const history = state.checkouts
      .sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated))
      .slice(3, 14);
    setHistoryCheckouts(history);
  }, [state.checkouts]);

  const setMobileView = (state) => {
    setShowHistory(state);
  };

  if (recentCheckouts.length < 1) {
    return <Loading />;
  }

  return (
    <Container>
      {state.showOrderDetails && (
        <OrderDetailsCard
          close={() => dispatch({ type: 'TOGGLE_ORDER_DETAILS' })}
          data={state.currentOrderDetails}
          show={state.showOrderDetails}
        />
      )}

      <Contols setMobileView={setMobileView} />

      <Recent hide={showHistory}>
        <Headline>Checkout feed</Headline>
        <FlipMove
          leaveAnimation="fade"
          enterAnimation={{
            from: {
              opacity: 0.1,
              transform: 'scale(0.5)',
            },
            to: {
              opacity: 1,
              transform: 'scale(1)',
            },
          }}
        >
          {recentCheckouts.map((checkout) => (
            <CheckoutCard key={checkout.id.toString()} checkout={checkout} />
          ))}
        </FlipMove>
      </Recent>

      <History hide={!showHistory}>
        <Headline>Log</Headline>
        <FlipMove enterAnimation="accordionVertical">
          {historyCheckouts.map((checkout) => (
            <CheckoutHistoryCard
              key={checkout.id.toString()}
              checkout={checkout}
            />
          ))}
        </FlipMove>
      </History>
    </Container>
  );
}
