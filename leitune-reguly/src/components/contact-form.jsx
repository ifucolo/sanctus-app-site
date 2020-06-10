import React, {useMemo} from "react";
import {useTranslation} from "react-i18next";
import CustomForm from "@src/components/custom-form";
import * as Yup from 'yup';

export default function ContactForm() {
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
      name: 'message',
      type: 'textarea',
      placeholder: t('form.message.placeholder'),
      schema: Yup.string().optional()
    },
    {
      name: 'submit',
      type: 'submit',
      label: t('form.submit.label'),
    }
  ]), []);

  return (
    <CustomForm inputs={inputs} />
  )
}