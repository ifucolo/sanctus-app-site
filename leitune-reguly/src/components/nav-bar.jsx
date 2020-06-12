import React, {useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import {COLORS, DESKTOP_MENU_SCROLL_TRIGGER, ZINDEX} from "@src/services/constants";
import {scrollTo} from "@src/services/utils";
import {useScrollListener} from "@src/services/scroll";
import {useController} from "@src/store/controllers";
import {DESKTOP, useResizeListener} from "@src/services/responsive";
import SocialIcons from "@src/components/social-icons";

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

  [DESKTOP]: {
    height: '140px',
    background: 'none',
    padding: '35px 150px 0px 150px',
    position: 'absolute',
    top: '0',
    alignItems: 'flex-start',
    transition: 'all 0.3s',
    ...(p.sticky ? {
      position: 'fixed',
      top: '0',
      height: '60px',
      background: COLORS.White,
      padding: '8px 110px 0px 110px',

    } : {}),
  },
}));

const MenuDesktop = styled.ul(p => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',

  li: {
    marginRight: '25px',
    '&:hover': {
      button: {
        color: COLORS.Red,
      }
    },
    button: {
      cursor: 'pointer',
      fontSize: '18px',
      lineHeight: '21px',
      color: COLORS.White,
      fontWeight: 'bold',
      ...(p.sticky ? {
        color: COLORS.Black,
      } : {})
    }
  }
}));

const MenuMobile = styled.ul(props => ({
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
    height: '40px',
    button: {
      cursor: 'pointer',
      color: COLORS.Black,
    }
  }
}));

const PlainButton = styled.button(props => ({
  border: 'none',
  background: 'transparent',
  fontSize: '12px',
  lineHeight: '12px',
  fontWeight: 'bold',
  width: '100%',
  height: '40px',
  textAlign: 'center',
  zIndex: ZINDEX.Menu,
}));

export default function NavBar({children, bg, fixed, menuHidden}) {
  const [prevScroll, setPrevScroll] = useState(0);
  const [open, setOpen] = useState(true);
  const [sticky, setSticky] = useState(false);
  const { pageYOffset } = useScrollListener();
  const { isDesktop } = useResizeListener();
  const [state, { closeMenu, openMenu }] = useController();

  useEffect(() => setOpen(true), []);

  function handleScroll() {
    if (fixed) {
      return;
    }
    const currScroll = window.pageYOffset;
    if (sticky && currScroll < DESKTOP_MENU_SCROLL_TRIGGER) {
      setSticky(false);
    }
    if (!sticky && currScroll >= DESKTOP_MENU_SCROLL_TRIGGER) {
      setSticky(true);
    }
    if (isDesktop) {
      if (!open) setOpen(true);
      return;
    }
    if (Math.abs(prevScroll - currScroll) > 40) {
      if (prevScroll > currScroll || currScroll < 400) {
        setOpen(true);
      } else {
        setOpen(false);
        closeMenu();
      }
      setPrevScroll(currScroll);
    }
  }

  useEffect(handleScroll, [pageYOffset]);

  const menuItems = useMemo(() => {
    return (
      <>
        <li><PlainButton onClick={scrollTo('about')}>SOBRE</PlainButton></li>
        <li><PlainButton onClick={scrollTo('team')}>SÓCIAS</PlainButton></li>
        <li><PlainButton onClick={scrollTo('speciality')}>ESPECIALIDADES</PlainButton></li>
        <li><PlainButton onClick={scrollTo('contact')}>CONTATO</PlainButton></li>
      </>
    )
  }, []);

  if (state.nav.hidden) return null;

  return (
    <>
      <Container bg={bg} sticky={sticky} open={open}>
        {children}
        {isDesktop && !menuHidden && (
          <>
            <MenuDesktop sticky={sticky}>
              {menuItems}
            </MenuDesktop>
            <SocialIcons variant={sticky ? "black" : "white"} />
          </>
        )}
      </Container>
      {!isDesktop && (
        <MenuMobile open={state.nav.open}>
          {menuItems}
        </MenuMobile>
      )}
    </>
  )
}


NavBar.propTypes = {
  children: PropTypes.element.isRequired,
  bg: PropTypes.string,
  fixed: PropTypes.bool,
  menuHidden: PropTypes.bool,
}

NavBar.defaultProps = {
  bg: COLORS.White,
  fixed: false,
  menuHidden: false,
}
