import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {useTranslation} from "react-i18next";
import {COLORS} from "@src/services/constants";
import dynamic from 'next/dynamic'
import {DESKTOP} from "@src/services/responsive";

const Odometer = dynamic(import('react-odometerjs'), {
  ssr: false,
  loading: () => 0
});

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  marginTop: '20px',

  [DESKTOP]: {
    marginTop: '70px',
  }
});

const Before = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'flex-end',
  width: '100%',
  marginBottom: '10px',

  [DESKTOP]: {
    marginBottom: '20px',
  },

  span: {
    display: 'inline-block',
    fontSize: '12px',
    fontHeight: '14px',
    textAlign: 'center',
    color: COLORS.Gray,
    width: '75px',

    [DESKTOP]: {
      fontSize: '25px',
      fontHeight: '29px',
      width: '220px',
    }
  }
});

const After = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  width: '100%',
  marginBottom: '10px',

  span: {
    display: 'inline-block',
    fontSize: '12px',
    fontHeight: '14px',
    textAlign: 'center',
    color: COLORS.Gray,
    width: '75px',

    [DESKTOP]: {
      fontSize: '25px',
      fontHeight: '29px',
      width: '220px',
    }
  }
});

const Circles = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%',
  marginBottom: '10px',

  [DESKTOP]: {
    marginBottom: '20px',
  }
})

const Circle = styled.div({
  borderRadius: '50%',
  border: `4px solid ${COLORS.Red}`,
  background: COLORS.White,
  color: COLORS.Red,
  fontWeight: 'bold',
  width: '75px',
  height: '75px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  flexDirection: 'column',
  [DESKTOP]: {
    border: `8px solid ${COLORS.Red}`,
    width: '220px',
    height: '220px',
    fontSize: '50px',
    lineHeight: '59px',
  }
});

export default function CnjDataCircles() {
  const {t} = useTranslation('body');
  const [runOdometer, setRunOdometer] = useState(false);

  useEffect(() => {
    setTimeout(() => setRunOdometer(true), 1000);
  });

  const items = useMemo(() => {
    return t('cnjdata.data', { returnObjects: true }).map((item, i) => {
      return {
        ...item,
        data: runOdometer ? parseFloat(item.data) : 0,
        key: i,
      }
    });
  }, [runOdometer]);

  return (
    <Container>
      <Before>
        {items.map(item => (
          <span key={item.key}>{item.before}</span>
        ))}
      </Before>
      <Circles>
        {items.map(item => (
          <Circle key={item.key}>
            <Odometer value={item.data} format="(.ddd),dd" auto={false} animation="count" />
            {item.circle}
          </Circle>
        ))}
      </Circles>
      <After>
        {items.map(item => (
          <span key={item.key}>{item.after}</span>
        ))}
      </After>
    </Container>
  )
}
