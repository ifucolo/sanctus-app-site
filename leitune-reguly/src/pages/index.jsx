import React, {useContext, useEffect, useState} from 'react';
import Link from 'next/link';
import MainHeader from "@src/components/main-header";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import TextSection from "@src/components/text-section";
import RectangleIcon from "@src/components/rectangle-icon";
import {InnerSection, Section, StyledButton} from "@src/components/styled";
import HexagonCarousel from "@src/components/hexagon-carousel";
import MembersList from "@src/components/members-list";
import ContactForm from "@src/components/contact-form";
import Footer from "@src/components/footer";
import {MainSection} from "@src/components/main-section";
import {useController} from "@src/store/controllers";

const RectangleIconsContainers = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  margin: '20px 0px 40px 0px',
  width: '100%'
});

export default function Home() {
  const { t } = useTranslation('body');
  const [state, { saveScrollOffset }] = useController();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, state.page.offsetY);
    });
    return () => {
      saveScrollOffset(window.pageYOffset);
    }
  }, []);

  return (
    <div className="container">
      <MainSection>
        <>
          <MainHeader id="top" />
          <Section>
            <InnerSection id="about">
              <TextSection
                title={t('presentation.title')}
                text={t('presentation.text')}
              />
              <RectangleIconsContainers>
                <RectangleIcon variant="paint" />
                <RectangleIcon variant="wifi" />
                <RectangleIcon variant="lightbulb" />
                <RectangleIcon variant="hosting" />
              </RectangleIconsContainers>
              <Link href="/about">
                <StyledButton type="button">{t('rectangle.button.text')}</StyledButton>
              </Link>
            </InnerSection>
            <InnerSection id="speciality">
              <TextSection
                title={t('speciality.title')}
                text={t('speciality.text')}
              />
              <HexagonCarousel />
            </InnerSection>
            <InnerSection id="team">
              <TextSection
                title={t('team.title')}
                text={t('team.text')}
              />
              <MembersList />
              <Link href='/join'>
                <StyledButton>{t('team.button')}</StyledButton>
              </Link>
            </InnerSection>
            <InnerSection id="contact" marginSize="small">
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
