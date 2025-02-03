import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  useTheme,
  IconButton,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { GithubIcon, Linkedin, X, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/content';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: `
📧 New Contact Form Submission

From: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

--
This message was sent from the portfolio contact form.`,
        to_name: personalInfo.name.split(' ')[0],
        reply_to: formData.email,
        subject: `New Contact Form Message from ${formData.name}`,
      };

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: 'Message sent successfully! I will get back to you soon.',
          severity: 'success',
        });
        setFormData({ name: '', email: '', message: '' });
        setFormErrors({});
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Email error:', error);
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again or contact me directly.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        py: 10,
        position: 'relative',
        bgcolor: theme => theme.palette.mode === 'dark'
          ? 'rgba(15, 23, 42, 0.6)'
          : 'rgba(248, 250, 252, 0.8)',
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 0% 0%, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
          zIndex: 0,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 2,
              background: theme => theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #60a5fa 30%, #a78bfa 90%)'
                : 'linear-gradient(45deg, #3b82f6 30%, #8b5cf6 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 8,
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Have a question or want to work together? Feel free to reach out!
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'background.paper',
                    boxShadow: theme => theme.palette.mode === 'dark'
                      ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                      : '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        variant="outlined"
                        disabled={loading}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                        disabled={loading}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        multiline
                        rows={4}
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        variant="outlined"
                        disabled={loading}
                        error={!!formErrors.message}
                        helperText={formErrors.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        endIcon={loading ? <CircularProgress size={20} /> : <Send />}
                        sx={{
                          width: '100%',
                          py: 1.5,
                          background: 'linear-gradient(45deg, #3b82f6 30%, #8b5cf6 90%)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
                          },
                        }}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 4,
                    p: 4,
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    Let's Connect
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    I'm currently available for freelance work. If you have a project that you want to get started, think you need my help with something or just fancy saying hey, then get in touch.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton
                      href={personalInfo.socialLinks.github}
                      target="_blank"
                      sx={{
                        bgcolor: 'background.paper',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        '&:hover': {
                          bgcolor: 'background.paper',
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <GithubIcon />
                    </IconButton>
                    <IconButton
                      href={personalInfo.socialLinks.linkedin}
                      target="_blank"
                      sx={{
                        bgcolor: 'background.paper',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        '&:hover': {
                          bgcolor: 'background.paper',
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <Linkedin />
                    </IconButton>
                    <IconButton
                      href={personalInfo.socialLinks.twitter}
                      target="_blank"
                      sx={{
                        bgcolor: 'background.paper',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        '&:hover': {
                          bgcolor: 'background.paper',
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <X />
                    </IconButton>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};