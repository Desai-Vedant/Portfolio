import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { personalInfo } from '../data/content';

export const Hero: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Grid 
        container 
        spacing={4} 
        alignItems="center" 
        sx={{ 
          minHeight: '100vh', 
          pt: { 
            xs: 12,     // Mobile
            sm: 16,     // Tablet
            md: 20,     // Around 1000px
            lg: 8       // Larger screens
          }, 
          pb: 8 
        }}
      >
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ position: 'relative', mb: 4 }}>
              <motion.div
                animate={{ 
                  rotate: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  top: -30,
                  left: -30,
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #2563eb, #8b5cf6)',
                  filter: 'blur(30px)',
                  opacity: 0.6,
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  background: 'linear-gradient(45deg, #2563eb 30%, #8b5cf6 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  position: 'relative',
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }, // Responsive font size
                }}
              >
                {personalInfo.name}
              </Typography>
            </Box>
            <Typography 
              variant="h5" 
              color="text.secondary" 
              sx={{ 
                mb: 4,
                fontSize: { xs: '1.1rem', sm: '1.25rem' }, // Responsive font size
              }}
            >
              {personalInfo.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRight />}
                sx={{
                  borderRadius: '50px',
                  textTransform: 'none',
                  px: 4,
                  background: 'linear-gradient(45deg, #2563eb 30%, #8b5cf6 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1d4ed8 30%, #7c3aed 90%)',
                  },
                }}
                href="#projects"
              >
                View My Work
              </Button>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 1, sm: 2, md: 4 }, 
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}>
              {personalInfo.heroStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    style={{ flex: '1 1 auto', minWidth: '150px', maxWidth: '200px' }}
                  >
                    <Box
                      sx={{
                        textAlign: 'center',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        },
                      }}
                    >
                      <Box 
                        sx={{ 
                          color: 'primary.main', 
                          mb: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={24} />
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontSize: { xs: '0.9rem', sm: '1rem' }, 
                          mb: 0.5,
                          fontWeight: 600,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                );
              })}
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2070&q=80"
                alt="Modern Development Environment"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '20px',
                  boxShadow: theme => theme.palette.mode === 'dark'
                    ? '0 20px 40px rgba(0,0,0,0.4)'
                    : '0 20px 40px rgba(0,0,0,0.1)',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: theme => theme.palette.mode === 'dark'
                      ? '0 25px 50px rgba(0,0,0,0.5)'
                      : '0 25px 50px rgba(0,0,0,0.15)',
                  },
                  filter: theme => theme.palette.mode === 'dark'
                    ? 'brightness(0.8) contrast(1.2)'
                    : 'none',
                }}
              />
            </motion.div>
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                bottom: 20,
                left: 20,
                border: '2px dashed',
                borderColor: 'primary.main',
                borderRadius: '20px',
                opacity: 0.3,
                zIndex: 1,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};