import React, {useMemo} from "react";
import {useTranslation} from "react-i18next";
import CustomForm from "@src/components/custom-form";
import * as Yup from 'yup';

export default function SmallContactForm() {
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
      name: 'submit',
      type: 'submit',
      label: t('form.submit.label-small'),
    }
  ]), []);

  return (
    <CustomForm size="small" inputs={inputs} />
  )
}
