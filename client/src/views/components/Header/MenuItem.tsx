import { ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { ReactNode } from 'react';

function MenuItem(props: { icon: unknown; caption: string }) {
  const { caption, icon } = props;

  return (
    <ListItem key={caption}>
      <ListItemButton sx={{ borderRadius: '24px' }}>
        <ListItemIcon>{icon as ReactNode}</ListItemIcon>
        {caption}
      </ListItemButton>
    </ListItem>
  );
}

export default MenuItem;
