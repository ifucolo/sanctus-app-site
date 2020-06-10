import React, {useMemo} from 'react';
import styled from 'styled-components';
import {useTranslation} from "react-i18next";
import {COLORS} from "@src/components/constants";

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'column'
});

const SpanEmail = styled.span({
  fontSize: '18px',
  lineHeight: '21px',
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

const IconContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  flexDirection: 'row',
  marginTop: '40px',
});

const Icon = styled.img({
  color: COLORS.Red,
  width: '15px',
  height: '15px',
});

const A = styled.a({
  textDecoration: 'none'
})

export default function Footer() {
  const {t} = useTranslation('footer');

  const icons = useMemo(() => {
    return [
      {
        image: "/images/footer/facebook.svg",
        href: "https://facebook.com",
      },
      {
        image: "/images/footer/instagram.svg",
        href: "https://facebook.com",
      },
      {
        image: "/images/footer/linkedin.svg",
        href: "https://facebook.com",
      },
      {
        image: "/images/footer/medium.svg",
        href: "https://facebook.com",
      },
      {
        image: "/images/footer/whatsapp.svg",
        href: "https://facebook.com",
      }
    ]
  }, []);

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
      <IconContainer>
        {icons.map(icon => (
          <a key={icon.image} href={icon.href}>
            <Icon src={icon.image} />
          </a>
        ))}
      </IconContainer>
      <Disclaimer>{t('disclaimer')}</Disclaimer>
    </Container>
  );
}

