import React from 'react';
import Head from 'next/head'
import {useTranslation} from "react-i18next";
import ModalHeader from "@src/components/modal-header";
import TextSection from "@src/components/text-section";
import Footer from "@src/components/footer";
import JoinForm from "@src/components/join-form";
import {InnerSection, Section} from "@src/components/styled";
import {MainSection} from "@src/components/main-section";
import styled from "styled-components";



const TopImage = styled.img({
  width: '45px',
  height: '45px',
  position: 'absolute',
  top: '15px',
  left: '15px',
})

export default function Join() {
  const { t } = useTranslation('body');

  return (
    <div className="container">
      <MainSection>
        <>
          <ModalHeader />
          <TopImage src="/images/members/sport-team.png" />
          <Section>
            <InnerSection marginSize="small">
              <TextSection
                title={t('join.title')}
                text={t('join.text')}
              />
              <JoinForm />
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
