import React, {useMemo} from 'react';
import styled from 'styled-components';
import {useTranslation} from "react-i18next";
import {COLORS} from "@src/services/constants";
import SocialIcons from "@src/components/social-icons";

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'column'
});

const SpanEmail = styled.span({
  fontSize: '22px',
  lineHeight: '24px',
  marginBottom: '39px',
  textDecoration: 'none',
  display: 'inline-block',
  color: COLORS.Black,
});

const LocationName = styled.h3({
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '23px',
  margin: '20px 0 10px 0',
  textAlign: 'center',
  color: COLORS.Black,
});

const LocationPhone = styled.h4({
  fontWeight: 'normal',
  fontSize: '20px',
  lineHeight: '23px',
  color: COLORS.Gray,
});

const Disclaimer = styled.span({
  fontSize: '8px',
  lineHeight: '9px',
  color: COLORS.Gray,
  marginTop: '50px',
});

const A = styled.a({
  textDecoration: 'none'
})

export default function Footer() {
  const {t} = useTranslation('footer');

  const phones = useMemo(() => [
    {
      title: "São Paulo, SP",
      number: "+55 (11) 123456-6789"
    },
    {
      title: "Pelotas, RS",
      number: "+55 (53) 99126-5617"
    },
    {
      title: "Amsterdam, NL",
      number: "+31 (6) 644630812"
    }
  ], []);

  return (
    <Container>
      <A href="mailto:hello@leitunereguly.com">
        <SpanEmail>hello@leitunereguly.com</SpanEmail>
      </A>
      {phones.map(phone => (
        <A href={`tel:${phone.number}`} key={phone.number}>
          <LocationName>{phone.title}</LocationName>
          <LocationPhone>{phone.number}</LocationPhone>
        </A>
      ))}
      <SocialIcons variant="red" />
      <Disclaimer>{t('disclaimer')}</Disclaimer>
    </Container>
  );
}

