import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {COLORS} from "@src/services/constants";
import {useTranslation} from "react-i18next";
import {DESKTOP, useResizeListener} from "@src/services/responsive";

const Container = styled.div({
  background: COLORS.White,
  borderRadius: '15px',
  width: 'calc(50% - 30px)',
  maxWidth: '200px',
  margin: '5px',
  position: 'relative',

  '&::before': {
    content: '""',
    display: 'block',
    marginTop: '100%',
  },

  [DESKTOP]: {
    width: '200px',
    margin: '20px'
  },
});

export const Content = styled.div({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

const Image = styled.img({
  width: '45px',
  height: '45px',

  [DESKTOP]: {
    width: '100px',
    height: '100px',
  }
})

const Span = styled.span({
  fontWeight: 'bold',
  marginTop: '10px',
  textAlign: 'center',
  fontSize: '12px',
  lineHeight: '14px',
  [DESKTOP]: {
    fontSize: '22px',
    lineHeight: '26px',
    marginTop: '20px',
  }
});

const FlipSide = styled.div(p => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: COLORS.Red,
  display: 'flex',
  // opacity: p.enabled ? '1' : '0',
  transform: p.enabled ? 'translate(0, 0)' : 'translate(-300px, -300px)',
  transition: 'all 0.3s',
  textAlign: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '10px',
  borderRadius: '15px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  p: {
    margin: 0,
    padding: 0,
    color: COLORS.White,
    fontStyle: 'italic',
    [DESKTOP]: {
      fontSize: '20px',
      lineHeight: '23px',
    }
  },
  [DESKTOP]: {
    transform: 'none',
    opacity: p.enabled ? 1 : 0,
    transition: 'all 0.3s',
  }
}));



export default function RectangleIcon({ variant }) {
  const { t } = useTranslation('rectangle');
  const [enabled, setEnabled] = useState(false);
  const [tid, setTid] = useState(0);
  const {isDesktop} = useResizeListener();

  useEffect(() => {
    if (tid) clearTimeout(tid);
    if (enabled) {
      const ntid = setTimeout(() => {
        setEnabled(false);
      }, 5000);
      setTid(ntid);
    }
    return () => {
      if (tid) clearTimeout(tid);
    }
  }, [enabled]);

  const variants = useMemo(() => ({
    paint: {
      image: '/images/paint.png',
      text: t('paint.text'),
      title: t('paint.title')
    },
    wifi: {
      image: '/images/wifi.png',
      text: t('wifi.text'),
      title: t('wifi.title'),
    },
    lightbulb: {
      image: '/images/lightbulb.png',
      text: t('lightbulb.text'),
      title: t('lightbulb.title'),
    },
    hosting: {
      image: '/images/hosting.png',
      text: t('hosting.text'),
      title: t('hosting.title'),
    }
  }), []);

  const data = variants[variant] || {};

  return (
    <Container
      onClick={() => !isDesktop && setEnabled(!enabled)}
      onMouseEnter={() => isDesktop && setEnabled(true)}
      onMouseLeave={() => isDesktop && setEnabled(false)}
    >
      <Content>
        <Image src={data.image} alt={data.title} />
        <Span>{data.title}</Span>
        <FlipSide enabled={enabled}>
          {data.text.split('\n').map(i => <p key={i}>{i}</p>)}
        </FlipSide>
      </Content>
    </Container>
  )
}

RectangleIcon.propTypes = {
  variant: PropTypes.oneOf(['paint', 'wifi', 'lightbulb', 'hosting']).isRequired,
}
