import React from "react";
import styled from "styled-components";
import {COLORS} from "@src/components/constants";

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
  }
}));

export const StyledButton = styled.button({
  background: COLORS.Red,
  color: COLORS.White,
  border: 'none',
  borderRadius: '8px',
  fontSize: '15px',
  lineHeight: '18px',
  height: '35px',
  width: '200px',
});


export const Section = styled.section({
  margin: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  boxSizing: 'border-box'
});

export const InnerSection = styled.div(p => ({
  marginBottom: {
    small: '74px',
    normal: '94px'
  }[p.marginSize || 'normal'],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

export const BulletList = styled.ul(props => {
  const sizes = {
    default: {
      maxWidth: '80px',
      fontSize: '10px',
      lineHeight: '12px',
      bullet: {
        marginLeft: '-10px',
        marginRight: '5px',
        fontSize: '12px',
      }
    },
    large: {
      maxWidth: '100%',
      fontSize: '16px',
      lineHeight: '18px',
      bullet: {
        marginLeft: '-12px',
        marginRight: '5px',
        fontSize: '20px',
        lineHeight: '20px',
      }
    }
  };
  const size = sizes[props.size] || sizes.default;
  return {
    marginTop: '10px',
    listStyle: 'none',
    maxWidth: size.maxWidth,
    li: {
      fontSize: size.fontSize,
      lineHeight: size.lineHeight,
      color: COLORS.Gray,

      '&::before': {
        content: "'\\2022'",
        color: COLORS.Red,
        fontWeight: 'bold',
        display: 'inline',
        ...size.bullet
      },
    },
  }
});
