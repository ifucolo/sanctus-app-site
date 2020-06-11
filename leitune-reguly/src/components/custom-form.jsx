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

const Container = styled.div({
  width: '100%',
  maxWidth: 'calc(100vw - 40px)',
  boxSizing: 'border-box'
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
  width: '100%',
  opacity: p.visible ? '1' : '0',
  transition: 'opacity 0.1s',
}));

export default function CustomForm({ inputs, onSubmit, showSuccessToast, clearAfterSubmit }) {
  const formRef = useRef(null);
  const {dispatch} = useContext(store);
  const [tid, setTid] = useState(0);
  const [feedback, setFeedback] = useState({
    message: '',
    type: 'success',
    visible: false,
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
    return <FormInput {...input} key={input.name} />
  }), [inputs]);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      const validation = await schema.validate(data, {
        abortEarly: false,
      });
      await onSubmit(validation);
      if (showSuccessToast) {
        // dispatch({
        //   type: ACTION_TYPES.SHOW_TOAST,
        //   data: {
        //     type: 'success',
        //     text: 'Mensagem enviada.'
        //   }
        // });
        setFeedback({
          visible: true,
          message: 'Obrigado. Entraremos em contato em breve.',
          type: "success",
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
          validationErrors[error.path] = error.message;
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
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
      schema: PropTypes.object,
      accept: PropTypes.string,
      type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'tel', 'textarea', 'submit']).isRequired,
    }).isRequired,
  ).isRequired
};

CustomForm.defaultProps = {
  onSubmit: () => undefined,
  showSuccessToast: true,
  clearAfterSubmit: true,
};
