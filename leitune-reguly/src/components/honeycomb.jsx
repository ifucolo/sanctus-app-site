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
  '&:hover': {
    backgroundImage: 'url(/images/hexagon/hexagon-filled.png)',
  }
}));

const Icon = styled.img({
  width: '100px',
  height: '100px',
  pointerEvents: 'auto',
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

const ITEM_POSITIONS = [
  [CENTER[0], CENTER[1]],
  [CENTER[0], CENTER[1] - ITEM_HEIGHT],
  [CENTER[0] + ITEM_WIDTH/1.25, CENTER[1] - ITEM_HEIGHT/2],
  [CENTER[0] + ITEM_WIDTH/1.25, CENTER[1] + ITEM_HEIGHT/2],
  [CENTER[0], CENTER[1] + ITEM_HEIGHT],
  [CENTER[0] - ITEM_WIDTH/1.25, CENTER[1] + ITEM_HEIGHT/2],
  [CENTER[0] - ITEM_WIDTH/1.25, CENTER[1] - ITEM_HEIGHT/2],
];

const TITLE_POSITIONS = [
  [0, 0, 'right'],
  [550, -5, 'right'],
  [765, 178, 'right'],
  [765, 370, 'right'],
  [240, 555, 'left'],
  [23, 370, 'left'],
  [23, 178, 'left'],
]

const MODAL_HONEYCOMB = "MODAL_HONEYCOMB ";

export default function Honeycomb() {
  const { items } = useSpecialitiesList();
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
            title={`${modalData.title}<br /><em>${modalData.featured}</em>`}
          />
          <BulletList size="large">
            {modalData.items.map(item => {
              return <li key={item}>{item}</li>
            })}
          </BulletList>
        </Card>
      </Modal>
      <Content>
        {
          items.map((item, i) => (
            <>
              <Item position={ITEM_POSITIONS[i] || [0, 0]} onClick={() => toggleModal(item)} >
                <Icon src={item.image} alt={item.featured} />
              </Item>
              <Title position={TITLE_POSITIONS[i] || [0,0]}>{item.featured}</Title>
            </>
          ))
        }
      </Content>
    </Container>
  )
}
