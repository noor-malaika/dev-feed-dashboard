import React from 'react';
import { motion } from 'framer-motion';
import { 
  Card, CardContent, Typography, CardActions, Button, Box,
  Grid, Chip, Stack, Divider 
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function HackerNewsSection({ stories }) {
  if (!stories.length) {
    return <Typography variant="body1" align="center">No stories found</Typography>;
  }

  return (
    <Box sx={{ 
      p: 3, 
      backgroundColor: '#2D2420', // Dark brown background
      borderRadius: 4,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <Typography variant="h5" gutterBottom sx={{ 
        color: '#FF6B3D', // Hacker News orange
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 3
      }}>
        <WhatshotIcon /> Top Stories
      </Typography>
      <Grid container spacing={2}>
        {stories.map((story) => (
          <Grid item xs={12} sm={6} md={6} key={story.id}>
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
                delay: story.id * 0.1 % 0.5
              }}
            >
              <Card 
                elevation={2}
                sx={{ 
                  backgroundColor: '#362D28',
                  borderRadius: 3,
                  '&:hover': { 
                    boxShadow: '0 8px 32px rgba(255, 107, 61, 0.15)',
                    backgroundColor: '#3D332E'
                  },
                  position: 'relative',
                  overflow: 'visible',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#E8E8E8',
                      fontSize: '1rem',
                      mb: 2
                    }}
                  >
                    {story.title}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    <Chip
                      size="small"
                      icon={<PersonIcon sx={{ fontSize: 16, color: '#FF6B3D' }} />}
                      label={story.by || 'Anonymous'}
                      sx={{
                        backgroundColor: '#443832',
                        color: '#E8E8E8',
                        '&:hover': { backgroundColor: '#4F423B' }
                      }}
                    />
                    {story.score && (
                      <Chip
                        size="small"
                        icon={<WhatshotIcon sx={{ fontSize: 16, color: '#FF6B3D' }} />}
                        label={`${story.score} points`}
                        sx={{
                          backgroundColor: '#443832',
                          color: '#E8E8E8',
                          '&:hover': { backgroundColor: '#4F423B' }
                        }}
                      />
                    )}
                  </Stack>
                </CardContent>
                <Divider sx={{ backgroundColor: '#443832' }} />
                <CardActions sx={{ 
                  justifyContent: 'space-between', 
                  p: 1.5, 
                  backgroundColor: '#2A211D'
                }}>
                  <Chip
                    size="small"
                    icon={<AccessTimeIcon sx={{ fontSize: 16, color: '#FF6B3D' }} />}
                    label={new Date(story.time * 1000).toLocaleDateString()}
                    sx={{
                      backgroundColor: '#443832',
                      color: '#E8E8E8',
                      '&:hover': { backgroundColor: '#4F423B' }
                    }}
                  />
                  <Button 
                    variant="contained"
                    size="small"
                    startIcon={<LinkIcon />}
                    href={story.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: '#FF6B3D',
                      color: '#2D2420',
                      fontSize: '0.75rem',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: '#FF8B66'
                      }
                    }}
                  >
                    Read Story
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