import React, {useEffect} from 'react';
import Link from 'next/link';
import MainHeader from "@src/components/main-header";
import {useTranslation} from "react-i18next";
import TextSection from "@src/components/text-section";
import RectangleIcon from "@src/components/rectangle-icon";
import {
  InnerSection,
  RectangleIconsContainers,
  Section,
  StyledButton
} from "@src/components/styled";
import HexagonCarousel from "@src/components/hexagon-carousel";
import MembersList from "@src/components/members-list";
import ContactForm from "@src/components/contact-form";
import Footer from "@src/components/footer";
import {MainSection} from "@src/components/main-section";
import {useController} from "@src/store/controllers";
import {useResizeListener} from "@src/services/responsive";
import Honeycomb from "@src/components/honeycomb";

export default function Home() {
  const { t } = useTranslation('body');
  const [state, { saveScrollOffset }] = useController();
  const { isDesktop } = useResizeListener();

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
              <div>
                <TextSection
                  title={t('presentation.title')}
                  text={t('presentation.text')}
                />
                {isDesktop && (
                  <Link href="/about">
                    <StyledButton type="button" style={{marginTop: '140px'}}>{t('rectangle.button.text')}</StyledButton>
                  </Link>
                )}
              </div>
              <RectangleIconsContainers>
                <RectangleIcon variant="paint" />
                <RectangleIcon variant="wifi" />
                <RectangleIcon variant="lightbulb" />
                <RectangleIcon variant="hosting" />
              </RectangleIconsContainers>
              {!isDesktop && (
                <Link href="/about">
                  <StyledButton type="button">{t('rectangle.button.text')}</StyledButton>
                </Link>
              )}
            </InnerSection>
            <InnerSection id="speciality" direction="column">
              <TextSection
                title={t('speciality.title')}
                text={t('speciality.text')}
              />
              { isDesktop ? <Honeycomb /> : <HexagonCarousel /> }
            </InnerSection>
            <InnerSection id="team" direction="column">
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
            <InnerSection marginSize="tiny">
              <Footer />
            </InnerSection>
          </Section>
        </>
      </MainSection>
    </div>
  )
}
