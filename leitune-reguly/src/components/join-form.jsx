import React, {useMemo} from "react";
import {useTranslation} from "react-i18next";
import CustomForm from "@src/components/custom-form";
import * as Yup from 'yup';
import styled from "styled-components";
import {DESKTOP} from "@src/services/responsive";

const Container = styled.div({
  width: '100%',
  [DESKTOP]: {
    width: '500px',
    paddingTop: '50px',
  }
})

export default function JoinForm() {
  const {t} = useTranslation('contact');
  const inputs = useMemo(() => ([
    {
      name: 'name',
      type: 'text',
      placeholder: t('form.name.placeholder'),
      schema: Yup.string().min(3).required()
    },
    {
      name: 'email',
      type: 'email',
      placeholder: t('form.email.placeholder'),
      schema: Yup.string().email().required()
    },
    {
      name: 'phone',
      type: 'tel',
      placeholder: t('form.phone.placeholder'),
      schema: Yup.string().optional()
    },
    {
      name: 'file',
      type: 'file',
      label: t('form.file.label'),
      placeholder: t('form.file.placeholder'),
      accept: 'application/pdf',
      schema: Yup.mixed().optional(),
    },
    {
      name: 'message',
      type: 'textarea',
      placeholder: t('form.message.placeholder'),
      schema: Yup.string().optional()
    },
    {
      name: 'submit',
      type: 'submit',
      placeholder: t('form.submit.placeholder'),
      label: t('form.submit.label'),
    }
  ]), []);

  return (
    <Container>
      <CustomForm inputs={inputs} />
    </Container>
  )
}
