import React, {useMemo} from "react";
import styled from 'styled-components';
import {useTranslation} from "react-i18next";
import {MemberCard} from "@src/components/member-card";
import {DESKTOP} from "@src/services/responsive";

export const Container = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const Content = styled.div({
  width: '100%',
  maxWidth: '250px',
  marginBottom: '60px',

  [DESKTOP]: {
    display: "flex",
    flexDirection: "row",
    maxWidth: '930px',
    justifyContent: 'space-between'
  }
});

export default function MembersList() {
  const {t} = useTranslation('members');

  const members = useMemo(() => ([
    {
      name: "Mariana Leitune Costa",
      photo: "/images/members/leitune.png",
      tagline: "OAB/RS 107.395",
      description: t('leitune.description'),
      linkedin: 'https://www.linkedin.com/in/mariana-leitune-costa-017a48140/',
    },
    {
      name: "Ana Cláudia Georg Reguly",
      photo: "/images/members/reguly.png",
      tagline: "OAB/RS 113.620",
      description: t('reguly.description'),
      linkedin: 'https://www.linkedin.com/in/ana-cl%C3%A1udia-georg-reguly-b304a6186/',
    }
  ]), []);

  return (
    <Container>
      <Content>
        {members.map(member => (
          <MemberCard key={member.name} {...member} />
        ))}
      </Content>
    </Container>
  )
}
