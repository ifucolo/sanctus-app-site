import React, {useState} from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import {COLORS} from "@src/services/constants";


const Item = styled.div({
  height: '200px',
  width: '100%',
  overflow: 'hidden',
  background: COLORS.White,
  boxSizing: 'border-box',
  position: 'relative',
  borderRadius: '8px',
  marginTop: '20px',

  '&:nth-child(odd)': {
    '.photo': {
      left: 0
    },
    h3: {
      right: '8px'
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
      left: '8px'
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
  height: '200px',
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
    fontStyle: 'italic'
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
  }
});

const Photo = styled.img({
  position: 'absolute',
  height: '200px',
});


const Icon = styled.img(p => ({
  width: '15px',
  height: '15px',
  position: 'absolute',
  bottom: '20px',
}));

export function MemberCard({ name, photo, tagline, description, linkedin }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <Item key={name} onClick={() => setEnabled(!enabled)}>
      <Photo src={photo} className="photo" />
      <Name>
        {name}
        <br />
        <span className="tagline">{tagline}</span>
      </Name>
      <FlipSide className="flip-side" enabled={enabled}>
        <p dangerouslySetInnerHTML={{__html: description}} />
      </FlipSide>
      <a href={linkedin}>
        <Icon src={enabled ? "/images/footer/linkedin2.png" : "/images/footer/linkedin.png"} className="linkedin-icon" />
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
