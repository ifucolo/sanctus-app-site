import React, {useMemo} from 'react';
import styled from "styled-components";
import {COLORS} from "@src/services/constants";
import PropTypes from 'prop-types';
import {DESKTOP} from "@src/services/responsive";

const IconContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  flexDirection: 'row',
  marginTop: '40px',

  [DESKTOP]: {
    width: '208px',
    marginTop: '10px',
  }
});

const Icon = styled.img({
  color: COLORS.Red,
  width: '15px',
  height: '15px',
  cursor: 'pointer',
});

export default function SocialIcons({variant}) {
  const icons = useMemo(() => {
    return [
      {
        image: {
          red: "/images/footer/facebook.png",
          white: "/images/footer/facebook2.png",
          black: "/images/footer/facebook3.png",
        }[variant],
        href: "https://facebook.com",
      },
      {
        image: {
          red: "/images/footer/instagram.png",
          white: "/images/footer/instagram2.png",
          black: "/images/footer/instagram3.png",
        }[variant],
        href: "https://facebook.com",
      },
      {
        image: {
          red: "/images/footer/linkedin.png",
          white: "/images/footer/linkedin2.png",
          black: "/images/footer/linkedin3.png"
        }[variant],
        href: "https://facebook.com",
      },
      {
        image: {
          red: "/images/footer/medium.png",
          white: "/images/footer/medium2.png",
          black: "/images/footer/medium3.png",
        }[variant],
        href: "https://facebook.com",
      },
      {
        image: {
          red: "/images/footer/whatsapp.png",
          white: "/images/footer/whatsapp2.png",
          black: "/images/footer/whatsapp3.png",
        }[variant],
        href: "https://facebook.com",
      }
    ]
  }, [variant]);

  return (
    <IconContainer>
      {icons.map(icon => (
        <a key={icon.image} href={icon.href}>
          <Icon src={icon.image} />
        </a>
      ))}
    </IconContainer>
  )
}

SocialIcons.propTypes = {
  variant: PropTypes.oneOf(['red', 'white', 'black']).isRequired,
}
