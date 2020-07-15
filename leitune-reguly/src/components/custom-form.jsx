import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import {Form} from "@unform/web";
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import FormInput from "@src/components/form-input";
import * as _ from 'lodash'
import {store} from "@src/store";
import {ACTION_TYPES} from "@src/store/actions";
import {COLORS} from "@src/services/constants";
import {DESKTOP} from "@src/services/responsive";

const Container = styled.div({
  width: '100%',
  maxWidth: 'calc(100vw - 40px)',
  boxSizing: 'border-box',
  [DESKTOP]: {
    maxWidth: '500px',
  }
});

const Feedback = styled.div(p => ({
  background: 'none',
  border: `1px solid ${COLORS.Red}`,
  verticalAlign: 'center',
  textAlign: 'center',
  color: COLORS.Red,
  borderRadius: '8px',
  fontSize: '15px',
  lineHeight: '35px',
  height: '35px',
  opacity: p.visible ? '1' : '0',
  transition: 'opacity 0.1s',
  ...(p.size === 'small' ? {
    position: 'absolute',
    color: COLORS.White,
    border: `1px solid ${COLORS.White}`,
    marginTop: '26px',
    marginLeft: '-25px',
    width: '260px',
  } : {
    width: '100%',
  })
}));

export default function CustomForm({ inputs, onSubmit, showSuccessToast, clearAfterSubmit, size }) {
  const formRef = useRef(null);
  const {dispatch} = useContext(store);
  const [tid, setTid] = useState(0);
  const [feedback, setFeedback] = useState({
    message: 'Obrigado. Entraremos em contato em breve.',
    type: 'success',
    visible: false,
    size,
  });

  useEffect(() => {
    if (tid) clearTimeout(tid);
    if (feedback.visible) {
      const id = setTimeout(() => setFeedback({
        ...feedback,
        visible: false
      }), 5000);
      setTid(id);
    }
    return () => tid && clearTimeout(tid);
  }, [feedback]);

  const schema = useMemo(() => {
    const shape = {};
    inputs.filter(input => input.type !== 'submit').forEach(input => {
      _.set(shape, input.name, input.schema || Yup.string());
    })
    return Yup.object().shape(shape);
  }, [inputs]);

  const fields = useMemo(() => inputs.map(input => {
    return <FormInput {...input} size={size} key={input.name} />
  }), [inputs]);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      const validation = await schema.validate(data, {
        abortEarly: false,
      });
      await onSubmit(validation);
      let upload = {};
      if (data.file) {
        const formData = new FormData();
        formData.append('file', data.file);
        upload = await (await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })).json();
      }
      let file = null;
      if (upload.files) {
        file = upload.files.file.path;
      }
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({ ...data, file }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (showSuccessToast) {
        setFeedback({
          visible: true,
          message: size === 'small' ? 'Obrigado!' : 'Obrigado. Entraremos em contato em breve.',
          type: "success",
          size,
        })
      }
      if (clearAfterSubmit) {
        formRef.current.reset();
      }
    } catch (err) {
      console.error(err);
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          // validationErrors[error.path] = error.message; TODO - enable custom messages
          validationErrors[error.path] = "Obrigatório";
        });
      }
      formRef.current.setErrors(validationErrors);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} ref={formRef}>
        {fields}
      </Form>
      <Feedback {...feedback}>{feedback.message}</Feedback>
    </Container>
  )
}

CustomForm.propTypes = {
  onSubmit: PropTypes.func,
  showSuccessToast: PropTypes.bool,
  clearAfterSubmit: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'normal']),
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
      schema: PropTypes.object,
      accept: PropTypes.string,
      type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'tel', 'textarea', 'submit', 'file']).isRequired,
    }).isRequired,
  ).isRequired
};

CustomForm.defaultProps = {
  onSubmit: () => undefined,
  showSuccessToast: true,
  clearAfterSubmit: true,
  size: 'normal'
};
