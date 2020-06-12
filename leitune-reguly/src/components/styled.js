import React from "react";
import styled from "styled-components";
import {COLORS, ZINDEX} from "@src/services/constants";
import {DESKTOP} from "@src/services/responsive";

export const StyledButton = styled.button({
  background: COLORS.Red,
  color: COLORS.White,
  border: `2px solid ${COLORS.Red}`,
  borderRadius: '8px',
  fontSize: '15px',
  lineHeight: '18px',
  height: '35px',
  width: '200px',
  cursor: 'pointer',

  [DESKTOP]: {
    height: '50px',
    width: '350px',
    fontSize: '24px',
    lineHeight: '28px',
    transition: 'all 0.2s',

    '&:hover': {
      background: COLORS.White,
      color: COLORS.Red,
    }
  }
});


export const Section = styled.section({
  margin: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  boxSizing: 'border-box',

  [DESKTOP]: {
    margin: '80px 150px',
  }
});

export const InnerSection = styled.div(p => ({
  marginBottom: {
    tiny: '4px',
    small: '74px',
    normal: '94px'
  }[p.marginSize || 'normal'],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',

  [DESKTOP]: {
    flexDirection: p.direction || 'row',
    alignItems: p.align || 'flex-start',
    justifyContent: p.justify || 'space-between',
    width: '100%',
    maxWidth: '1200px'
  }
}));

export const Close = styled.div({
  position: 'absolute',
  top: '15px',
  right: '15px',
  color: COLORS.Black,
  zIndex: ZINDEX.Modal,
  cursor: 'pointer',
});

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
    [DESKTOP]: {
      maxWidth: props.size === 'small' ? '240px' : '500px',
    },
    li: {
      fontSize: size.fontSize,
      lineHeight: size.lineHeight,
      color: COLORS.Gray,

      '&::before': {
        content: "'\\2022'",
        color: COLORS.Red,
        fontWeight: 'bold',
        display: 'inline',
        ...size.bullet,
        [DESKTOP]: {
          marginLeft: '-12px',
          marginRight: '5px',
          fontSize: '20px',
          lineHeight: '20px',
        }
      },

      [DESKTOP]: {
        fontSize: '26px',
        lineHeight: '30px',
      }
    },
  }
});

export const RectangleIconsContainers = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  margin: '20px 0px 40px 0px',
  width: '100%',

  [DESKTOP]: {
    width: '480px',
    minWidth: '480px',
  }
});

export const PageCloseWrapper = styled.div({
  position: 'fixed',
  top: "20px",
  cursor: 'pointer',
  right: '20px',
  [DESKTOP]: {
    right: '100px',
    svg: {
      width: '1.5em',
      height: '1.5em',
    }
  },
});

export const Center = styled.div({
  [DESKTOP]: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  }
});
