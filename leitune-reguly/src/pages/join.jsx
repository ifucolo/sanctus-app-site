import React from 'react';
import {useTranslation} from "react-i18next";
import TextSection from "@src/components/text-section";
import Footer from "@src/components/footer";
import JoinForm from "@src/components/join-form";
import {InnerSection, PageCloseWrapper, Section} from "@src/components/styled";
import {MainSection} from "@src/components/main-section";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import Link from "next/link";
import {DESKTOP} from "@src/services/responsive";

const TopImage = styled.img({
  width: '45px',
  height: '45px',
  position: 'absolute',
  top: '15px',
  left: '15px',
  [DESKTOP]: {
    left: '100px',
    width: '80px',
    height: '80px',
  }
})

export default function Join() {
  const { t } = useTranslation('body');

  return (
    <div className="container">
      <MainSection>
        <>
          <Link href="/">
            <PageCloseWrapper>
              <CloseIcon />
            </PageCloseWrapper>
          </Link>
          <TopImage src="/images/members/sport-team.png" />
          <Section>
            <InnerSection marginSize="small" direction="column" align="center">
              <TextSection
                center
                title={t('join.title')}
                text={t('join.text')}
              />
              <JoinForm />
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
