import styled from 'styled-components'

export const Page = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #F4F4F6 0% 0% no-repeat padding-box;
`

export const PageHeader = styled.header`
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  position: relative;
  z-index: 30;
`

export const PageHeaderInner = styled.div`
  margin: 0 auto;
  padding: 1rem 1.5rem;
  max-width: 1400px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 1.25rem 2.5rem;
  }
`

export const PageContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #F4F4F6 0% 0% no-repeat padding-box;
`

export const PageInner = styled.div`
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
  max-width: 1120px;
  width: 100%;

  @media (min-width: 768px) {
    padding: 3rem 2rem 5rem;
  }
`

export const CenteredContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: #F4F4F6 0% 0% no-repeat padding-box;
`
