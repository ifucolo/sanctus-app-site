import React, {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes, {func} from 'prop-types';
import { useField } from '@unform/core';
import styled from 'styled-components';
import {COLORS} from "@src/services/constants";
import {StyledButton} from "@src/components/styled";
import {DESKTOP} from "@src/services/responsive";

const defaultStyle = {
  borderRadius: '8px',
  fontSize: '14px',
  lineHeight: '16px',
  height: '35px',
  padding: '6px',
  boxSizing: 'border-box',
  width: '100%',
  outline: 'none',
  fontWeight: 'normal',

  '&.-error': {
    borderColor: COLORS.Red,
  },

  '&:focus': {
    borderColor: COLORS.Black,
  },

  [DESKTOP]: {
    borderRadius: '5px',
    height: '65px',
    fontSize: '24px',
    lineHeight: '28px',

    '&.-small': {
      height: '34px',
      fontSize: '14px',
      lineHeight: '16px',
    }
  }
}

const border = {
  border: `1px solid ${COLORS.Gray}`,
  backgroundColor: COLORS.White,
}

const Input = styled.input({
  ...defaultStyle,
  ...border,
});

const TextArea = styled.textarea({
  ...defaultStyle,
  ...border,
  resize: 'none',
  height: '200px',

  [DESKTOP]: {
    height: '200px',
    fontSize: '24px',
    lineHeight: '28px',
  }
});

const Button = styled(StyledButton)({
  width: '100%',
  marginBottom: '10px',

  [DESKTOP]: {
    width: '100%',
    '&.-small': {
      height: '34px',
      fontSize: '14px',
      lineHeight: '16px',
    }
  }
});

const FileLabel = styled.label({
  ...defaultStyle,
  ...border,
  display: 'inline-block',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',

  [DESKTOP]: {
    ...defaultStyle[DESKTOP],
    padding: '18px 6px',
  },

  span: {
    padding: '4px 8px',
    backgroundColor: COLORS.Red,
    color: COLORS.White,
    border: 'none',
    borderRadius: '4px',
    marginRight: '5px'
  }
});

const FormRow = styled.div({
  position: 'relative',
  marginBottom: '10px',
  [DESKTOP]: {
    marginBottom: '20px',
  }
});

const Label = styled.label({

});

const Error = styled.span({
  color: COLORS.Red,
  boxSizing: 'border-box',
  position: 'absolute',
  zIndex: '900',
  whiteSpace: 'nowrap',
  borderRadius: '8px',
  height: '100%',
  right: '10px',
  top: '0px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '14px',
  lineHeight: '16px',
});

export default function FormInput({ name, type, label, placeholder, size, ...rest }) {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(placeholder);
  const [timeoutId, setTimeoutId] = useState(0);
  const { fieldName, defaultValue, registerField, error, clearError } = useField(name);

  useEffect(() => {
    const opts = {
      name: fieldName,
      ref: inputRef.current,
      path: type === 'file' ? 'files[0]' : 'value',
    }
    registerField(opts);
    console.log(type, opts);
  }, [fieldName, registerField, type]);

  // useEffect(() => {
  //   if (error) {
  //     if (timeoutId) clearTimeout(timeoutId);
  //     const id = setTimeout(() => clearError(), 5000);
  //     setTimeoutId(id);
  //   }
  // }, [error])

  function onChange(e) {
    if (type === 'file') {
      const [file] = e.target.files;
      setSelectedFile(file ? file.name : placeholder);
    }
  }

  function onFocus(e) {
    clearError();
  }

  const className = useMemo(() => ([
    ...(error ? ['-error'] : []),
    `-${size}`,
  ]), [error]);

  const inputProps = {
    ...rest,
    placeholder,
    defaultValue,
    className,
    type,
    ref: inputRef,
    onChange,
    onFocus,
    novalidate: 'novalidate'
  }

  const showLabel = useMemo(() => !['file', 'submit'].includes(type), [type]);

  function createInput() {
    switch (type) {
      case 'textarea':
        return <TextArea {...inputProps} />;
      case 'submit':
        return <Button {...inputProps}>{label}</Button>
      case 'file':
        return (
          <FileLabel>
            {label && (
              <span>
                {label}
              </span>
            )}
            {selectedFile}
            <input {...inputProps} style={{visibility: 'hidden'}} />
          </FileLabel>
        )
      default:
        return <Input {...inputProps} />;
    }
  }

  return (
    <FormRow>
      {showLabel && label && <Label>{label}</Label>}
      {createInput()}
      {error && <Error>{error}</Error>}
    </FormRow>
  )
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  accept: PropTypes.string,
  size: PropTypes.oneOf(['small', 'normal']),
  type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'tel', 'textarea', 'submit', 'file']).isRequired,
}

FormInput.defaultProps = {
  label: '',
  placeholder: '',
  accept: '',
  size: 'normal',
}
