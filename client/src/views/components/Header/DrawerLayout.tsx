import { Box, Button, ButtonGroup, Divider, Drawer, List } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import MenuItem from './MenuItem';
import Buttons from './Buttons';
import { useAuth } from '../../../hooks/useAuth';
import i18n from '../../../utils/i18next';

type DrawerLayoutPropsType = {
  menuOpen: boolean;
  closeMenu: () => void;
  handleCreateButton: () => void;
};

const DrawerLayout: React.FC<DrawerLayoutPropsType> = ({
  menuOpen,
  closeMenu,
  handleCreateButton,
}) => {
  const linkStyle = {
    textDecoration: 'none',
    color: '#000',
  };

  const { user } = useAuth();

  function handleClick(key: string) {
    i18n.changeLanguage(key);
  }

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
              <Link style={linkStyle} to="/main" onClick={handleCreateButton}>
                <MenuItem icon={<DashboardIcon color="primary" />} caption="Create Board" />
              </Link>
            </List>
            <List>
              <Link to={'/edit'}>
                <MenuItem icon={<AccountCircleIcon color="primary" />} caption="Edit Profile" />
              </Link>
            </List>
            <Divider />
            <Buttons />
            <Divider />
            <ButtonGroup variant="text" className={styles.buttonGroup}>
              <Button onClick={() => handleClick('en')}>English</Button>
              <Button onClick={() => handleClick('ru')}>Russian</Button>
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
