import styled from 'styled-components'
import { useAuth } from '../../context/AuthContext'
import profileImage from '../../assets/donn-gabriel-baleva-U-Z4P2H3KFE-unsplash@2x.png'

const UserBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Avatar = styled.div<{ $color: string; $image?: string }>`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  background-image: ${({ $image }) => ($image ? `url(${$image})` : 'none')};
  background-size: cover;
  background-position: center;
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 600;
  font-size: 1.1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`

const Name = styled.span`
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0px;
  color: #6D8187;
`

const LogoutButton = styled.button`
  border: none;
  background: none;
  text-align: right;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0px;
  color: #6D8187;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.7;
  }
`

export const DashboardHeader = () => {
  const { user, logout } = useAuth()
  const initials =
    user?.name
      ?.split(' ')
      .map((piece) => piece[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? 'Me'

  return (
    <>
      <UserBlock>
        <Avatar $color={user?.avatarColor ?? '#5b8a72'} $image={profileImage}>
          {!profileImage && initials}
        </Avatar>
        <Name>{user?.name ?? 'Guest'}</Name>
      </UserBlock>
      <LogoutButton type="button" onClick={logout}>
        Logout
      </LogoutButton>
    </>
  )
}
