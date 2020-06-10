import React, {useContext, useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import {COLORS, ZINDEX} from "@src/components/constants";
import {store} from "@src/store";
import {scrollTo} from "@src/services/utils";
import {ACTION_TYPES} from "@src/store/actions";
import {useScrollListener} from "@src/services/scroll";
import {useController} from "@src/store/controllers";

const Container = styled.div(p => ({
  zIndex: ZINDEX.NavBar,
  width: '100%',
  height: 44,
  boxSizing: 'border-box',
  padding: '0 25px',
  background: p.bg || COLORS.White,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  top: p.open ? 0 : '-50px',
  transition: 'top 0.3s',
}));

const MenuDrop = styled.ul(props => ({
  width: '100%',
  background: COLORS.White,
  marginTop: '44px',
  zIndex: ZINDEX.Menu,
  left: 0,
  transition: 'height 0.3s',
  listStyle: 'none',
  height: props.open ? '160px' : 0,
  overflow: 'hidden',

  li: {
    zIndex: ZINDEX.Menu,
    background: 'transparent',
    height: '40px'
  }
}));

const PlainButton = styled.button(props => ({
  border: 'none',
  background: 'transparent',
  fontSize: '12px',
  lineHeight: '12px',
  fontWeight: 'bold',
  color: COLORS.Black,
  width: '100%',
  height: '40px',
  textAlign: 'center',
  zIndex: ZINDEX.Menu,
}));

export default function NavBar({children, bg, fixed}) {
  const [prevScroll, setPrevScroll] = useState(0);
  const [open, setOpen] = useState(true);

  const { pageYOffset } = useScrollListener();
  const [state, { closeMenu, openMenu }] = useController();

  useEffect(() => setOpen(true), []);

  function handleScroll() {
    if (fixed) {
      return;
    }
    const currScroll = window.pageYOffset;
    if (Math.abs(prevScroll - currScroll) > 40) {
      if (prevScroll > currScroll) {
        setOpen(true);
      } else {
        setOpen(false);
        closeMenu();
      }
      setPrevScroll(currScroll);
    }
  }

  useEffect(handleScroll, [pageYOffset]);

  if (state.nav.hidden) return null;

  return (
    <>
      <Container bg={bg} open={open}>
        {children}
      </Container>
      <MenuDrop open={state.nav.open}>
        <li><PlainButton onClick={scrollTo('about')}>SOBRE</PlainButton></li>
        <li><PlainButton onClick={scrollTo('team')}>SÓCIAS</PlainButton></li>
        <li><PlainButton onClick={scrollTo('speciality')}>ESPECIALIDADES</PlainButton></li>
        <li><PlainButton onClick={scrollTo('contact')}>CONTATO</PlainButton></li>
      </MenuDrop>
    </>
  )
}


NavBar.propTypes = {
  children: PropTypes.element.isRequired,
  bg: PropTypes.string,
  fixed: PropTypes.bool,
}

NavBar.defaultProps = {
  bg: COLORS.White,
  fixed: false,
}
