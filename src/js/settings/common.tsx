import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

export const SectionContainer = styled.div`
  padding-top: 2em;
  padding-bottom: 2em;
`

export const SectionContent = styled.div`
  padding: 1em;
`

export const PaddedAction = styled.div`
  margin-top: 0.5em;
`

export const DownloadInputContainer = styled(PaddedAction)`
  display: flex;
  flex-direction: row;
`

export const SettingsButton = ({
  text,
  onClick,
  disabled,
}: {
  text: string
  onClick: () => void
  disabled?: boolean
}) => (
  <Button disabled={disabled} variant="outlined" onClick={onClick}>
    {text}
  </Button>
)

export const SettingsTextField = ({
  value,
  onChange,
  label,
  disabled,
  style,
}: {
  value: string
  onChange: (text: string) => void
  label: string
  disabled?: boolean
  style?: object
}) => (
  <TextField
    variant="outlined"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    label={label}
    disabled={disabled}
    style={style}
  />
)

export const SectionHeader = ({ children }: { children: string }) => (
  <Typography variant="h5">{children}</Typography>
)
