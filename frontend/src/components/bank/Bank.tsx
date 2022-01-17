import React from 'react'
import styled from 'styled-components'
import { AccountButton } from '../account/AccountButton'
import { Container, MainContent, Section, SectionRow } from '../base/base'
import { DepositEth, WithdrawEth } from './Forms'
import { Title } from '../../styles/typography/Title'

export function Bank() {
  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Bank</Title>
            <AccountButton />
          </SectionRow>
          <TableGrid>
            <DepositEth />
            <WithdrawEth />
          </TableGrid>
        </Section>
      </Container>
    </MainContent>
  )
}

const TableGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`
