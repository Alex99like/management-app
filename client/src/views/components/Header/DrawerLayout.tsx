import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Buttons from './Buttons';

type DrawerLayoutPropsType = {
  menuOpen: boolean;
  closeMenu: () => void;
};

const DrawerLayout: React.FC<DrawerLayoutPropsType> = ({ menuOpen, closeMenu }) => {
  const linkStyle = {
    textDecoration: 'none',
    color: '#000',
  };

  return (
    <Drawer anchor="top" open={menuOpen} onClose={closeMenu} className={styles.drawer}>
      <Box sx={{ width: '100%', marginTop: 9.5 }} onClick={closeMenu}>
        <List>
          <Link style={linkStyle} to="/">
            <ListItem key={'Welcome'}>
              <ListItemButton>
                <ListItemIcon>
                  <HomeOutlinedIcon color="primary" />
                </ListItemIcon>
                <p>Welcome</p>
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <List>
          <Link style={linkStyle} to="/main">
            <ListItem key={'Boards'}>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon color="primary" />
                </ListItemIcon>
                <p>Boards</p>
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <List>
          <ListItem key={'Edit Profile'}>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon color="primary" />
              </ListItemIcon>
              <p>Edit Profile</p>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <Buttons />
        <Divider />
        <ButtonGroup variant="text" className={styles.buttonGroup}>
          <Button>English</Button>
          <Button>Russian</Button>
        </ButtonGroup>
      </Box>
    </Drawer>
  );
};

export default DrawerLayout;
