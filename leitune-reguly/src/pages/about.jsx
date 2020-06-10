import React from 'react';
import Head from 'next/head'
import {useTranslation} from "react-i18next";
import ModalHeader from "@src/components/modal-header";
import styled from "styled-components";
import TextSection from "@src/components/text-section";
import ContactForm from "@src/components/contact-form";
import Footer from "@src/components/footer";
import CnjDataCircles from "@src/components/cnj-data-circles";
import DocumentsCompare from "@src/components/documents-compare";
import {InnerSection, Section} from "@src/components/styled";
import {MainSection} from "@src/components/main-section";

const Strong = styled.strong({
  fontSize: '12px',
  fontHeight: '14px',
  textAlign: 'center',
  marginTop: '30px',
  fontWeight: 'bold'
});

const TopImage = styled.img({
  width: '80px',
  height: '46px',
  position: 'absolute',
  top: '15px',
  left: '15px',
})

const Brain = styled.img({
  width: '100%',
})

export default function About() {
  const { t } = useTranslation('body');

  return (
    <div className="container">
      <MainSection>
        <>
          <ModalHeader />
          <TopImage src="/images/about/design-law.svg" />
          <Section>
            <InnerSection>
              <TextSection
                title={t('designlaw.title')}
                text={t('designlaw.text')}
              />
            </InnerSection>
            <InnerSection>
              <TextSection
                title={t('cnjdata.title')}
                text=""
              />
              <CnjDataCircles />
              <Strong>{t('cnjdata.strong')}</Strong>
              <DocumentsCompare />
            </InnerSection>
            <InnerSection>
              <TextSection
                title={t('brain.title')}
                text={t('brain.text')}
                size="small"
              />
              <Brain src='/images/brain.svg' />
              <Strong>{t('brain.strong')}</Strong>
            </InnerSection>
            <InnerSection marginSize="small">
              <TextSection
                title={t('contact.title')}
                text={t('contact.text')}
              />
              <ContactForm />
            </InnerSection>
            <InnerSection>
              <Footer />
            </InnerSection>
          </Section>
        </>
      </MainSection>
    </div>
  )
}
