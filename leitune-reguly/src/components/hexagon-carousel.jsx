import React, {useContext, useMemo, useState} from 'react';
import styled from 'styled-components';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Carousel } from 'react-responsive-carousel';
import {COLORS} from "@src/services/constants";
import Modal from "@src/components/modal";
import TextSection from "@src/components/text-section";
import {BulletList, Close} from "@src/components/styled";
import {useController} from "@src/store/controllers";
import {useSpecialitiesList} from "@src/services/specialities";
import CloseIcon from "@material-ui/icons/Close";

const Item = styled.div({
  backgroundColor: COLORS.LightGray,
  height: '270px',
  width: '300px',
  flexDirection: 'column',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const HexagonWrapper = styled.div({
  height: '200px',
  width: '200px!important',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Hexagon = styled.img({
  height: '192px',
  width: '209px!important',
  position: 'absolute',
});

const Icon = styled.img({
  height: '100px!important',
  width: '100px!important',
});

const Span = styled.span({
  fontSize: '20px',
  lineHeight: '23px',
  textAlign: 'center',
})

const Container = styled.div({
  maxWidth: '300px',
  '.dot-indicator': {
    fontSize: '10px',
    color: COLORS.Red,
  }
});

const Arrow = styled.div({
  color: COLORS.Red,
  position: 'absolute',
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '24px',
  boxSizing: 'border-box',
  paddingBottom: '70px',

  '&.next': {
    right: 0,
    zIndex: 10,
  },

  '&.prev': {
    left: 0,
    zIndex: 10,
  }
});

const Card = styled.div({
  backgroundColor: COLORS.White,
  padding: '20px 40px 80px 40px',
  boxSizing: 'border-box',
  position: 'relative',
});

const CardImage = styled.img({
  opacity: '0.5',
  position: 'absolute',
  top: '20px',
  left: '20px',
  width: '50px',
});

const Indicator = styled.li(p => ({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  border: `2px solid ${COLORS.Red}`,
  display: 'inline-block',
  margin: '55px 5px 0 5px',
  background: p.isSelected ? COLORS.Red : 'none',
}))

const MODAL_HEXAGONS = 'MODAL_HEXAGONS';

export default function HexagonCarousel() {
  const { items } = useSpecialitiesList();
  const [state, { openModal, closeModal }] = useController();

  const [modalData, setModalData] = useState({
    image: '',
    title: '',
    featured: '',
    items: [],
  })

  function toggleModal(data) {
    setModalData(data);
    openModal(MODAL_HEXAGONS);
  }

  return (
    <Container>
      <Modal name={MODAL_HEXAGONS}>
        <Card>
          <Close onClick={closeModal}>
            <CloseIcon />
          </Close>
          <CardImage src={modalData.image} alt={modalData.featured} />
          <TextSection
            text={modalData.text}
            title={modalData.title}
          />
          <BulletList size="large">
            {modalData.items.map(item => {
              return <li key={item} dangerouslySetInnerHTML={{__html: item}} />
            })}
          </BulletList>
        </Card>
      </Modal>
      <Carousel
        autoPlay={false}
        // showIndicators={false}
        showThumbs={false}
        showStatus={false}
        renderArrowNext={(clickHandler, hasNext) => hasNext ? <Arrow className="next" onClick={clickHandler}><ArrowForwardIosIcon /></Arrow> : null}
        renderArrowPrev={(clickHandler, hasNext) => hasNext ? <Arrow className="prev" onClick={clickHandler}><ArrowBackIosIcon /></Arrow> : null}
        renderIndicator={(clickHandler, isSelected) => <Indicator isSelected={isSelected} />}
      >
        {items.map(item => (
          <Item key={item.image} onClick={() => toggleModal(item)}>
            <HexagonWrapper>
              <Hexagon src="/images/hexagon/hexagon.png" />
              <Icon src={item.image} alt={item.featured} />
            </HexagonWrapper>
            <Span>{item.featured}</Span>
          </Item>
        ))}
      </Carousel>
    </Container>
  )
}
