import React from 'react';
import { motion } from 'framer-motion';
import { 
  Card, CardContent, Typography, CardActions, Button, Box,
  Chip, Stack, Avatar, Divider, Grid
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarIcon from '@mui/icons-material/Star';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

export default function GitHubSection({ repos }) {
  if (!repos.length) {
    return <Typography variant="body1" align="center">No repositories found</Typography>;
  }

  return (
    <Box sx={{ 
      p: 3, 
      backgroundColor: '#1a2235', // Dark blue-green background
      borderRadius: 4,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <Typography variant="h5" gutterBottom sx={{ 
        color: '#88b2fe', // Light blue text
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 3
      }}>
        <GitHubIcon /> Trending Repositories
      </Typography>
      <Grid container spacing={2}>
        {repos.map((repo) => (
          <Grid item xs={12} sm={6} md={6} key={repo.id}>
            <motion.div
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: repo.id * 0.1 % 0.5 // Staggered animation
              }}
            >
              <Card 
                elevation={2}
                sx={{ 
                  backgroundColor: '#2a3447', // Darker card background
                  borderRadius: 3,
                  '&:hover': { 
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#2d3b52'
                  },
                  position: 'relative',
                  overflow: 'visible',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                  <Stack direction="row" alignItems="center" spacing={2} mb={1.5}>
                    <Avatar 
                      src={repo.owner?.avatar_url}
                      sx={{ 
                        width: 28, 
                        height: 28,
                        border: '2px solid #88b2fe'
                      }}
                    />
                    <Typography variant="h6" sx={{ color: '#fff', fontSize: '1rem' }}>
                      {repo.name}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: '#a4b1cd', mb: 2, fontSize: '0.875rem' }}>
                  {(repo.description && repo.description.length > 60)
                    ? repo.description.substring(0, 60) + '...'
                    : repo.description || 'No description available'}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {repo.language && (
                      <Chip
                        size="small"
                        label={repo.language}
                        sx={{
                          backgroundColor: '#384459',
                          color: '#88b2fe',
                          '&:hover': { backgroundColor: '#445169' }
                        }}
                      />
                    )}
                    {repo.stargazers_count > 0 && (
                      <Chip
                        size="small"
                        icon={<StarIcon sx={{ fontSize: 16, color: '#ffd700' }} />}
                        label={repo.stargazers_count}
                        sx={{
                          backgroundColor: '#384459',
                          color: '#fff',
                          '&:hover': { backgroundColor: '#445169' }
                        }}
                      />
                    )}
                    {repo.forks_count > 0 && (
                      <Chip
                        size="small"
                        icon={<AccountTreeIcon sx={{ fontSize: 16, color: '#88b2fe' }} />}
                        label={repo.forks_count}
                        sx={{
                          backgroundColor: '#384459',
                          color: '#fff',
                          '&:hover': { backgroundColor: '#445169' }
                        }}
                      />
                    )}
                  </Stack>
                </CardContent>
                <Divider sx={{ backgroundColor: '#384459' }} />
                <CardActions sx={{ justifyContent: 'flex-end', p: 1.5, backgroundColor: '#232b3d' }}>
                  <Button 
                    variant="contained"
                    size="small"
                    startIcon={<GitHubIcon />}
                    href={repo.html_url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: '#88b2fe',
                      color: '#1a2235',
                      fontSize: '0.75rem',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: '#a4c2fe'
                      }
                    }}
                  >
                    View Repository
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}