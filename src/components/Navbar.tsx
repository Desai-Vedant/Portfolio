import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Button,
  Container,
  useMediaQuery,
  Menu,
  MenuItem,
  Slide,
} from '@mui/material';
import { Menu as MenuIcon, Sun, Moon, GithubIcon, Linkedin, X } from 'lucide-react';
import { motion, useScroll } from 'framer-motion';
import { personalInfo } from '../data/content';

interface NavbarProps {
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const currentScrollY = latest;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    });
  }, [lastScrollY, scrollY]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: 'Home', href: '#top' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleMenuItemClick = (href: string) => {
    handleClose();
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Slide appear={false} direction="down" in={visible}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: theme.palette.mode === 'dark' 
            ? 'rgba(15, 23, 42, 0.9)'
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: 'bold',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #60a5fa 30%, #a78bfa 90%)'
                    : 'linear-gradient(45deg, #2563eb 30%, #8b5cf6 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {personalInfo.name.split(' ')[0]}
              </Typography>
            </motion.div>

            <Box sx={{ flexGrow: 1 }} />

            {isMobile ? (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'rotate(180deg)' },
                    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                  }}
                >
                  {theme.palette.mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                  }}
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.label}
                      onClick={() => handleMenuItemClick(item.href)}
                      component="a"
                      href={item.href === '#top' ? undefined : item.href}
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Button
                        href={item.href === '#top' ? undefined : item.href}
                        onClick={() => item.href === '#top' && window.scrollTo({ top: 0, behavior: 'smooth' })}
                        sx={{
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '0%',
                            height: '2px',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'linear-gradient(90deg, #2563eb, #8b5cf6)',
                            transition: 'width 0.3s ease-in-out',
                          },
                          '&:hover::after': {
                            width: '100%',
                          },
                          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                          '&:hover': {
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        {item.label}
                      </Button>
                    </motion.div>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                  <IconButton
                    onClick={toggleTheme}
                    sx={{
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'rotate(180deg)' },
                      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    }}
                  >
                    {theme.palette.mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </IconButton>
                  <IconButton
                    href={personalInfo.socialLinks.github}
                    target="_blank"
                    sx={{ 
                      '&:hover': { transform: 'translateY(-2px)' },
                      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    }}
                  >
                    <GithubIcon size={20} />
                  </IconButton>
                  <IconButton
                    href={personalInfo.socialLinks.linkedin}
                    target="_blank"
                    sx={{ 
                      '&:hover': { transform: 'translateY(-2px)' },
                      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    }}
                  >
                    <Linkedin size={20} />
                  </IconButton>
                  <IconButton
                    href={personalInfo.socialLinks.twitter}
                    target="_blank"
                    sx={{ 
                      '&:hover': { transform: 'translateY(-2px)' },
                      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    }}
                  >
                    <X size={20} />
                  </IconButton>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
};