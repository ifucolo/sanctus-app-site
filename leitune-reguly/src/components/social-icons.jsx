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
    marginTop: '0px',
  }
});

const Icon = styled.div(p => ({
  width: '15px',
  height: '15px',
  cursor: 'pointer',
  backgroundImage: `url(${p.image})`,
  backgroundSize: '15px 15px',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  '&:hover': {
    backgroundImage: `url(${p.hover})`
  },
  [DESKTOP]: {
    padding: '10px',
  }
}));

export default function SocialIcons({variant}) {
  const icons = useMemo(() => {
    return [
      {
        image: {
          red: "/images/footer/facebook-red.png",
          white: "/images/footer/facebook-white.png",
          black: "/images/footer/facebook-black.png",
        }[variant],
        hover: {
          red: "/images/footer/facebook-black.png",
          white: "/images/footer/facebook-red.png",
          black: "/images/footer/facebook-red.png",
        }[variant],
        href: "https://www.facebook.com/leitunereguly/",
      },
      {
        image: {
          red: "/images/footer/instagram-red.png",
          white: "/images/footer/instagram-white.png",
          black: "/images/footer/instagram-black.png",
        }[variant],
        hover: {
          red: "/images/footer/instagram-black.png",
          white: "/images/footer/instagram-red.png",
          black: "/images/footer/instagram-red.png",
        }[variant],
        href: "https://www.instagram.com/leitunereguly/",
      },
      {
        image: {
          red: "/images/footer/linkedin-red.png",
          white: "/images/footer/linkedin-white.png",
          black: "/images/footer/linkedin-black.png"
        }[variant],
        hover: {
          red: "/images/footer/linkedin-black.png",
          white: "/images/footer/linkedin-red.png",
          black: "/images/footer/linkedin-red.png"
        }[variant],
        href: "https://www.linkedin.com/company/leitune-reguly-advogados/",
      },
      {
        image: {
          red: "/images/footer/medium-red.png",
          white: "/images/footer/medium-white.png",
          black: "/images/footer/medium-black.png",
        }[variant],
        hover: {
          red: "/images/footer/medium-black.png",
          white: "/images/footer/medium-red.png",
          black: "/images/footer/medium-red.png",
        }[variant],
        href: "https://medium.com/@leitunereguly",
      },
      {
        image: {
          red: "/images/footer/whatsapp-red.png",
          white: "/images/footer/whatsapp-white.png",
          black: "/images/footer/whatsapp-black.png",
        }[variant],
        hover: {
          red: "/images/footer/whatsapp-black.png",
          white: "/images/footer/whatsapp-red.png",
          black: "/images/footer/whatsapp-red.png",
        }[variant],
        href: "https://api.whatsapp.com/send?phone=5511977197550",
      }
    ]
  }, [variant]);

  return (
    <IconContainer>
      {icons.map(icon => (
        <a key={icon.image} href={icon.href} target="_blank" rel="noreferrer">
          <Icon image={icon.image} hover={icon.hover} />
        </a>
      ))}
    </IconContainer>
  )
}

SocialIcons.propTypes = {
  variant: PropTypes.oneOf(['red', 'white', 'black']).isRequired,
}
