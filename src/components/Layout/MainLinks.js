import React from 'react'
import {
  Table,
  VaccineBottle
} from 'tabler-icons-react'
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function MainLink ({ icon, color, label, path }) {
  const navigate = useNavigate()

  return (
    <UnstyledButton
      onClick={() => navigate(path)}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0]
        }
      })}
    >
      <Group>
        <ThemeIcon color={color} variant='light'>
          {icon}
        </ThemeIcon>

        <Text size='sm'>{label}</Text>
      </Group>
    </UnstyledButton>
  )
}

const routes = [
  {
    icon: <VaccineBottle size={16} />,
    color: 'teal',
    label: 'Make an appointment',
    path: '/scheduling'
  },
  {
    icon: <Table size={16} />,
    color: 'violet',
    label: 'Schedule',
    path: '/schedule'
  }
]

export default function MainLinks () {
  return (
    <div>
      {routes.map((route) => (
        <MainLink key={route.label} {...route} />
      ))}
    </div>
  )
}
