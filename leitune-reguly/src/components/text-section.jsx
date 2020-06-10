import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {StyledParagraph, StyledTitle} from "@src/components/styled";

const Container = styled.div({
  marginTop: '30px'
})

const SIZES = {
  normal: {
    fontSize: "20px",
    lineHeight: "23px",
  },
  small: {
    fontSize: "12px",
    lineHeight: "14px",
  }
}

export default function TextSection({ title, text, variant, size, }) {
  return (
    <Container>
      <StyledTitle variant={variant} dangerouslySetInnerHTML={{__html: title}} />
      {text && (<StyledParagraph {...SIZES[size]} dangerouslySetInnerHTML={{__html: text}} />)}
    </Container>
  )
}

TextSection.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  size: PropTypes.oneOf(['small', 'normal']),
  variant: PropTypes.oneOf(['black','white']),
};

TextSection.defaultProps = {
  text: null,
  size: 'normal',
  variant: 'black'
}
