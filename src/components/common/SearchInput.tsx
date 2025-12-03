import styled from 'styled-components'
import type { InputHTMLAttributes } from 'react'
import searchIcon from '../../assets/search-solid.png'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const Input = styled.input`
  width: 100%;
  background: #D9DFEB 0% 0% no-repeat padding-box;
  border-radius: 8px;
  border: none;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0px;
  color: #3a4a5a;
  transition: background-color 150ms ease;
  
  &::placeholder {
    color: #7A7D7E;
  }
  
  &:focus {
    outline: none;
    background-color: #cdd4e3;
  }
`

const Icon = styled.img`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  object-fit: contain;
  opacity: 0.6;
`

export const SearchInput = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <Wrapper>
    <Icon src={searchIcon} alt="Search" />
    <Input {...props} />
  </Wrapper>
)
