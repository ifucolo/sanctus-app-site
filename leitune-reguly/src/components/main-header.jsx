import React, {useContext, useEffect, useRef, useState} from "react";
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {COLORS} from "@src/components/constants";
import {useTranslation} from "react-i18next";
import {StyledButton, StyledTitle} from "@src/components/styled";
import NavBar from "@src/components/nav-bar";
import {scrollTo, toPixel} from '@src/services/utils';
import {store} from "@src/store";
import {ACTION_TYPES} from "@src/store/actions";
import Modal from "@src/components/modal";
import {useScrollListener} from "@src/services/scroll";
import TextSection from "@src/components/text-section";

const Container = styled.section({
  width: '100%',
  height: 688,
  // overflow: 'hidden',
  boxSizing: 'border-box',
});

const Logo = styled.img({

});

const BgContainer = styled.div(p => ({
  width: '100%',
  height: 640,
  backgroundImage: 'url("/images/header/header@2x.png")',
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "initial",
  backgroundSize: "cover",
  backgroundColor: '#000',
  borderBottom: `9px solid ${COLORS.Red}`,
  boxSizing: 'border-box',
  marginTop: 0,

  '.mask': {
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.4)',
    boxSizing: 'border-box',
    position: 'relative',

    '.content': {
      width: '100%',
      height: '340px',
      position: 'absolute',
      top: '220px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      boxSizing: 'border-box',
    }
  }
}));

const PlayTitle = styled.a(p => ({
  color: COLORS.White,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '100px',

  '.text': {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '20px',
    textAlign: 'center',
    padding: '7px',
  },

  '.featured': {
    fontStyle: 'italic',
  },

  '.icon': {
    fontSize: '40px',
  },

  em: {
    fontStyle: 'italic',
  }
}));

const PlayIcon = styled.img({
  width: '30px',
  height: '30px',
})

const MODAL_VIDEO = 'MODAL_VIDEO';

export default function MainHeader() {
  const { t } = useTranslation('header');
  const { state, dispatch } = useContext(store);
  const {pageYOffset} = useScrollListener();
  const bgContainerRef = useRef(null);
  const contentRef = useRef(null);

  const openModal = () => dispatch({ type: ACTION_TYPES.OPEN_MODAL, name: MODAL_VIDEO })
  const toggleMenu = () => {
    scrollTo('top')();
    dispatch({ type: state.nav.open ? ACTION_TYPES.CLOSE_MENU : ACTION_TYPES.OPEN_MENU })
    scrollTo('')();
  }

  function handleScroll() {
    const offset = Math.min(pageYOffset/4, 200);
    bgContainerRef.current.style.marginTop = toPixel(-offset);
    contentRef.current.style.top = toPixel(220 + offset);
  }

  useEffect(handleScroll, [pageYOffset]);

  return (
    <Container>
      <Modal name={MODAL_VIDEO}>
        <iframe
          title="pitch"
          src="https://player.vimeo.com/video/347119375?color=ef2200&byline=0&portrait=0"
          width="100%"
          height="300"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </Modal>
      <NavBar>
        <>
          <Logo src="/images/header/logoh.svg" />
          <MenuIcon onClick={toggleMenu} />
        </>
      </NavBar>
      <BgContainer ref={bgContainerRef}>
        <div className="mask">
          <div className="content" ref={contentRef}>
            <TextSection
              title={t('title')}
              variant="white"
              bold
            />
            <PlayTitle onClick={openModal}>
              <PlayIcon src="/images/header/play.svg" />
              <span className="text" dangerouslySetInnerHTML={{__html: t('play')}} />
            </PlayTitle>
            <StyledButton onClick={scrollTo('contact')} type="button">{t('button')}</StyledButton>
          </div>
        </div>
      </BgContainer>
    </Container>
  )
}
