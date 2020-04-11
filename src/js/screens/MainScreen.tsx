import React, { useState, Suspense, lazy } from 'react'
import Header from '~/components/common/Header'
import {
  IconButton,
  InputBase,
  Button,
  InputAdornment,
} from '@material-ui/core'
import styled from 'styled-components'
import { navigate } from '~/store/modules/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { Categories } from './Categories'
import { openSettingsWindow } from '~/browser/openSettings'
import Sidebar from 'react-sidebar'
import MenuIcon from '~/icons/menu'
import SettingsIcon from '~/icons/settings'
import { BackupPopover } from '~/components/BackupPopover'
import { getBackupExists, getBackupReadOnly } from '~/store/modules/backup'
import { HelpPopover } from '~/components/HelpPopover'

const MainScreenBookmarks = lazy(() => import('./MainScreenBookmarks'))

const HeaderLeftButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton onClick={onClick}>
    <MenuIcon />
  </IconButton>
)

const HeaderRightButton = ({
  onClick,
  onAdd,
  backupPopoverEnabled,
  backupReadOnly,
}: {
  onClick: () => void
  onAdd: () => void
  backupPopoverEnabled: boolean
  backupReadOnly?: boolean
}) => (
  <>
    {backupPopoverEnabled && <BackupPopover />}
    <IconButton onClick={onClick}>
      <SettingsIcon />
    </IconButton>
    {!backupReadOnly && (
      <Button
        variant="outlined"
        style={{ color: '#fff', borderRadius: '10px', borderColor: 'white' }}
        onClick={() => onAdd()}
      >
        Add Bookmark
      </Button>
    )}
  </>
)

export const MainScreen = () => {
  const backupExists = useSelector(getBackupExists)
  const backupReadOnly = useSelector(getBackupReadOnly)
  const dispatch = useDispatch()

  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  const [searchTerm, setSearchTerm] = useState('')

  const handleCategories = () => {
    setShowSidebar(!showSidebar)
  }

  const handleAdd = () => {
    dispatch(navigate('add'))
  }

  const handleSettings = () => {
    openSettingsWindow()
  }

  return (
    <>
      <Header>
        <FlexContainer>
          <Section>
            <HeaderLeftButton onClick={handleCategories} />
            <SearchBox
              placeholder="Search…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
              autoFocus
              fullWidth
              style={{ color: 'white' }}
              startAdornment={
                <InputAdornment position="start">
                  <HelpPopover />
                </InputAdornment>
              }
            />
          </Section>
          <Section>
            <HeaderRightButton
              backupPopoverEnabled={backupExists}
              onAdd={handleAdd}
              onClick={handleSettings}
              backupReadOnly={backupReadOnly}
            />
          </Section>
        </FlexContainer>
      </Header>
      <Sidebar
        sidebar={<Categories />}
        open={showSidebar}
        docked={showSidebar}
        onSetOpen={() => setShowSidebar(true)}
        rootClassName="sidebar-content"
        styles={{ sidebar: { background: 'white' } }}
      >
        <ContentContainer>
          <Suspense fallback={() => <p>Loading</p>}>
            <MainScreenBookmarks searchTerm={searchTerm} />
          </Suspense>
        </ContentContainer>
      </Sidebar>
    </>
  )
}

const ContentContainer = styled.div`
  flex-grow: 1;
  position: absolute;
  left: 1em;
  right: 1em;
  top: 1em;
  bottom: 1em;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
`
const SearchBox = styled(InputBase)`
  color: inherit;
  padding: 3px 3px 3px 7px;
  border: 2px solid #90a4ae;
  border-radius: 7px;
  font-size: 22px;
  color: white;
  width: 100%;
`
