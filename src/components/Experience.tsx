import React from 'react';
import {
    Avatar,
    Box,
    Chip,
    Container,
    Divider,
    Grid,
    Typography,
    useTheme,
    Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import { experiencesData } from '../data/content';

// LinkedIn-like vertical timeline with company grouping
export const Experience: React.FC = () => {
    const theme = useTheme();

    // Helpers: parse dates like "Jun 2025" and compute human-friendly durations
    const monthIndex = (m: string) => {
        const map: Record<string, number> = {
            jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
            jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
        };
        return map[m.slice(0, 3).toLowerCase()] ?? 0;
    };

    const parseMonthYear = (value: string): Date => {
        if (!value || /present/i.test(value)) return new Date();
        const [mon, yearStr] = value.trim().split(/\s+/);
        const year = Number(yearStr);
        const month = monthIndex(mon);
        return new Date(year, month, 1);
    };

    const diffMonths = (start: Date, end: Date) => {
        const s = new Date(start.getFullYear(), start.getMonth(), 1);
        const e = new Date(end.getFullYear(), end.getMonth(), 1);
        return (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth()) + 1; // inclusive
    };

    const formatDuration = (totalMonths: number) => {
        if (totalMonths <= 0 || Number.isNaN(totalMonths)) return '0 mos';
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        const parts: string[] = [];
        if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
        if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
        return parts.join(' ');
    };

    // Visual constants for perfect alignment
    const LINE_X = 28; // px from the left edge of the timeline container to the vertical line center
    const LINE_WIDTH = 2;
    const DOT_SIZE = 14; // diameter in px
    const CONTENT_GAP = 24; // space between line and content

    // Company-level summary (earliest start to latest end)
    const getCompanySummary = (roles: { startDate: string; endDate: string }[]) => {
        if (!roles.length) return '';
        const starts = roles.map((r) => parseMonthYear(r.startDate));
        const ends = roles.map((r) => parseMonthYear(r.endDate));
        const minStart = new Date(Math.min(...starts.map((d) => d.getTime())));
        const maxEnd = new Date(Math.max(...ends.map((d) => d.getTime())));
        const isPresent = roles.some((r) => /present/i.test(r.endDate));
        const total = diffMonths(minStart, maxEnd);

        const shortMonth = (d: Date) => d.toLocaleString(undefined, { month: 'short' });
        const range = `${shortMonth(minStart)} ${minStart.getFullYear()} — ${isPresent ? 'Present' : `${shortMonth(maxEnd)} ${maxEnd.getFullYear()}`}`;
        return `${range} · ${formatDuration(total)}`;
    };

    return (
        <Box
            id="experience"
            sx={{
                py: 10,
                position: 'relative',
                bgcolor: theme.palette.mode === 'dark'
                    ? 'rgba(15, 23, 42, 0.6)'
                    : 'rgba(248, 250, 252, 0.8)',
                overflow: 'hidden',
            }}
        >
            {/* Gradient background */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.12,
                    background: theme.palette.mode === 'dark'
                        ? 'radial-gradient(circle at 20% 0%, #60a5fa, transparent 40%), radial-gradient(circle at 80% 100%, #a78bfa, transparent 40%)'
                        : 'radial-gradient(circle at 20% 0%, #3b82f6, transparent 40%), radial-gradient(circle at 80% 100%, #8b5cf6, transparent 40%)',
                    filter: 'blur(60px) saturate(120%)',
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative' }}>
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
                        Experience
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        sx={{
                            mb: 8,
                            color: 'text.secondary',
                            maxWidth: '680px',
                            mx: 'auto',
                        }}
                    >
                        A LinkedIn-style timeline highlighting roles, durations, and skills.
                    </Typography>
                </motion.div>

                <Grid container spacing={4}>
                    {experiencesData.map((company, cIdx) => (
                        <Grid item xs={12} key={company.company}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: cIdx * 0.05 }}
                                viewport={{ once: true }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: { xs: 2, sm: 3 },
                                        borderRadius: '24px',
                                        bgcolor: theme.palette.mode === 'dark'
                                            ? 'rgba(30, 41, 59, 0.6)'
                                            : 'rgba(255, 255, 255, 0.9)',
                                        border: '1px solid',
                                        borderColor: theme.palette.divider,
                                    }}
                                >
                                    {/* Company header */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                        <Avatar
                                            src={company.logoUrl || undefined}
                                            alt={company.company}
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                fontWeight: 700,
                                                boxShadow: theme.palette.mode === 'dark'
                                                    ? '0 6px 18px rgba(0,0,0,0.35)'
                                                    : '0 6px 18px rgba(15, 23, 42, 0.08)',
                                                border: '1px solid',
                                                borderColor: theme.palette.mode === 'dark'
                                                    ? 'rgba(255,255,255,0.08)'
                                                    : 'rgba(15,23,42,0.06)'
                                            }}
                                        >
                                            {company.company
                                                .split(' ')
                                                .map((s) => s[0])
                                                .join('')
                                                .slice(0, 2)
                                                .toUpperCase()}
                                        </Avatar>
                                        <Box sx={{ minWidth: 0 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                {company.company}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {getCompanySummary(company.roles)}
                                                {company.location ? ` · ${company.location}` : ''}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Roles list */}
                                    <Box sx={{ mt: 2 }}>
                                        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                                            {company.roles.map((role, rIdx) => (
                                                <Box component="li" key={`${company.company}-${role.title}-${rIdx}`} sx={{ mb: 3 }}>
                                                    <Paper
                                                        elevation={0}
                                                        sx={{
                                                            p: 3,
                                                            borderRadius: '16px',
                                                            bgcolor: theme.palette.mode === 'dark'
                                                                ? 'rgba(15, 23, 42, 0.4)'
                                                                : 'rgba(248, 250, 252, 0.6)',
                                                            border: '1px solid',
                                                            borderColor: theme.palette.mode === 'dark'
                                                                ? 'rgba(255, 255, 255, 0.05)'
                                                                : 'rgba(15, 23, 42, 0.08)',
                                                            transition: 'all 0.2s ease-in-out',
                                                            '&:hover': {
                                                                bgcolor: theme.palette.mode === 'dark'
                                                                    ? 'rgba(15, 23, 42, 0.6)'
                                                                    : 'rgba(248, 250, 252, 0.9)',
                                                                transform: 'translateY(-2px)',
                                                                boxShadow: theme.palette.mode === 'dark'
                                                                    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                                                                    : '0 8px 32px rgba(15, 23, 42, 0.12)',
                                                            }
                                                        }}
                                                    >
                                                        {/* Date chip */}
                                                        <Chip
                                                            label={`${role.startDate} — ${role.endDate}`}
                                                            size="small"
                                                            sx={{
                                                                mb: 2,
                                                                borderRadius: '9999px',
                                                                background: theme.palette.mode === 'dark'
                                                                    ? 'rgba(96,165,250,0.15)'
                                                                    : 'rgba(37,99,235,0.08)',
                                                                color: theme.palette.mode === 'dark' ? '#93c5fd' : '#2563eb',
                                                                border: '1px solid',
                                                                borderColor: theme.palette.mode === 'dark'
                                                                    ? 'rgba(96,165,250,0.35)'
                                                                    : 'rgba(37,99,235,0.2)',
                                                                fontWeight: 600,
                                                            }}
                                                        />

                                                        {/* Role details */}
                                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                                            {role.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                            {role.employmentType}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                            {`${formatDuration(diffMonths(parseMonthYear(role.startDate), parseMonthYear(role.endDate)))}`}
                                                        </Typography>

                                                        {role.description && (
                                                            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }} color="text.primary">
                                                                {role.description}
                                                            </Typography>
                                                        )}

                                                        {role.skills && role.skills.length > 0 && (
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                                {role.skills.map((s) => (
                                                                    <Chip
                                                                        key={`${role.title}-${s}`}
                                                                        size="small"
                                                                        label={s}
                                                                        sx={{
                                                                            borderRadius: '9999px',
                                                                            background: theme.palette.mode === 'dark'
                                                                                ? 'rgba(167, 139, 250, 0.15)'
                                                                                : 'rgba(139, 92, 246, 0.08)',
                                                                            color: theme.palette.mode === 'dark' ? '#c4b5fd' : '#8b5cf6',
                                                                            border: '1px solid',
                                                                            borderColor: theme.palette.mode === 'dark'
                                                                                ? 'rgba(167, 139, 250, 0.35)'
                                                                                : 'rgba(139, 92, 246, 0.2)',
                                                                        }}
                                                                    />
                                                                ))}
                                                            </Box>
                                                        )}
                                                    </Paper>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};
