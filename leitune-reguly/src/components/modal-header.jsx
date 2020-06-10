import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import NavBar from "@src/components/nav-bar";
import CloseIcon from '@material-ui/icons/Close';

const ModalNavBar = styled(NavBar)({
})

export default function ModalHeader() {
  return (
    <ModalNavBar bg="none" fixed>
      <>
        <span />
        <Link href="/">
          <CloseIcon />
        </Link>
      </>
    </ModalNavBar>
  )
}
