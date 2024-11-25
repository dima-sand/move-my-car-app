'use client';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { RoutePaths } from '../../../constants/routes';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';

interface IBottomNavigationBarProps {
  pathname: string;
  onRouteChange: (newRoute: RoutePaths) => void;
  langContent: {
    accountPage: string;
    dashboardPage: string;
    settingsPage: string;
  }
}

export default function BottomNavigationBar(props: IBottomNavigationBarProps) {

  const {
    langContent,
    pathname,
    onRouteChange,
  } = props;


  const actions = [
    {
      value: RoutePaths.AccountPage,
      label: langContent.accountPage,
      icon: <AccountCircleIcon fontSize='large' />,
    },
    {
      value: RoutePaths.DashboardPage,
      label: langContent.dashboardPage,
      icon: <HomeIcon fontSize='large' />,
    },
    {
      value: RoutePaths.SettingsPage,
      label: langContent.settingsPage,
      icon: <SettingsIcon fontSize='large' />,
    }
  ];

  return (
    <Box sx={{ position: 'sticky', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={pathname}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          // color: 'white',
          "button": {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          // "& .Mui-selected": {
          //   color: 'white'
          // }
        }}
        onChange={(event, newValue) => {
          onRouteChange(newValue as RoutePaths);
        }}
      >
        {
          actions.map((action) => (
            <BottomNavigationAction
              key={action.value}
              value={action.value}
              // showLabel={false} // TODO: decide it
              // label={action.label}
              icon={action.icon}
              
            />
          ))
        }
      </BottomNavigation>
    </Box>
  );
}
