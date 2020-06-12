import React, {useMemo} from 'react';
import styled from 'styled-components';
import {COLORS} from "@src/services/constants";
import {useTranslation} from "react-i18next";
import {BulletList} from "@src/components/styled";
import {DESKTOP} from "@src/services/responsive";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  marginTop: '40px',
  [DESKTOP]: {
    maxWidth: '740px',
    marginTop: '100px',
    alignItems: 'flex-start',
  }
});

const Item = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

const Image = styled.img({
  height: '60px',
  width: '60px',
  [DESKTOP]: {
    height: '150px',
    width: '150px',
    marginLeft: '20px',
  }
});

const Arrow = styled.img({
  [DESKTOP]: {
    width: '85px',
  }
})

export default function DocumentsCompare() {
  const {t} = useTranslation('documents');
  const before = useMemo(() => {
    const data = t('before', { returnObjects: true });
    return data.map(i => <li key={i}>{i}</li>);
  }, []);
  const after = useMemo(() => {
    const data = t('after', { returnObjects: true });
    return data.map(i => <li key={i}>{i}</li>);
  }, []);
  return (
    <Container>
      <Item>
        <Image src="/images/about/paper.png" />
        <BulletList>
          {before}
        </BulletList>
      </Item>
      <Arrow src="/images/about/vector.svg" />
      <Item>
        <Image src="/images/about/file.png" />
        <BulletList>
          {after}
        </BulletList>
      </Item>
    </Container>
  )
}
