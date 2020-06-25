import React, {useState} from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import {COLORS} from "@src/services/constants";
import {DESKTOP, useResizeListener} from "@src/services/responsive";


const Item = styled.div({
  height: '200px',
  width: '100%',
  overflow: 'hidden',
  background: COLORS.White,
  boxSizing: 'border-box',
  position: 'relative',
  borderRadius: '8px',
  marginTop: '20px',

  [DESKTOP]: {
    height: '330px',
    width: '410px',
  },

  '&:nth-child(odd)': {
    '.photo': {
      left: 0
    },
    h3: {
      right: '8px',
      [DESKTOP]: {
        right: '0px',
      }
    },
    '.linkedin-icon': {
      right: '20px'
    },
    '.flip-side': {
      left: 0,
    }
  },

  '&:nth-child(even)': {
    '.photo': {
      right: 0,
    },
    h3: {
      left: '8px',
      [DESKTOP]: {
        left: '30px',
      }
    },
    '.linkedin-icon': {
      left: '20px'
    },
    '.flip-side': {
      right: 0,
    }
  }
});

const FlipSide = styled.div(p => ({
  position: 'absolute',
  // width: p.enabled ? '100%' : '0%',
  // height: p.enabled ? '200px' : '0%',
  transform: p.enabled ? 'scale(1)' : 'scale(0)',
  // transform: p.enabled ? 'scaleX(1)' : 'scaleX(0)',
  width: '100%',
  height: '100%',
  opacity: p.enabled ? '1' : '0',
  backgroundColor: COLORS.Red,
  display: 'flex',
  overflow: 'hidden',
  transition: 'all 0.3s',
  textAlign: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '10px',
  borderRadius: '8px',
  boxSizing: 'border-box',
  top: 0,
  p: {
    margin: 0,
    padding: 0,
    color: COLORS.White,
    fontStyle: 'italic',
    [DESKTOP]: {
      fontSize: '22px',
      lineHeight: '26px',
    }
  }
}));

const Name = styled.h3({
  fontSize: '18px',
  lineHeight: '21px',
  color: COLORS.Red,
  maxWidth: '100px',
  position: 'absolute',
  top: '20px',

  '.tagline': {
    fontSize: '12px',
    lineHeight: '14px',
    color: COLORS.Gray
  },

  [DESKTOP]: {
    fontSize: '22px',
    lineHeight: '26px',
    maxWidth: '180px',
    top: '60px',
  }
});

const Photo = styled.img({
  position: 'absolute',
  height: '200px',

  [DESKTOP]: {
    height: '330px'
  }
});


const Icon = styled.img(p => ({
  width: '15px',
  height: '15px',
  position: 'absolute',
  bottom: '20px',
}));

export function MemberCard({ name, photo, tagline, description, linkedin }) {
  const [enabled, setEnabled] = useState(false);
  const {isDesktop} = useResizeListener();

  return (
    <Item
      key={name}
      onClick={() => !isDesktop && setEnabled(!enabled)}
      onMouseEnter={() => isDesktop && setEnabled(true)}
      onMouseLeave={() => isDesktop && setEnabled(false)}
    >
      <Photo src={photo} className="photo" alt={name} />
      <Name>
        {name}
        <br />
        <span className="tagline">{tagline}</span>
      </Name>
      <FlipSide className="flip-side" enabled={enabled}>
        <p dangerouslySetInnerHTML={{__html: description}} />
      </FlipSide>
      <a href={linkedin} target="_blank">
        <Icon src={enabled ? "/images/footer/linkedin-white.png" : "/images/footer/linkedin-red.png"} className="linkedin-icon" alt="linkedIn" />
      </a>
    </Item>
  )
}

MemberCard.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
}
