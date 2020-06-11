import React, {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
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
  marginBottom: '10px',

  '&.-error': {
    borderColor: COLORS.Red,
  },

  '&:focus': {
    borderColor: COLORS.Black,
  },

  [DESKTOP]: {
    borderRadius: '5px',
    marginBottom: '20px',
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
});

const Button = styled(StyledButton)({
  width: '100%',
  marginBottom: '10px',

  [DESKTOP]: {
    height: '25px',
    width: '100%',
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '16px',
  }
});

const FileLabel = styled.label({
  ...defaultStyle,
  ...border,
  display: 'inline-block',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',

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

});

const Label = styled.label({

});

export default function FormInput({ name, type, label, placeholder, ...rest }) {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(placeholder);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  function onChange(e) {
    if (type === 'file') {
      console.dir(e.target);
      const [file] = e.target.files;
      setSelectedFile(file ? file.name : placeholder);
    }
  }

  const className = useMemo(() => ([
    ...(error ? ['-error'] : [])
  ]), [error]);

  const inputProps = {
    ...rest,
    placeholder,
    defaultValue,
    className,
    type,
    ref: inputRef,
    onChange,
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
    </FormRow>
  )
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  accept: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'tel', 'textarea', 'submit', 'file']).isRequired,
}

FormInput.defaultProps = {
  label: '',
  placeholder: '',
  accept: '',
}
