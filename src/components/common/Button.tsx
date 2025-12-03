import styled, { css } from 'styled-components'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost' | 'danger'

const StyledButton = styled.button<{ $variant: Variant }>`
  background: #5285EC 0% 0% no-repeat padding-box;
  border-radius: 8px;
  padding: 0.875rem 1.75rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0px;
  cursor: pointer;
  border: none;
  transition: background-color 150ms ease, transform 100ms ease;

  &:active {
    transform: scale(0.98);
  }

  ${({ $variant }) => {
    if ($variant === 'ghost') {
      return css`
        background-color: #eef1f7;
        color: #6D8187;
        &:hover {
          background-color: #e2e7f2;
        }
      `
    }
    if ($variant === 'danger') {
      return css`
        background-color: #ff5b60;
        color: #fff;
        &:hover {
          background-color: #e14b51;
        }
      `
    }
    return css`
      background: #5285EC 0% 0% no-repeat padding-box;
      color: #FFFFFF;
      &:hover {
        background-color: #4574d4;
      }
    `
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  return <StyledButton $variant={variant} {...props} />
}
