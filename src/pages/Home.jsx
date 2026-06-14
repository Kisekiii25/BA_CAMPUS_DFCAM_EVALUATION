import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import schoolLogo from '../assets/DFCAM-logo.webp';
import LoadingScreen from '../components/LoadingScreen';

import { 
    Box, Typography, Button, Container, Dialog, 
    DialogTitle, DialogContent, DialogActions, Stack
} from '@mui/material';

export default function Home({ allData, settings }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
        setOpen(false);
        navigate('/evaluation');
    };

    // LOADING WHILE FECHING IS LOADING (LOADING THE SETTING AND ALLDATA)
    if (!allData || !settings) {
        return <LoadingScreen />;

    }

    return (
        <Box sx={{ 
            minHeight: 'calc(100dvh - 82px)', 
            width: '100%',
            bgcolor: '#0f172a',
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url('/hero-bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'center',
            overflowY: 'auto',
            
        }}>
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4, md: 10 } }}> 
                <Stack 
                    direction={{ xs: 'column', md: 'row' }} 
                    spacing={{ xs: 3, md: 6 }} 
                    alignItems="center"
                    justifyContent="center"
                    // sx={{ minHeight: 'calc(100vh - 120px)' }}
                >
                    {/* LEFT SIDE: LOGO */}
                    <Box 
                        component="img" 
                        src={schoolLogo}
                        sx={{ 
                            width: { xs: 140, sm: 180, md: 240 }, 
                            height: 'auto',
                            borderRadius: '50%', 
                            bgcolor: '#fff',     
                            p: 0.5,              
                            boxShadow: '0px 0px 40px rgba(37, 99, 235, 0.2)',
                            flexShrink: 0        
                        }} 
                    />

                    {/* RIGHT SIDE: TEXT CONTENT */}
                    <Box sx={{ 
                        color: '#fff', 
                        flexGrow: 0, 
                        textAlign: { xs: 'center', md: 'left' },
                        px: { xs: 1, md: 0 } 
                    }}>
                        <Typography variant="overline" sx={{ 
                            letterSpacing: { xs: 1, md: 3 }, 
                            color: 'primary.light', 
                            fontWeight: 700, 
                            opacity: 0.8,
                            fontSize: { xs: '0.65rem', md: '0.75rem' },
                            display: 'block'
                        }}>
                            GUIDANCE AND COUNSELING SERVICES OFFICE
                        </Typography>
                        
                        <Typography variant="h2" sx={{ 
                            fontWeight: 800, 
                            mt: 1, 
                            mb: 2, 
                            lineHeight: 1.1,
                            fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.8rem' }, 
                        }}>
                            DR. FILEMON C. AGUILAR MEMORIAL COLLEGE OF LAS PIÑAS
                        </Typography>

                        <Typography variant="h6" sx={{ 
                            mb: 4, 
                            fontWeight: 300, 
                            color: 'rgba(255,255,255,0.7)', 
                            fontSize: { xs: '0.9rem', md: '1.1rem' } 
                        }}>
                            BA CAMPUS | STUDENT – FACULTY PERFORMANCE EVALUATION
                            <Box component="span" sx={{ display: 'block', mt: 1, opacity: 0.6 }}>
                                A.Y. {settings.academicYear} ({settings.semester})
                            </Box>
                        </Typography>

                        <Button 
                            variant="outlined" 
                            onClick={handleOpen}
                            sx={{ 
                                color: '#fff', 
                                borderColor: 'rgba(255,255,255,0.5)', 
                                px: { xs: 4, md: 5 }, 
                                py: 1.2, 
                                borderRadius: '4px', 
                                fontSize: '0.9rem',
                                borderWidth: 1.5,
                                '&:hover': { 
                                    bgcolor: '#fff', 
                                    color: '#0f172a',
                                    borderColor: '#fff'
                                }
                            }}
                        >
                            GET STARTED
                        </Button>
                    </Box>
                </Stack>
            </Container>

             {/* REMINDER DIALOG */}
            <Dialog 
                open={open} 
                onClose={handleClose} 
                fullWidth
                maxWidth="xs"
                disableRestoreFocus
                aria-labelledby="reminder-dialog-title"
                slotProps={{
                    backdrop: {
                        sx: { backgroundColor: 'rgba(2, 6, 23, 0.7)' }
                    }
                }}
                PaperProps={{ 
                    sx: { 
                        bgcolor: '#1e293b',
                        color: '#fff', 
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    } 
                }}
            >
                <DialogTitle sx={{ fontWeight: 800, fontSize: { xs: '1.3rem', md: '1.5rem' }, pb: 1 }}>
                    Reminder:
                </DialogTitle>

                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2, opacity: 0.9, fontSize: { xs: '0.9rem', md: '1rem' }, lineHeight: 1.5 }}>
                        This Online Evaluation aims to obtain feedback from you to assess our faculty members based on the given indicators.
                        <br /> <br />
                        Please rate the quality of the performance of the faculty concerned.
                        <br /> <br />
                        All instructors must be evaluated. Kindly give an accurate and honest response to each of the items. 
                        <br /> <br />
                        <b>Don't use foul words.</b>                 
                    </Typography>
                    
                    <Typography variant="body1" sx={{ 
                        fontWeight: 'bold', 
                        color: 'primary.light',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        bgcolor: 'rgba(37, 99, 235, 0.1)',
                        p: 1.5,
                        borderRadius: '8px',
                        borderLeft: '4px solid'
                    }}>
                        Note: 5 is the highest grade and 1 is the lowest.
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ p: { xs: 2, md: 3 }, gap: 1 }}>
                    <Button onClick={handleClose} sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleConfirm} 
                        variant="contained" 
                        sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}
                    >
                        I Understand
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}