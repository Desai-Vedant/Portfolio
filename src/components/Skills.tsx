import React from 'react';
import { Box, Container, Typography, Grid, Paper, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Code2, Database, Layout, Terminal, Cpu, Globe } from 'lucide-react';
import { skillsData } from '../data/content';

const iconMap = {
  'Frontend Development': Layout,
  'Backend Development': Terminal,
  'Programming Languages': Code2,
  'Databases': Database,
  'AI & Machine Learning': Cpu,
  'Other Technologies': Globe,
};

export const Skills: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      id="skills"
      sx={{
        py: 10,
        position: 'relative',
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.6)' : 'rgba(248, 250, 252, 0.8)',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          opacity: 0.1,
          background: theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 50% -20%, #60a5fa, #a78bfa, transparent 70%)'
            : 'radial-gradient(circle at 50% -20%, #3b82f6, #8b5cf6, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 2,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #60a5fa 30%, #a78bfa 90%)'
                : 'linear-gradient(45deg, #3b82f6 30%, #8b5cf6 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}
          >
            Skills & Expertise
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 8,
              color: theme.palette.text.secondary,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            A comprehensive overview of my technical skills and areas of expertise
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {skillsData.map((skill, index) => {
            const Icon = iconMap[skill.category as keyof typeof iconMap] || Globe;
            return (
              <Grid item xs={12} sm={6} md={4} key={skill.category}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      minHeight: '240px',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: theme.palette.mode === 'dark'
                        ? 'rgba(30, 41, 59, 0.5)'
                        : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                      borderRadius: '24px',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.palette.mode === 'dark'
                          ? '0 8px 30px rgba(0, 0, 0, 0.3)'
                          : '0 8px 30px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: '16px',
                          background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(45deg, rgba(96, 165, 250, 0.2), rgba(167, 139, 250, 0.2))'
                            : 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                        }}
                      >
                        <Icon
                          size={24}
                          strokeWidth={2}
                          color={theme.palette.mode === 'dark' ? '#60a5fa' : '#3b82f6'}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(45deg, #60a5fa 30%, #a78bfa 90%)'
                            : 'linear-gradient(45deg, #3b82f6 30%, #8b5cf6 90%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {skill.category}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        flexGrow: 1,
                        alignContent: 'flex-start',
                      }}
                    >
                      {skill.items.map((item) => (
                        <Typography
                          key={item}
                          sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: '12px',
                            fontSize: '0.875rem',
                            color: theme.palette.text.primary,
                            bgcolor: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.05)'
                              : 'rgba(0, 0, 0, 0.05)',
                            border: '1px solid',
                            borderColor: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.1)'
                              : 'rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  );
}; 