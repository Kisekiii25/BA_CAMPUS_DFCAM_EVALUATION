import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

// Pages & Components
import Home from './pages/Home';
import Evaluation from './pages/evaluation';
import Navbar from './components/Navbar';

// CACHE EXPIRATION TIME: 12 Hours (in milliseconds)
const CACHE_TTL = 12 * 60 * 60 * 1000; 

function App() {
    // Helper function to safely read cached local data
    const getCachedData = (key) => {
        try {
            const cached = localStorage.getItem(key);
            const cachedTime = localStorage.getItem(`${key}_time`);
            
            if (cached && cachedTime) {
                const isExpired = Date.now() - Number(cachedTime) > CACHE_TTL;
                if (!isExpired) {
                    return JSON.parse(cached);
                }
            }
        } catch (e) {
            console.error("Storage read error:", e);
        }
        return null;
    };

    // 1. INITIALIZE STATE WITH LOCAL STORAGE (Persists inside Messenger)
    const [allData, setAllData] = useState(() => getCachedData('evaluation_data'));

    const [settings, setSettings] = useState(() => {
        const cachedSettings = getCachedData('evaluation_settings');
        return cachedSettings || { 
            academicYear: 'Loading...', 
            semester: 'Loading...',
            website_status: 'OPEN'
        };
    });

    // 2. FETCH DATA ONLY IF CACHE IS MISSING/EXPIRED
    useEffect(() => {
        // If we already have fresh local cached data, don't re-fetch from Google Sheets
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

                // Save to LocalStorage (Stays alive even if Messenger webview restarts)
                try {
                    const now = Date.now().toString();
                    localStorage.setItem('evaluation_data', JSON.stringify(teacherData));
                    localStorage.setItem('evaluation_data_time', now);
                    
                    localStorage.setItem('evaluation_settings', JSON.stringify(settingData));
                    localStorage.setItem('evaluation_settings_time', now);
                } catch (e) {
                    console.error("Storage save error:", e);
                }
            })
            .catch(err => {
                console.error("Data fetch failed:", err);
            });
    }, [allData]);

    // 3. SYSTEM CLOSED VIEW (EXACT ORIGINAL STYLING & STRUCTURE)
    if (settings && settings.website_status === 'CLOSED') {
        return (
            <Box sx={{ 
                height: '100dvh', 
                width: '100vw',
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                
                bgcolor: 'var(--bg)', // Deep Navy: #0f172a
                color: 'var(--text-h)', // White: #f9fafb
                
                textAlign: 'center',
                p: { xs: 2, sm: 4, md: 6 }, 
                boxSizing: 'border-box',
                fontFamily: 'var(--sans)'
            }}>
                <LockResetIcon sx={{ 
                    fontSize: { xs: 80, sm: 100, md: 120 }, 
                    color: 'var(--dfcam-gold)', 
                    mb: 2 
                }} />
                
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
                        color: 'var(--accent)', 
                        maxWidth: '600px',
                        fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' },
                        lineHeight: 1.5,
                        px: 2
                    }}
                >
                    The DFCAMCLP Faculty Evaluation system is currently closed. 
                    Please wait for the official announcement from the Admin.
                </Typography>

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
            <Navbar settings={settings} />

            <Routes>
                <Route 
                    path="/" 
                    element={<Home allData={allData} settings={settings} />} 
                />
                
                <Route 
                    path="/evaluation" 
                    element={<Evaluation allData={allData} />} 
                />
            </Routes>
        </>
    );
}

export default App;