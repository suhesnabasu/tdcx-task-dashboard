import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`

const SkeletonBase = styled.div`
  border-radius: 12px;
  background-image: linear-gradient(
    90deg,
    rgba(232, 236, 246, 0.3),
    rgba(245, 247, 252, 0.8),
    rgba(232, 236, 246, 0.3)
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
`

const Line = styled(SkeletonBase)<{ $height?: number }>`
  height: ${({ $height }) => ($height ? `${$height}px` : '16px')};
  width: 100%;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const SummarySkeleton = () => (
  <List>
    <Line $height={20} />
    <Line $height={36} />
    <Line />
    <Line />
  </List>
)

export const TaskSkeletons = () => (
  <List>
    <Line $height={52} />
    <Line $height={52} />
    <Line $height={52} />
  </List>
)

