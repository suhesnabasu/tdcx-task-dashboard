import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { 
  Page, 
  PageHeader, 
  PageHeaderInner, 
  PageContent, 
  PageInner, 
  CenteredContent 
} from '../components/layout/Page'
import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { InfoCards } from '../components/dashboard/InfoCards'
import { EmptyState } from '../components/dashboard/EmptyState'
import { TaskList } from '../components/dashboard/TaskList'
import { TaskForm } from '../components/dashboard/TaskForm'
import { SearchInput } from '../components/common/SearchInput'
import { Button } from '../components/common/Button'
import { SummarySkeleton } from '../components/dashboard/Skeletons'
import { useTasks } from '../hooks/useTasks'
import type { Task, TaskDraft } from '../types/task'

const Section = styled.div`
  margin-bottom: 1.5rem;
`

const TasksHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 0;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
`

const SearchWrapper = styled.div`
  flex: 1;
  min-width: 0;

  @media (min-width: 640px) {
    min-width: 220px;
  }
`

const NewTaskButton = styled(Button)`
  width: 100%;

  @media (min-width: 640px) {
    width: auto;
  }
`

const SectionTitle = styled.h3`
  margin: 0;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0px;
  color: #537178;

  @media (min-width: 640px) {
    text-align: left;
  }
`

export const DashboardPage = () => {
  const {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleCompletion,
    stats
  } = useTasks()
  const [query, setQuery] = useState('')
  const [isFormOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const filteredTasks = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return tasks
    return tasks.filter((task) =>
      task.name.toLowerCase().includes(normalized)
    )
  }, [tasks, query])

  const openCreateForm = () => {
    setEditingTask(null)
    setFormOpen(true)
  }

  const openEditForm = (task: Task) => {
    setEditingTask(task)
    setFormOpen(true)
  }

  const handleSubmit = (values: TaskDraft) => {
    if (editingTask) {
      updateTask(editingTask.id, values)
    } else {
      addTask(values)
    }
  }

  // Empty state or loading - show centered layout
  if (isLoading || tasks.length === 0) {
    return (
      <Page>
        <PageHeader>
          <PageHeaderInner>
            <DashboardHeader />
          </PageHeaderInner>
        </PageHeader>
        <PageContent>
          {isLoading ? (
            <CenteredContent>
              <div style={{ padding: '2rem', minWidth: '300px', background: '#fff', borderRadius: '12px', boxShadow: '0px 3px 6px #0000000A' }}>
                <SummarySkeleton />
              </div>
            </CenteredContent>
          ) : (
            <CenteredContent>
              {!isFormOpen && <EmptyState onCta={openCreateForm} />}
            </CenteredContent>
          )}
        </PageContent>
        <TaskForm
          open={isFormOpen}
          mode={editingTask ? 'edit' : 'create'}
          initialValues={editingTask}
          onClose={() => setFormOpen(false)}
          onSubmit={handleSubmit}
        />
      </Page>
    )
  }

  // Dashboard with tasks
  return (
    <Page>
      <PageHeader>
        <PageHeaderInner>
          <DashboardHeader />
        </PageHeaderInner>
      </PageHeader>
      <PageContent>
        <PageInner>
          <Section>
            <InfoCards
              {...stats}
              latestTasks={tasks}
            />
          </Section>
          <Section>
            <TasksHeader>
              <SectionTitle>Tasks</SectionTitle>
              <HeaderControls>
                <SearchWrapper>
                  <SearchInput
                    placeholder="Search by task name"
                    value={query}
                    onChange={(evt) => setQuery(evt.target.value)}
                    aria-label="Search tasks"
                  />
                </SearchWrapper>
                <NewTaskButton type="button" onClick={openCreateForm}>
                  + New Task
                </NewTaskButton>
              </HeaderControls>
            </TasksHeader>
            <TaskList
              tasks={filteredTasks}
              onToggle={toggleCompletion}
              onEdit={openEditForm}
              onDelete={deleteTask}
            />
          </Section>
        </PageInner>
      </PageContent>
      <TaskForm
        open={isFormOpen}
        mode={editingTask ? 'edit' : 'create'}
        initialValues={editingTask}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />
    </Page>
  )
}
