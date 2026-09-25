import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

// Pages & Components
import Home from './pages/Home';
import Evaluation from './pages/evaluation';
import Navbar from './components/Navbar';

function App() {
    // 1. INITIALIZE STATE WITH SESSION CACHE
    // Reads instantly from memory if the student is returning from evaluating a teacher
    const [allData, setAllData] = useState(() => {
        const cached = sessionStorage.getItem('evaluation_data');
        return cached ? JSON.parse(cached) : null;
    });

    const [settings, setSettings] = useState(() => {
        const cached = sessionStorage.getItem('evaluation_settings');
        return cached ? JSON.parse(cached) : { 
            academicYear: 'Loading...', 
            semester: 'Loading...',
            website_status: 'OPEN'
        };
    });

    // 2. FETCH DATA ONLY ONCE ON MOUNT
    useEffect(() => {
        // Skip fetching if we already cached data during this session
        if (allData) return;

        const apiUrl = import.meta.env.VITE_API_URL;

        if (!apiUrl) {
            console.error("API URL is missing! Check your .env file or Vercel settings.");
            return;
        }

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                const teacherData = data.teachers || [];
                const settingData = data.settings || data.website_status || {
                    academicYear: 'Loading...', 
                    semester: 'Loading...',
                    website_status: 'OPEN'
                };

                // Update State
                setAllData(teacherData);
                setSettings(settingData);

                // Save to Session Storage (Keeps data alive while tab is open)
                sessionStorage.setItem('evaluation_data', JSON.stringify(teacherData));
                sessionStorage.setItem('evaluation_settings', JSON.stringify(settingData));
            })
            .catch(err => {
                console.error("Data fetch failed:", err);
            });
    }, []);

    // 3. SYSTEM CLOSED VIEW (EXACT ORIGINAL STYLING & STRUCTURE)
    if (settings && settings.website_status === 'CLOSED') {
        return (
            <Box sx={{ 
                // 1. ENSURE FULL COVERAGE
                height: '100dvh', 
                width: '100vw',
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                
                // 2. USE YOUR INDEX.CSS VARIABLES
                bgcolor: 'var(--bg)', // Deep Navy: #0f172a
                color: 'var(--text-h)', // White: #f9fafb
                
                // 3. RESPONSIVE PADDING
                textAlign: 'center',
                p: { xs: 2, sm: 4, md: 6 }, 
                boxSizing: 'border-box',
                fontFamily: 'var(--sans)'
            }}>
                {/* ICON SIZE ADAPTS TO SCREEN */}
                <LockResetIcon sx={{ 
                    fontSize: { xs: 80, sm: 100, md: 120 }, 
                    color: 'var(--dfcam-gold)', // Use your gold variable
                    mb: 2 
                }} />
                
                {/* TEXT SIZES ADAPT TO SCREEN */}
                <Typography 
                    variant="h3" 
                    sx={{ 
                        fontWeight: 800,
                        fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                        letterSpacing: '-1px'
                    }}
                >
                    SYSTEM CLOSED
                </Typography>

                <Typography 
                    variant="h6" 
                    sx={{ 
                        mt: 2, 
                        color: 'var(--accent)', // Light Blue: #80d8ff
                        maxWidth: '600px',
                        fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' },
                        lineHeight: 1.5,
                        px: 2
                    }}
                >
                    The DFCAMCLP Faculty Evaluation system is currently closed. 
                    Please wait for the official announcement from the Admin.
                </Typography>

                {/* DECORATIVE ACCENT LINE */}
                <Box sx={{ 
                    mt: 4, 
                    width: '40px', 
                    height: '4px', 
                    bgcolor: 'var(--dfcam-blue)', 
                    borderRadius: '2px' 
                }} />
            </Box>
        );
    }

    // 4. RENDERING & ROUTES
    return (
        <>
            {/* Navbar */}
            <Navbar settings={settings} />

            <Routes>
                {/* Landing Page */}
                <Route 
                    path="/" 
                    element={<Home allData={allData} settings={settings} />} 
                />
                
                {/* Main Evaluation Page */}
                <Route 
                    path="/evaluation" 
                    element={<Evaluation allData={allData} />} 
                />
            </Routes>
        </>
    );
}

export default App;