import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CircularProgress, Container, Typography, Box, AppBar, Toolbar } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GitHubSection from "../components/GitHubSection";
import StackOverflowSection from "../components/StackOverflowSection";
import HackerNewsSection from "../components/HackerNewsSection";
import './index.css';

// Create theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#88b2fe',
    },
    background: {
      default: '#131825',
      paper: '#1E2433',
    },
  },
});

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #131825 0%, #1E2433 100%)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #131825 0%, #1E2433 100%)',
        }}
      >
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #131825 0%, #1E2433 100%)',
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Toolbar>
            <RocketLaunchIcon sx={{ mr: 2 }} />
            <Typography variant="h5" component="h1">
              Dev Feed Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)'
              }
            }}
          >
            {data && (
              <>
                <GitHubSection repos={data.github?.github?.items || []} />
                <StackOverflowSection questions={data.stackoverflow?.stackoverflow?.items || []} />
                <HackerNewsSection stories={data.hackernews?.hackernews || []} />
              </>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}