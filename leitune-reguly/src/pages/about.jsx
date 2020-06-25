import React from 'react';
import Link from 'next/link';
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import TextSection from "@src/components/text-section";
import ContactForm from "@src/components/contact-form";
import Footer from "@src/components/footer";
import CnjDataCircles from "@src/components/cnj-data-circles";
import DocumentsCompare from "@src/components/documents-compare";
import {Center, InnerSection, PageCloseWrapper, Section} from "@src/components/styled";
import {MainSection} from "@src/components/main-section";
import CloseIcon from "@material-ui/icons/Close";
import {DESKTOP, useResizeListener} from "@src/services/responsive";

const Strong = styled.strong({
  fontSize: '12px',
  fontHeight: '14px',
  textAlign: 'center',
  marginTop: '30px',
  fontWeight: 'bold',
  [DESKTOP]: {
    fontSize: '30px',
    fontHeight: '35px',
    maxWidth: '820px',
    marginTop: '70px',
  }
});

const TopImage = styled.img({
  width: '80px',
  height: '46px',
  position: 'absolute',
  top: '15px',
  left: '15px',
  [DESKTOP]: {
    left: '100px',
    width: '140px',
    height: '80px',
  }
});

const Brain = styled.img({
  width: '100%',
  [DESKTOP]: {
    marginTop: '70px',
  }
});

export default function About() {
  const { t } = useTranslation('body');
  const { isDesktop } = useResizeListener();

  return (
    <div className="container">
      <MainSection>
        <>
          <Link href="/">
            <PageCloseWrapper>
              <CloseIcon />
            </PageCloseWrapper>
          </Link>
          <TopImage src="/images/about/design-law.svg" />
          <Section>
            <InnerSection justify="center">
              <TextSection
                center
                large
                title={t('designlaw.title')}
                text={t('designlaw.text')}
              />
            </InnerSection>
            <InnerSection direction="column">
              <TextSection
                title={t('cnjdata.title')}
                text=""
              />
              <CnjDataCircles />
              <Center>
                <Strong>{t('cnjdata.strong')}</Strong>
              </Center>
              <Center>
                <DocumentsCompare />
              </Center>
            </InnerSection>
            <InnerSection direction="column">
              <TextSection
                title={t('brain.title')}
                text={t('brain.text')}
                size="small"
              />
              <Brain src={isDesktop ? '/images/brain-wide.png' : '/images/brain.png'} />
              <Center>
                <Strong>{t('brain.strong')}</Strong>
              </Center>
            </InnerSection>
            <InnerSection marginSize="small">
              <TextSection
                title={t('contact.title')}
                text={t('contact.text')}
              />
              <ContactForm />
            </InnerSection>
            <InnerSection marginSize="tiny">
              <Footer />
            </InnerSection>
          </Section>
        </>
      </MainSection>
    </div>
  )
}
