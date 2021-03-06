import React, {useMemo} from 'react';
import styled from 'styled-components';
import {useTranslation} from "react-i18next";
import {COLORS} from "@src/services/constants";
import SocialIcons from "@src/components/social-icons";
import {DESKTOP} from "@src/services/responsive";

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  width: '100%',
  [DESKTOP]: {
    alignItems: 'flex-start',
  }
});

const Content = styled.div({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  [DESKTOP]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '60px',
  }
})

const SpanEmail = styled.span({
  fontSize: '22px',
  lineHeight: '24px',
  marginBottom: '39px',
  textDecoration: 'none',
  display: 'inline-block',
  color: COLORS.Black,

  '&:hover': {
    color: COLORS.Red,
  },

  [DESKTOP]: {
    marginBottom: '0',
    fontSize: '30px',
    lineHeight: '35px',
  }
});

const LocationName = styled.h3({
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '23px',
  margin: '20px 0 10px 0',
  textAlign: 'center',
  color: COLORS.Black,

  [DESKTOP]: {
    fontSize: '26px',
    lineHeight: '30px',
  }
});

const LocationPhone = styled.h4({
  fontWeight: 'normal',
  fontSize: '20px',
  lineHeight: '23px',
  userSelect: 'all',
  color: COLORS.Gray,
  [DESKTOP]: {
    fontSize: '24px',
    lineHeight: '28px',
  }
});

const Disclaimer = styled.span({
  fontSize: '8px',
  lineHeight: '9px',
  color: COLORS.Gray,
  marginTop: '50px',

  [DESKTOP]: {
    fontSize: '16px',
    lineHeight: '19px',
    marginTop: '93px',
  }
});

const A = styled.a({
  textDecoration: 'none'
});

const SocialIconsContainer = styled.div({
  marginLeft: '-10px',
  width: '100%',
  [DESKTOP]: {
    width: 'auto',
  }
})

export default function Footer() {
  const {t} = useTranslation('footer');

  const phones = useMemo(() => [
    {
      title: "São Paulo, SP",
      number: "+55 (11) 97719-7550"
    },
    {
      title: "Pelotas, RS",
      number: "+55 (53) 98119-4198"
    },
    {
      title: "Amsterdam, NL",
      number: "+ 31 (6) 4463-0812"
    }
  ], []);

  return (
    <Container>
      <Content>
        <A href="mailto:hello@leitunereguly.com">
          <SpanEmail>hello@leitunereguly.com</SpanEmail>
        </A>
        {phones.map(phone => (
          <div>
            <A href={`tel:${phone.number}`} key={phone.number}>
              <LocationName>{phone.title}</LocationName>
            </A>
            <LocationPhone>{phone.number}</LocationPhone>
          </div>
        ))}
      </Content>
      <SocialIconsContainer>
        <SocialIcons variant="red" />
      </SocialIconsContainer>
      <Disclaimer>{t('disclaimer')}</Disclaimer>
    </Container>
  );
}

