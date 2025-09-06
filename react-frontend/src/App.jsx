import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
  CircularProgress, 
  Container, 
  Typography, 
  Box, 
  IconButton,
  Fade,
  Slide,
  Tooltip
} from '@mui/material';
import { 
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  KeyboardArrowDown as ArrowDownIcon,
  QuestionAnswer as StackOverflowIcon,
  Whatshot as HackerNewsIcon
} from '@mui/icons-material';
import GitHubSection from "../components/GitHubSection";
import StackOverflowSection from "../components/StackOverflowSection";
import HackerNewsSection from "../components/HackerNewsSection";
import './index.css';

// Create enhanced theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4ff',
    },
    secondary: {
      main: '#ff6b6b',
    },
    background: {
      default: '#0a0e1a',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      background: 'linear-gradient(45deg, #00d4ff, #ff6b6b)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
    }
  },
});

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { 
      name: 'GitHub', 
      icon: <GitHubIcon sx={{ fontSize: 36, color: '#ffffff' }} />, 
      component: GitHubSection, 
      dataKey: 'github' 
    },
    { 
      name: 'Stack Overflow', 
      icon: <StackOverflowIcon sx={{ fontSize: 36, color: '#f48024' }} />, 
      component: StackOverflowSection, 
      dataKey: 'stackoverflow' 
    },
    { 
      name: 'Hacker News', 
      icon: <HackerNewsIcon sx={{ fontSize: 36, color: '#ff6600' }} />, 
      component: HackerNewsSection, 
      dataKey: 'hackernews' 
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (!loading && !error && data) {
      const interval = setInterval(() => {
        setCurrentSection(prev => (prev + 1) % sections.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [loading, error, data, sections.length]);

  const handleSectionChange = (index) => {
    setCurrentSection(index);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at 50% 50%, #1a1f3a 0%, #0a0e1a 100%)',
          }}
        >
          <Box sx={{ position: 'relative', mb: 3 }}>
            <CircularProgress 
              size={60} 
              thickness={4}
              sx={{ 
                color: '#00d4ff',
                animationDuration: '1s'
              }} 
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '24px'
              }}
            >
              🚀
            </Box>
          </Box>
          <Typography variant="h6" sx={{ color: '#b0bec5' }}>
            Loading DevFeed...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at 50% 50%, #3a1a1a 0%, #0a0e1a 100%)',
          }}
        >
          <Typography color="error" variant="h5">
            ⚠️ Error: {error}
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  const getSectionData = (section) => {
    switch (section.dataKey) {
      case 'github':
        return data.github?.github?.items || [];
      case 'stackoverflow':
        return data.stackoverflow?.stackoverflow?.items || [];
      case 'hackernews':
        return data.hackernews?.hackernews || [];
      default:
        return [];
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          background: 'radial-gradient(circle at 20% 80%, #1a1f3a 0%, #0a0e1a 50%, #1a3a1a 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(128, 90, 213, 0.1) 0%, transparent 50%)
            `,
            animation: 'float 20s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' }
            }
          }}
        />

        {/* Hero Section */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              pb: 8
            }}
          >
            <Fade in timeout={1000}>
              <Box sx={{ mb: 10 }}> {/* Increased margin bottom for more space */}
                <Typography 
                  variant="h1" 
                  sx={{ 
                    mb: 2,
                    textShadow: '0 0 30px rgba(0, 212, 255, 0.5)'
                  }}
                >
                  DevFeed Dashboard
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: '#b0bec5',
                    maxWidth: '600px',
                    mx: 'auto'
                  }}
                >
                  Stay updated with the latest from GitHub, Stack Overflow, and Hacker News
                </Typography>
              </Box>
            </Fade>

            {/* Section Navigation - Icons Only */}
            <Box sx={{ display: 'flex', gap: 4, mb: 8 }}> {/* Increased gap between buttons */}
              {sections.map((section, index) => (
                <Tooltip title={section.name} key={section.name}>
                  <Box
                    onClick={() => handleSectionChange(index)}
                    sx={{
                      p: 3, // Increased padding
                      borderRadius: '50%', // Make it circular
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: currentSection === index 
                        ? 'linear-gradient(45deg, #00d4ff, #ff6b6b)'
                        : 'rgba(255, 255, 255, 0.1)',
                      transform: currentSection === index ? 'scale(1.1)' : 'scale(1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 80, // Fixed width
                      height: 80, // Fixed height
                      '&:hover': {
                        transform: 'scale(1.05)',
                        background: 'linear-gradient(45deg, #00d4ff, #ff6b6b)',
                      }
                    }}
                  >
                    {section.icon}
                  </Box>
                </Tooltip>
              ))}
            </Box>

            <IconButton
              sx={{
                color: '#00d4ff',
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                  '40%': { transform: 'translateY(-10px)' },
                  '60%': { transform: 'translateY(-5px)' }
                }
              }}
              onClick={() => {
                document.getElementById('sections').scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <ArrowDownIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        </Container>

        {/* Sections Slideshow */}
        <Box id="sections" sx={{ position: 'relative', zIndex: 2, pb: 8 }}>
          <Container maxWidth="xl">
            {data && sections.map((section, index) => {
              const SectionComponent = section.component;
              const sectionData = getSectionData(section);
              
              return (
                <Slide
                  key={section.name}
                  direction="left"
                  in={currentSection === index}
                  timeout={800}
                  mountOnEnter
                  unmountOnExit
                >
                  <Box
                    sx={{
                      position: currentSection === index ? 'relative' : 'absolute',
                      width: '100%',
                      top: currentSection === index ? 'auto' : 0,
                    }}
                  >
                    <Box
                      sx={{
                        mb: 4,
                        textAlign: 'center',
                        p: 4,
                        borderRadius: '30px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        mx: 2
                      }}
                    >
                      <Typography 
                        variant="h2" 
                        sx={{ 
                          mb: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 2,
                          color: '#ffffff' // Ensuring text is white
                        }}
                      >
                        {section.icon}
                        {section.name}
                      </Typography>
                      
                      <SectionComponent 
                        {...(section.dataKey === 'github' ? { repos: sectionData } :
                           section.dataKey === 'stackoverflow' ? { questions: sectionData } :
                           { stories: sectionData })}
                      />
                    </Box>
                  </Box>
                </Slide>
              );
            })}
          </Container>
        </Box>

        {/* Social Links Footer */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            py: 6,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#ffffff' }}>
                Let's Connect! 🚀
              </Typography>
              <Typography variant="body1" sx={{ color: '#b0bec5', mb: 4 }}>
                Follow my journey and connect with me
              </Typography>
            </Box>
            
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 3,
                mb: 3
              }}
            >
              <IconButton
                component="a"
                href="https://github.com/yourusername" // Replace with your GitHub
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  p: 2,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #333, #666)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px) scale(1.1)',
                    background: 'linear-gradient(45deg, #24292e, #586069)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                  }
                }}
              >
                <GitHubIcon sx={{ fontSize: 30 }} />
              </IconButton>

              <IconButton
                component="a"
                href="https://linkedin.com/in/yourprofile" // Replace with your LinkedIn
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  p: 2,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #0077b5, #00a0dc)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px) scale(1.1)',
                    background: 'linear-gradient(45deg, #005582, #0077b5)',
                    boxShadow: '0 10px 25px rgba(0,119,181,0.3)'
                  }
                }}
              >
                <LinkedInIcon sx={{ fontSize: 30 }} />
              </IconButton>

              <IconButton
                component="a"
                href="mailto:your.email@gmail.com" // Replace with your email
                sx={{
                  p: 2,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #ea4335, #fbbc04)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px) scale(1.1)',
                    background: 'linear-gradient(45deg, #d33b2c, #f9ab00)',
                    boxShadow: '0 10px 25px rgba(234,67,53,0.3)'
                  }
                }}
              >
                <EmailIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Box>

            <Typography 
              variant="body2" 
              sx={{ 
                textAlign: 'center', 
                color: '#777',
                mt: 4
              }}
            >
              Made with ❤️ by Malaika
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}