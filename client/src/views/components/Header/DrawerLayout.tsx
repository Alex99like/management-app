import { Box, Button, ButtonGroup, Divider, Drawer, List } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import MenuItem from './MenuItem';
import Buttons from './Buttons';
import { useAuth } from '../Form/useAuth';

type DrawerLayoutPropsType = {
  menuOpen: boolean;
  closeMenu: () => void;
};

const DrawerLayout: React.FC<DrawerLayoutPropsType> = ({ menuOpen, closeMenu }) => {
  const linkStyle = {
    textDecoration: 'none',
    color: '#000',
  };

  const { user } = useAuth();

  return (
    <Drawer anchor="top" open={menuOpen} onClose={closeMenu} className={styles.drawer}>
      <Box sx={{ width: '100%', marginTop: 9.5 }} onClick={closeMenu}>
        {user ? (
          <>
            <List>
              <Link style={linkStyle} to="/">
                <MenuItem icon={<HomeOutlinedIcon color="primary" />} caption="Welcome" />
              </Link>
            </List>
            <List>
              <Link style={linkStyle} to="/main">
                <MenuItem icon={<DashboardIcon color="primary" />} caption="Create Board" />
              </Link>
            </List>
            <List>
              <MenuItem icon={<AccountCircleIcon color="primary" />} caption="Edit Profile" />
            </List>
            <Divider />
            <Buttons />
            <Divider />
            <ButtonGroup variant="text" className={styles.buttonGroup}>
              <Button>English</Button>
              <Button>Russian</Button>
            </ButtonGroup>
          </>
        ) : (
          <Buttons />
        )}
      </Box>
    </Drawer>
  );
};

export default DrawerLayout;
