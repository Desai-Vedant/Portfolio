import React from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { projectsData } from '../data/content';

export const Projects: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box id="projects" sx={{ 
      py: 10, 
      bgcolor: theme.palette.background.default,
      position: 'relative' 
    }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #2563eb 30%, #8b5cf6 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Featured Projects
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 6,
            textAlign: 'center',
            color: 'text.secondary',
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          Here you will find the details of some of my projects!
        </Typography>
        <Grid container spacing={4}>
          {projectsData.map((project, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                style={{ height: '100%' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 4px 20px rgba(0,0,0,0.4)'
                      : '0 4px 20px rgba(0,0,0,0.1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(90deg, #60a5fa, #a78bfa)'
                        : 'linear-gradient(90deg, #2563eb, #8b5cf6)',
                      transform: 'scaleX(0)',
                      transition: 'transform 0.3s ease-in-out',
                    },
                    '&:hover::before': {
                      transform: 'scaleX(1)',
                    },
                    '&:hover': {
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 12px 24px rgba(0,0,0,0.6)'
                        : '0 12px 24px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image}
                    alt={project.title}
                    sx={{
                      objectFit: 'cover',
                      transition: '0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 2,
                        flexGrow: 1,
                      }}
                    >
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {project.tags.map((tag) => (
                        <Typography
                          key={tag}
                          variant="caption"
                          sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: '50px',
                            background: theme.palette.mode === 'dark'
                              ? 'linear-gradient(45deg, #60a5fa 30%, #a78bfa 90%)'
                              : 'linear-gradient(45deg, #2563eb 30%, #8b5cf6 90%)',
                            color: theme.palette.mode === 'dark' ? '#0f172a' : 'white',
                            fontWeight: 600,
                          }}
                        >
                          {tag}
                        </Typography>
                      ))}
                    </Box>
                    <Button
                      variant="outlined"
                      href={project.link}
                      target="_blank"
                      sx={{
                        borderRadius: '50px',
                        textTransform: 'none',
                        borderColor: theme.palette.mode === 'dark' ? '#60a5fa' : '#2563eb',
                        color: theme.palette.mode === 'dark' ? '#60a5fa' : '#2563eb',
                        '&:hover': {
                          borderColor: theme.palette.mode === 'dark' ? '#3b82f6' : '#1d4ed8',
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(96, 165, 250, 0.1)'
                            : 'rgba(37, 99, 235, 0.1)',
                        },
                      }}
                    >
                      Check Out
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};