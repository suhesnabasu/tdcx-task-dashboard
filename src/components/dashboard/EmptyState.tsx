import styled from 'styled-components'
import { Button } from '../common/Button'

const Wrapper = styled.div`
  padding: 3rem 2.5rem;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  min-width: 280px;
  max-width: 400px;
  width: 100%;

  @media (min-width: 480px) {
    padding: 3.5rem 4rem;
    min-width: 360px;
  }
`

const Title = styled.p`
  margin: 0 0 1.5rem 0;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0px;
  color: #537178;
`

interface EmptyStateProps {
  onCta: () => void
}

export const EmptyState = ({ onCta }: EmptyStateProps) => (
  <Wrapper>
    <Title>You have no task.</Title>
    <Button type="button" onClick={onCta}>
      + New Task
    </Button>
  </Wrapper>
)
