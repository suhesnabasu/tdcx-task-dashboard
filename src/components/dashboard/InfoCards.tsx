import styled from 'styled-components'
import type { Task } from '../../types/task'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const Card = styled.div`
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000000A;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;

  @media (min-width: 640px) {
    padding: 1.5rem 1.75rem;
  }
`

const SectionHeading = styled.h3`
  margin: 0 0 0.75rem;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0px;
  color: #537178;
`

const StatRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.15rem;
`

const StatValue = styled.span`
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 48px;
  line-height: 58px;
  letter-spacing: 0px;
  color: #5285EC;

  @media (min-width: 640px) {
    font-size: 64px;
    line-height: 78px;
  }
`

const StatTotal = styled.span`
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0px;
  color: #8F9EA2;
`

const LatestList = styled.ul`
  margin: 0.5rem 0 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`

const LatestItem = styled.li<{ $completed: boolean }>`
  list-style: disc;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0px;
  color: #8F9EA2;
  text-decoration: ${({ $completed }) => ($completed ? 'line-through' : 'none')};
`

const EmptyLabel = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #8F9EA2;
`

const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  height: 100%;
  padding: 0.5rem 0;
  position: relative;

  @media (min-width: 900px) {
    justify-content: flex-start;
  }
`

const PieChart = styled.div<{ $percent: number }>`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: ${({ $percent }) => {
    const deg = Math.round(($percent / 100) * 360)
    return `conic-gradient(#5285EC 0deg ${deg}deg, #E8ECEC ${deg}deg 360deg)`
  }};
  position: relative;
  flex-shrink: 0;
`

const LegendContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: -10px;
  margin-top: -40px;
`

const LegendLine = styled.div`
  width: 20px;
  height: 1px;
  background-color: #5285EC;
`

const LegendLabel = styled.div`
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #5285EC;
  margin-left: 4px;
`

interface InfoCardsProps {
  total: number
  completed: number
  pending: number
  completionRate: number
  latestTasks: Task[]
}

export const InfoCards = ({
  total,
  completed,
  completionRate,
  latestTasks
}: InfoCardsProps) => {
  const latest = [...latestTasks]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 3)

  return (
    <Container>
      <Card>
        <SectionHeading>Tasks Completed</SectionHeading>
        <StatRow>
          <StatValue>{completed}</StatValue>
          <StatTotal>/{total}</StatTotal>
        </StatRow>
      </Card>
      <Card>
        <SectionHeading>Latest Created Tasks</SectionHeading>
        {latest.length ? (
          <LatestList>
            {latest.map((task) => (
              <LatestItem
                key={task.id}
                $completed={task.status === 'completed'}
              >
                {task.name.length > 25 ? task.name.substring(0, 25) + '...' : task.name}
              </LatestItem>
            ))}
          </LatestList>
        ) : (
          <EmptyLabel>No tasks yet.</EmptyLabel>
        )}
      </Card>
      <Card>
        <ChartWrapper>
          <PieChart $percent={completionRate} />
          {completed > 0 && (
            <LegendContainer>
              <LegendLine />
              <LegendLabel>
                Completed<br />Tasks
              </LegendLabel>
            </LegendContainer>
          )}
        </ChartWrapper>
      </Card>
    </Container>
  )
}
