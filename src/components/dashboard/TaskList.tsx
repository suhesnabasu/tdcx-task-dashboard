import styled from 'styled-components'
import type { Task } from '../../types/task'
import penIcon from '../../assets/pen-solid.png'
import trashIcon from '../../assets/trash-solid.png'

const ListContainer = styled.div`
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000014;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 1rem;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.article`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid #f0f2f5;
  
  &:last-child {
    border-bottom: none;
  }

  @media (min-width: 640px) {
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
  }
`

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  appearance: none;
  -webkit-appearance: none;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 2px solid #95A4AB;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  margin-top: 2px;
  
  &:checked {
    background-color: #5285EC;
    border-color: #5285EC;
  }
  
  &:checked::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
  }

  @media (min-width: 640px) {
    margin-top: 0;
  }
`

const Name = styled.span<{ $completed: boolean }>`
  flex: 1;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0px;
  color: ${({ $completed }) => ($completed ? '#537178' : '#5285EC')};
  text-decoration: ${({ $completed }) =>
    $completed ? 'line-through' : 'none'};
  word-break: break-word;

  @media (min-width: 640px) {
    font-size: 20px;
    line-height: 24px;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  transition: opacity 150ms ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.7;
  }
  
  img {
    width: 18px;
    height: 18px;
    object-fit: contain;
  }
`

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export const TaskList = ({
  tasks,
  onToggle,
  onEdit,
  onDelete
}: TaskListProps) => (
  <ListContainer>
    <List>
      {tasks.map((task) => (
        <Row key={task.id}>
          <Checkbox
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={() => onToggle(task.id)}
            aria-label={`Mark ${task.name} as ${
              task.status === 'completed' ? 'pending' : 'completed'
            }`}
          />
          <Name $completed={task.status === 'completed'}>{task.name}</Name>
          <Actions>
            <IconButton
              type="button"
              onClick={() => onEdit(task)}
              aria-label={`Edit ${task.name}`}
            >
              <img src={penIcon} alt="Edit" />
            </IconButton>
            <IconButton
              type="button"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete ${task.name}`}
            >
              <img src={trashIcon} alt="Delete" />
            </IconButton>
          </Actions>
        </Row>
      ))}
    </List>
  </ListContainer>
)
