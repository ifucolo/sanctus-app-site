import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {COLORS} from "@src/services/constants";
import {DESKTOP} from "@src/services/responsive";


export const StyledTitle = styled.h2(p => ({
  color: p.variant === 'black' ? COLORS.Black : COLORS.White,
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '28px',
  textAlign: 'center',

  em: {
    color: COLORS.Red,
    fontStyle: 'italic',
  },

  [DESKTOP]: {
    textAlign: 'left',
    ...(p.large ? {
      fontSize: '45px',
      lineHeight: '53px',
    } : {
      fontSize: '36px',
      lineHeight: '42px',
    })
  }
}));

export const StyledParagraph = styled.p(p => ({
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: p.fontSize || '20px',
  lineHeight: p.lineHeight || '23px',
  textAlign: 'center',
  color: COLORS.Gray,
  margin: '20px 0',
  width: '100%',
  boxSizing: 'border-box',

  em: {
    fontStyle: 'italic'
  },

  [DESKTOP]: {
    fontSize: '28px',
    lineHeight: '33px',
    textAlign: 'left',
  }
}));

const Container = styled.div(p => ({
  marginTop: '30px',

  [DESKTOP]: {
    maxWidth: '590px',
  },
}))

const SIZES = {
  normal: {
    fontSize: "20px",
    lineHeight: "23px",
  },
  small: {
    fontSize: "12px",
    lineHeight: "14px",
  }
}

export default function TextSection({ title, text, variant, size, large }) {
  return (
    <Container large={large}>
      <StyledTitle large={large} variant={variant} dangerouslySetInnerHTML={{__html: title}} />
      {text && (<StyledParagraph {...SIZES[size]} dangerouslySetInnerHTML={{__html: text}} />)}
    </Container>
  )
}

TextSection.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  size: PropTypes.oneOf(['small', 'normal']),
  variant: PropTypes.oneOf(['black','white']),
  large: PropTypes.bool,
};

TextSection.defaultProps = {
  text: null,
  size: 'normal',
  variant: 'black',
  large: false
}
