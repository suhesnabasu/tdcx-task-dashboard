import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Page, PageInner } from '../components/layout/Page'
import { TextField } from '../components/common/TextField'
import { Button } from '../components/common/Button'
import { useAuth } from '../context/AuthContext'

const Center = styled.section`
  min-height: calc(100vh - 4rem);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Card = styled.form`
  width: min(360px, 100%);
  background-color: #fff;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 30px 60px rgba(20, 30, 60, 0.12);
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`

const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 1.5rem;
  color: #3a4861;
`

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const [formValues, setFormValues] = useState({
    name: '',
    id: ''
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    login({
      name: formValues.name.trim(),
      email: `${formValues.id.trim()}@tdcx.local`
    })
    navigate('/dashboard', { replace: true })
  }

  const isDisabled =
    !formValues.name.trim().length || !formValues.id.trim().length

  return (
    <Page>
      <PageInner>
        <Center>
          <Card onSubmit={handleSubmit}>
            <Title>Login</Title>
            <TextField
              label="Id"
              name="id"
              placeholder="TD1008"
              value={formValues.id}
              onChange={handleChange}
              required
            />
            <TextField
              label="Name"
              name="name"
              placeholder="Ali"
              value={formValues.name}
              onChange={handleChange}
              required
            />
            <Button type="submit" disabled={isDisabled}>
              Login
            </Button>
          </Card>
        </Center>
      </PageInner>
    </Page>
  )
}

