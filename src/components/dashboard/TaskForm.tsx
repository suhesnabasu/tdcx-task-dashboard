import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TextField } from '../common/TextField'
import type { Task, TaskDraft } from '../../types/task'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000033 0% 0% no-repeat padding-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 100;
`

const FormCard = styled.form`
  width: min(90vw, 340px);
  background-color: #fff;
  border-radius: 14px;
  padding: 1.75rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Title = styled.h2`
  margin: 0 0 0.5rem 0;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0px;
  color: #537178;
`

const SubmitButton = styled.button`
  margin-top: 0.5rem;
  width: 100%;
  padding: 1rem;
  background: #5285EC 0% 0% no-repeat padding-box;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0px;
  color: #FFFFFF;
  text-align: center;
  transition: background-color 150ms ease;
  
  &:hover {
    background-color: #4574d4;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

type Mode = 'create' | 'edit'

interface TaskFormProps {
  open: boolean
  mode: Mode
  onClose: () => void
  onSubmit: (values: TaskDraft) => void
  initialValues?: Task | null
}

const emptyValues: TaskDraft = {
  name: ''
}

export const TaskForm = ({
  open,
  mode,
  onClose,
  onSubmit,
  initialValues
}: TaskFormProps) => {
  const [formValues, setFormValues] = useState<TaskDraft>(emptyValues)

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        name: initialValues.name
      })
    } else {
      setFormValues(emptyValues)
    }
  }, [initialValues, open])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({ name: formValues.name.trim() })
    setFormValues(emptyValues)
    onClose()
  }

  const isDisabled = !formValues.name.trim()

  if (!open) return null

  return (
    <Overlay
      onClick={onClose}
      data-testid="task-form-overlay"
    >
      <FormCard onSubmit={handleSubmit} onClick={(evt) => evt.stopPropagation()}>
        <Title>{mode === 'create' ? '+ New Task' : 'Edit Task'}</Title>
        <TextField
          name="name"
          placeholder="Task Name"
          value={formValues.name}
          onChange={handleChange}
          required
        />
        <SubmitButton type="submit" disabled={isDisabled}>
          {mode === 'create' ? '+ New Task' : 'Save'}
        </SubmitButton>
      </FormCard>
    </Overlay>
  )
}
