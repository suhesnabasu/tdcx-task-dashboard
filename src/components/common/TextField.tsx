import styled from 'styled-components'
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode
} from 'react'

const Label = styled.label<{ $hasLabel: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $hasLabel }) => ($hasLabel ? '0.5rem' : '0')};
`

const LabelText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #2d3a4a;
`

const Input = styled.input`
  width: 100%;
  border-radius: 8px;
  border: none;
  padding: 1rem 1.25rem;
  background: #EEF1F8 0% 0% no-repeat padding-box;
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
    background-color: #e5e9f2;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  border-radius: 8px;
  border: none;
  padding: 1rem 1.25rem;
  background: #EEF1F8 0% 0% no-repeat padding-box;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #3a4a5a;
  min-height: 120px;
  resize: vertical;
  transition: background-color 150ms ease;
  
  &::placeholder {
    color: #7A7D7E;
  }
  
  &:focus {
    outline: none;
    background-color: #e5e9f2;
  }
`

const Hint = styled.span`
  font-size: 0.75rem;
  color: var(--muted);
`

interface BaseProps {
  label?: string
  hint?: string
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>
type TextAreaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>

const Wrapper = ({
  label,
  hint,
  children
}: {
  label?: string
  hint?: string
  children: ReactNode
}) => (
  <Label $hasLabel={Boolean(label)}>
    {label && <LabelText>{label}</LabelText>}
    {children}
    {hint && <Hint>{hint}</Hint>}
  </Label>
)

export const TextField = ({ label, hint, ...props }: InputProps) => (
  <Wrapper label={label} hint={hint}>
    <Input {...props} />
  </Wrapper>
)

export const TextAreaField = ({ label, hint, ...props }: TextAreaProps) => (
  <Wrapper label={label} hint={hint}>
    <TextArea {...props} />
  </Wrapper>
)
