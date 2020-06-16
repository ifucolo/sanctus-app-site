import React, {useState} from "react";
import styled from 'styled-components';
import {useSpecialitiesList} from "@src/services/specialities";
import {toPixel} from "@src/services/utils";
import {COLORS} from "@src/services/constants";
import TextSection from "@src/components/text-section";
import {BulletList, Close} from "@src/components/styled";
import Modal from "@src/components/modal";
import {useController} from "@src/store/controllers";
import CloseIcon from "@material-ui/icons/Close";
import {useTranslation} from "react-i18next";

const CONTAINER_WIDTH = 1000;
const CONTAINER_HEIGHT = 600;
const ITEM_WIDTH = 210;
const ITEM_HEIGHT = 192;
const TITLE_WIDTH = 210;
const TITLE_HEIGHT = 24;

const CENTER = [ (CONTAINER_WIDTH/2) - (ITEM_WIDTH/2), (CONTAINER_HEIGHT/2) - (ITEM_HEIGHT/2) ]

const Container = styled.div({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '50px 0'
})

const Content = styled.div({
  position: 'relative',
  width: toPixel(CONTAINER_WIDTH),
  height: toPixel(CONTAINER_HEIGHT),
});

const Item = styled.div(p => ({
  cursor: 'pointer',
  width: toPixel(ITEM_WIDTH),
  height: toPixel(ITEM_HEIGHT),
  backgroundImage: p.filled ? 'url(/images/hexagon/hexagon-filled.png)' : 'url(/images/hexagon/hexagon.png)',
  '&:first-child': {
    backgroundImage: 'url(/images/hexagon/hexagon-filled.png)',
  },
  backgroundSize: 'contain',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  left: toPixel(p.position[0]),
  top: toPixel(p.position[1]),
  pointerEvents: 'none',

  '.-no-hover': {
    display: 'block',
  },

  '.-hover': {
    display: 'none'
  },

  '&:hover': {
    backgroundImage: 'url(/images/hexagon/hexagon-filled.png)',

    '.-no-hover': {
      display: 'none',
    },

    '.-hover': {
      display: 'block'
    },
  },
}));

const HoverHelper = styled.div({
  pointerEvents: 'auto',
  position: 'absolute',
  width: '105px',
  height: '180px',
  // background: 'blue',
  '&:before': {
    content: "''",
    width: '50px',
    height: '93px',
    position: 'absolute',
    // background: 'yellow',
    transform: 'skew(60deg,-60deg)',
    pointerEvents: 'auto',
    top: '44px',
    left: '27px',
  },
  '&:after': {
    content: "''",
    width: '50px',
    height: '93px',
    position: 'absolute',
    // background: 'black',
    transform: 'skew(-60deg,60deg)',
    pointerEvents: 'auto',
    top: '44px',
    left: '27px',
  }
})

const Icon = styled.img({
  width: '100px',
  height: '100px',
});

export const Title = styled.span(p => ({
  display: 'block',
  borderBottom: `4px dashed ${COLORS.Red}`,
  width: toPixel(TITLE_WIDTH),
  height: toPixel(TITLE_HEIGHT),
  position: 'absolute',
  fontSize: '20px',
  lineHeight: '23px',
  color: COLORS.Black,
  left: toPixel(p.position[0]),
  top: toPixel(p.position[1]),
  textAlign: p.position[2],
}));


const Card = styled.div({
  backgroundColor: COLORS.White,
  padding: '20px 40px 80px 40px',
  boxSizing: 'border-box',
  position: 'relative',
  maxWidth: '1000px',
  width: '1000px',
});

const CardImageBg = styled.div(p => ({
  cursor: 'pointer',
  width: toPixel(ITEM_WIDTH),
  height: toPixel(ITEM_HEIGHT),
  backgroundImage: 'url(/images/hexagon/hexagon-filled.png)',
  backgroundSize: 'contain',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  right: "90px",
  top: "calc(50% - 100px)",
  pointerEvents: 'none',
}));

const LearnMore = styled.span({
  fontSize: '20px',
  lineHeight: '23px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  color: COLORS.Red,
  background: COLORS.White,
  padding: '10px',
  borderRadius: '8px',
})

const ITEM_POSITIONS = [
  { // STARTUP
    card: [CENTER[0], CENTER[1]],
    label: null,
  },
  { // EMPRESARIAL
    card: [CENTER[0], CENTER[1] - ITEM_HEIGHT],
    label: [550, -5, 'right'],
  },
  // TRIBUTARIO
  {
    card: [CENTER[0] - ITEM_WIDTH/1.25, CENTER[1] + ITEM_HEIGHT/2],
    label:   [23, 370, 'left'],
  },
  // TRABALHISTA
  {
    card: [CENTER[0] - ITEM_WIDTH/1.25, CENTER[1] - ITEM_HEIGHT/2],
    label: [23, 178, 'left'],
  },
   // CIVIL
  {
    card: [CENTER[0] + ITEM_WIDTH/1.25, CENTER[1] - ITEM_HEIGHT/2],
    label:   [765, 178, 'right'],
  },
   // CONSUMIDOR
  {
    card: [CENTER[0], CENTER[1] + ITEM_HEIGHT],
    label:   [240, 555, 'left'],
  },
   // PENAL
  {
    card: [CENTER[0] + ITEM_WIDTH/1.25, CENTER[1] + ITEM_HEIGHT/2],
    label: [765, 370, 'right'],
  },
];

const MODAL_HONEYCOMB = "MODAL_HONEYCOMB ";

export default function Honeycomb() {
  const { items } = useSpecialitiesList();
  const {t} = useTranslation('carousel');
  const [state, { openModal, closeModal }] = useController();
  const [modalData, setModalData] = useState({
    image: '',
    title: '',
    featured: '',
    items: [],
  });

  function toggleModal(data) {
    setModalData(data);
    openModal(MODAL_HONEYCOMB);
  }

  return (
    <Container>
      <Modal name={MODAL_HONEYCOMB}>
        <Card>
          <Close onClick={closeModal}>
            <CloseIcon />
          </Close>
          <CardImageBg>
            <Icon src={modalData.image} alt={modalData.featured} />
          </CardImageBg>
          <TextSection
            text={modalData.text}
            title={modalData.title}
          />
          <br />
          <BulletList size="large">
            {modalData.items.map(item => {
              return <li key={item} dangerouslySetInnerHTML={{__html: item}}/>
            })}
          </BulletList>
        </Card>
      </Modal>
      <Content>
        {
          items.map((item, i) => {
            const {card, label} = ITEM_POSITIONS[i] || {};
            return (
              <>
                <Item key={label} position={card} onClick={() => toggleModal(item)} >
                  <HoverHelper />
                  <Icon className="-no-hover" src={item.image} alt={item.featured} />
                  <LearnMore className="-hover">{t('hover.button')}</LearnMore>
                </Item>
                {label && <Title position={label}>{item.featured}</Title>}
              </>
            )
          })
        }
      </Content>
    </Container>
  )
}
