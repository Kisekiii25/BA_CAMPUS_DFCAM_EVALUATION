import { Paper, Box, Typography, Button, Avatar, useTheme } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';

export default function TeacherCard({ name, subject, image, formLink }) {
    const theme = useTheme();
    

    return (
        <Paper 
            elevation={0} 
            sx={{ 
                display: 'flex', 
                // Responsive layout: Column on mobile, Row on desktop
                flexDirection: { xs: 'column', sm: 'row' }, 
                alignItems: { xs: 'stretch', sm: 'center' }, 
                justifyContent: 'space-between', 
                p: 2, 
                width: '100%', 
                boxSizing: 'border-box',
                // borderRadius: '12px',
                // bgcolor: '#1e293b', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                gap: { xs: 2, sm: 0 },
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    bgcolor: '#243147', // Slight lighten on hover
                }
            }}
        >
            {/* --- SECTION 1: AVATAR AND INFO --- */}
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                <Avatar 
                    src={image} 
                    sx={{ 
                        width: 50, 
                        height: 50, 
                        mr: 2, 
                        bgcolor: 'primary.main', 
                        color: 'common.white'
                    }}
                >
                    {/* Fallback to first letter if no image */}
                    {name ? name.charAt(0) : "U"}
                </Avatar>
                
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    {/* Faculty Name - Ellipsis handles long names on desktop */}
                    <Typography 
                        variant="subtitle1" 
                        sx={{ 
                            fontWeight: 700, 
                            whiteSpace: { xs: 'normal', sm: 'nowrap' }, 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            color: 'common.white'
                        }}
                    >
                        {name || "Instructor Name"}
                    </Typography>

                    {/* Subject/Department Info */}
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {subject || "Instructor"}
                    </Typography>
                </Box>
            </Box>

            {/* --- SECTION 2: ACTION BUTTON --- */}
            <Button 
                variant="contained" 
                target="_blank"             
                rel="noopener noreferrer"
                href={formLink}
                aria-label={`Evaluate ${name || 'Instructor'}`}
                startIcon={<RateReviewIcon />} 
                sx={{ 
                    ml: { xs: 0, sm: 2 }, 
                    // borderRadius: '8px', 
                    // textTransform: 'none', 
                    // fontWeight: 'bold',
                    // Button becomes full width on mobile for easier tapping
                    width: { xs: '100%', sm: 'auto' },
                    py: { xs: 1.2, sm: 1 },
                    boxShadow: theme.shadows[2]
                }}
            >
                Evaluate
            </Button>
        </Paper>
    );
}
