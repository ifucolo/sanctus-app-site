import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import {COLORS, DESKTOP_MENU_SCROLL_TRIGGER, MEDIA_DEVICES} from "@src/services/constants";
import {useTranslation} from "react-i18next";
import {PlainButton, StyledButton, StyledTitle} from "@src/components/styled";
import NavBar from "@src/components/nav-bar";
import {containBackground, scrollTo, toPixel} from '@src/services/utils';
import {store} from "@src/store";
import {ACTION_TYPES} from "@src/store/actions";
import Modal from "@src/components/modal";
import {useScrollListener} from "@src/services/scroll";
import TextSection from "@src/components/text-section";
import {DESKTOP, media, useResizeListener} from "@src/services/responsive";
import CustomForm from "@src/components/custom-form";
import {useController} from "@src/store/controllers";
import SmallContactForm from "@src/components/small-contact-form";

const Container = styled.section({
  width: '100%',
  height: 688,
  // overflow: 'hidden',
  boxSizing: 'border-box',
});

const Logo = styled.div(p => ({
  ...containBackground('/images/header/logo.png'),
  width: '80px',
  height: '24px',
  cursor: 'pointer',

  [DESKTOP]: {
    ...(p.sticky ? {
      backgroundImage: "url(/images/header/logo-small.png)",
      backgroundPosition: 'left center',
      width: '250px',
      height: '37px',
      '&:hover': {
        backgroundImage: "url(/images/header/logo-small-hover.png)",
      }
    } : {
      backgroundImage: "url(/images/header/logo-wide.png)",
      width: '250px',
      minWidth: '200px',
      height: '105px',
    })
  },
}));

const BgContainer = styled.div(p => ({
  width: '100%',
  height: 640,
  backgroundImage: 'url("/images/header/header.png")',
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "initial",
  backgroundSize: "cover",
  backgroundColor: '#000',
  borderBottom: `9px solid ${COLORS.Red}`,
  boxSizing: 'border-box',
  marginTop: 0,
  position: 'relative',

  [DESKTOP]: {
    backgroundImage: 'url("/images/header/header-wide.png")',
    height: '726px',
    borderBottom: `16px solid ${COLORS.Red}`,
  },

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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxSizing: 'border-box',

      '.title-container': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',

        alignItems: 'center',
        width: '100%',

        [DESKTOP] : {
          alignItems: 'flex-start',
          width: 'auto',
        }
      },

      [DESKTOP]: {
        alignItems: 'flex-start',
        padding: '0px 150px',
        top: '265px',
      }
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
  cursor: 'pointer',

  [DESKTOP]: {
    flexDirection: 'row',
    marginTop: '20px',
  },

  '.text': {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '20px',
    textAlign: 'center',
    padding: '7px',

    [DESKTOP]: {
      fontSize: '20px',
      lineHeight: '24px',
    }
  },

  '.featured': {
    fontStyle: 'italic',
  },

  '.icon': {
    fontSize: '40px',
  },

  em: {
    fontStyle: 'italic',
  },

  '&:hover': {
    '.play-icon': {
      ...containBackground('/images/header/play-hover.png'),
    },
    '.text': {
      color: COLORS.Red,
    }
  }
}));

const PlayIcon = styled.div({
  width: '30px',
  height: '30px',
  ...containBackground('/images/header/play.png'),
});

const Card = styled.div({
  background: COLORS.White,
  width: '260px',
  padding: '24px',
  boxSizing: 'border-box',
  borderRadius: '5px',
  marginTop: '-45px',

  h2: {
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '26px',
    color: COLORS.Black,
  },

  p: {
    fontWeight: '300',
    fontSize: '16px',
    lineHeight: '19px',
    color: COLORS.Gray,
    margin: '20px 0'
  }
});


const ArrowCircle = styled.div({
  width: '40px',
  height: '40px',
  background: COLORS.Red,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  left: 'calc(50% - 20px)',
  bottom: '-5px',

  '.arrow': {
    ...containBackground('/images/header/seta.png'),
    width: '20px',
    height: '20px',
  }
})

const MODAL_VIDEO = 'MODAL_VIDEO';

export default function MainHeader() {
  const { t } = useTranslation('header');
  const [state, controller]  = useController()
  const {pageYOffset} = useScrollListener();
  const { isDesktop } = useResizeListener();
  const bgContainerRef = useRef(null);
  const contentRef = useRef(null);
  const [sticky, setSticky] = useState(false);

  const openModal = () => controller.openModal(MODAL_VIDEO);
  const toggleMenu = () => {
    scrollTo('top')();
    if (state.nav.open) {
      controller.closeMenu();
    } else {
      controller.openMenu();
    }
    scrollTo('')();
  }

  function handleScroll() {
    const offset = Math.min(pageYOffset/4, isDesktop ? 100 : 75);
    const base = isDesktop ? 260 : 220
    bgContainerRef.current.style.marginTop = toPixel(-offset);
    contentRef.current.style.top = toPixel(base + offset);
    if (sticky && pageYOffset < DESKTOP_MENU_SCROLL_TRIGGER) {
      setSticky(false);
    }
    if (!sticky && pageYOffset >= DESKTOP_MENU_SCROLL_TRIGGER) {
      setSticky(true);
    }
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
          <PlainButton style={{width: 'auto', height: 'auto'}} onClick={scrollTo('top')}><Logo sticky={sticky} /></PlainButton>
          {!isDesktop && <MenuIcon onClick={toggleMenu} />}
        </>
      </NavBar>
      <BgContainer ref={bgContainerRef}>
        <div className="mask">
          <div className="content" ref={contentRef}>
            <div className="title-container">
              <TextSection
                title={t('title')}
                variant="white"
                bold
                large
              />
              <PlayTitle onClick={openModal}>
                <PlayIcon className="play-icon" />
                <span className="text" dangerouslySetInnerHTML={{__html: t('play')}} />
              </PlayTitle>
              {!isDesktop && <StyledButton onClick={scrollTo('contact')} type="button">{t('button')}</StyledButton>}
            </div>
            {isDesktop && (
              <Card>
                <h2>{t('contact.title')}</h2>
                <p>{t('contact.description')}</p>
                <SmallContactForm />
              </Card>
            )}
          </div>
        </div>
        {isDesktop && <ArrowCircle><div className="arrow" /></ArrowCircle>}
      </BgContainer>
    </Container>
  )
}
