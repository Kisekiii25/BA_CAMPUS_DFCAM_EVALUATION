import { useState } from 'react';
import schoolLogo from '../assets/DFCAM-logo.webp';
import { 
    AppBar, Toolbar, Typography, Box, Container, useTheme,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
    Divider, Chip, Stack, Avatar 
} from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SchoolIcon from '@mui/icons-material/School';

export default function Navbar({ settings }) {
    const theme = useTheme();
    
    /* NEW ADDED: Three separate states for different pop-ups */
    const [openInfo, setOpenInfo] = useState(false);
    const [openHelp, setOpenHelp] = useState(false);
    const [openStudent, setOpenStudent] = useState(false);

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    bgcolor: 'rgba(22, 35, 66, 0.8)', 
                    backdropFilter: 'blur(10px)',
                    borderBottom: `1px solid ${theme.palette.primary.main}4D`, 
                    boxShadow: 'none',
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ justifyContent: 'space-between', py: 1, px: { xs: 0.5, sm: 2 } }}>
                        
                        {/* LOGO & TITLE SECTION */}
                        <Box
                            onClick={() => setOpenInfo(true)} 
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer', 
                                gap: { xs: 1, sm: 2 },
                                '&:hover': { opacity: 0.8 }
                            }}
                        >
                            <Box
                                component="img"
                                src={schoolLogo}
                                alt="DFCAM Logo"
                                sx={{
                                    width: { xs: 32, sm: 42 },
                                    height: { xs: 32, sm: 42 },
                                    borderRadius: '50%',
                                    bgcolor: 'common.white',
                                    p: 0.2,
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'rotate(10deg)' }
                                }}
                            />

                            <Divider 
                                orientation="vertical" 
                                flexItem 
                                sx={{ 
                                    bgcolor: 'rgba(255,255,255,0.1)', 
                                    mx: 0.5, 
                                    height: '20px', 
                                    alignSelf: 'center',
                                    display: { xs: 'none', sm: 'block' } 
                                }} 
                            />

                            <Box>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        color: 'white', 
                                        fontWeight: 800, 
                                        lineHeight: 1.1, 
                                        fontSize: { xs: '0.8rem', md: '1.1rem' } 
                                    }}
                                >
                                    DFCAMCLP
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            color: 'primary.light', 
                                            fontWeight: 600, 
                                            textTransform: 'uppercase', 
                                            fontSize: '0.6rem',
                                            display: { xs: 'none', md: 'block' } 
                                        }}
                                    >
                                        Evaluation Portal
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* RIGHT SIDE SECTION */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 2 } }}>
                            
                            <Chip 
                                label={`A.Y ${settings?.academicYear || '2026-2027'}`}
                                size="small"
                                sx={{ 
                                    bgcolor: 'rgba(255,255,255,0.05)', 
                                    color: 'primary.light', 
                                    fontWeight: 'bold',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    height: { xs: '20px', sm: '24px' },
                                    fontSize: { xs: '0.65rem', sm: '0.75rem' },
                                    px: 0.5
                                }} 
                            />

                            <Button
                                onClick={() => setOpenHelp(true)}
                                startIcon={<HelpOutlineIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />}
                                sx={{ 
                                    color: 'rgba(255,255,255,0.7)', 
                                    textTransform: 'none',
                                    fontSize: '0.8rem',
                                    minWidth: { xs: '35px', sm: '100px' },
                                    p: { xs: 0.5, sm: 1 },
                                    '& .MuiButton-startIcon': { margin: { xs: 0, sm: '0 8px 0 -4px' } },
                                    '&:hover': { color: '#fff', bgcolor: 'transparent' }
                                }}
                            >
                                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                                    How to use?
                                </Box>
                            </Button>

                            <Box 
                                onClick={() => setOpenStudent(true)}
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 1, 
                                    pl: { xs: 0.5, sm: 2 }, 
                                    borderLeft: { xs: 'none', sm: '1px solid rgba(255,255,255,0.1)' },
                                    cursor: 'pointer',
                                    '&:hover': { opacity: 0.7 }
                                }}
                            >
                                <PersonOutlineIcon sx={{ color: 'rgba(255,255,255,0.5)', fontSize: { xs: 18, sm: 20 } }} />
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        color: 'white', 
                                        fontWeight: 500, 
                                        display: { xs: 'none', md: 'block' } 
                                    }}
                                >
                                    Student
                                </Typography>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* POP-UP MESSAGE (Clicking Logo) */}
            <Dialog 
                open={openInfo} 
                onClose={() => setOpenInfo(false)}
                PaperProps={{ sx: { bgcolor: '#0f172a', color: 'white', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', margin: 2 } }}
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
                    <InfoOutlinedIcon color="primary" /> System Information
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                        You are currently in the <strong>Faculty Evaluation System</strong>. 
                        Please ensure you complete your feedback before leaving this page to make sure your voice is heard.
                        <br /><br />
                        "Quality education through continuous faculty development."
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenInfo(false)} variant="contained" fullWidth sx={{ borderRadius: '8px', textTransform: 'none' }}>
                        Understood
                    </Button>
                </DialogActions>
            </Dialog>

            {/* STEP-BY-STEP HELP DIALOG (Clicking How to Use) */}
            <Dialog 
                open={openHelp} 
                onClose={() => setOpenHelp(false)}
                maxWidth="xs"
                disableRestoreFocus
                fullWidth
                PaperProps={{ sx: { bgcolor: '#0f172a', color: 'white', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', p: 1, margin: 2 } }}
            >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 800, fontSize: '1.2rem' }}>
                    Quick Start Guide
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2.5} sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TouchAppIcon color="primary" sx={{ fontSize: 22 }} />
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>1. Get Started</Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>Click "Get Started" on the landing page.</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <ChecklistRtlIcon color="primary" sx={{ fontSize: 22 }} />
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>2. Read Reminders</Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>Read the guidelines and click "I Understand".</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <FilterAltIcon color="primary" sx={{ fontSize: 22 }} />
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>3. Set Filters</Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>Choose Course/Year/Section. Use "Clear all filters" to reset.</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <AssignmentIndIcon color="primary" sx={{ fontSize: 22 }} />
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>4. Pick a Teacher</Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>Select the faculty member you want to evaluate.</Typography>
                            </Box>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button onClick={() => setOpenHelp(false)} variant="contained" sx={{ borderRadius: '10px', px: 4, textTransform: 'none', fontWeight: 'bold' }}>
                        Got it!
                    </Button>
                </DialogActions>
            </Dialog>

            {/* NEW ADDED: Student Identity pop-up */}
            <Dialog 
                open={openStudent} 
                onClose={() => setOpenStudent(false)}
                PaperProps={{
                    sx: {
                        bgcolor: '#0f172a', /* Matched background color */
                        color: 'white',
                        borderRadius: '24px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        p: 1,
                        margin: 2,
                        minWidth: '280px'
                    }
                }}
            >
                {/*new added: title*/}
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 800 }}>
                    Student Identity
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center' }}>
                    <Avatar 
                        sx={{ 
                            width: 60, height: 60, 
                            margin: '0 auto', 
                            bgcolor: 'rgba(255,255,255,0.05)',
                            border: '2px solid',
                            borderColor: 'primary.main',
                            mb: 2 
                        }}
                    >
                        <SchoolIcon sx={{ fontSize: 35, color: 'primary.light' }} />
                    </Avatar>
                    
                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
                        DFCAMPERS
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'primary.light', fontWeight: 600, mb: 2 }}>
                        DFCAM-Scholar
                    </Typography>
                    
                    <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <VerifiedUserIcon sx={{ color: '#4caf50', fontSize: 18 }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                            Active Evaluation Session
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button 
                        onClick={() => setOpenStudent(false)} 
                        variant="contained" 
                        fullWidth
                        sx={{ 
                            borderRadius: '10px', 
                            mx: 2,
                            textTransform: 'none', 
                            fontWeight: 'bold',
                            bgcolor: 'primary.main' /* Matched button color */
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}