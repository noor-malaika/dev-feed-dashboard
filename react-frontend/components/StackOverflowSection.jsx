import React from 'react';
import { motion } from 'framer-motion';
import { 
  Card, CardContent, Typography, CardActions, Button, Box,
  Grid, Chip, Stack, Divider 
} from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function StackOverflowSection({ questions }) {
  if (!questions.length) {
    return <Typography variant="body1" align="center">No questions found</Typography>;
  }

  return (
    <Box sx={{ 
      p: 3, 
      backgroundColor: '#2C2C34', // Dark slate background
      borderRadius: 4,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <Typography variant="h5" gutterBottom sx={{ 
        color: '#FF8C38', // Warm orange text
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 3
      }}>
        <QuestionAnswerIcon /> Stack Overflow
      </Typography>
      <Grid container spacing={2}>
        {questions.map((question) => (
          <Grid item xs={12} sm={6} md={6} key={question.question_id}>
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
                delay: question.question_id * 0.1 % 0.5
              }}
            >
              <Card 
                elevation={2}
                sx={{ 
                  backgroundColor: '#363640',
                  borderRadius: 3,
                  '&:hover': { 
                    boxShadow: '0 8px 32px rgba(255, 140, 56, 0.15)',
                    backgroundColor: '#3F3F48'
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
                    {question.title}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {question.tags?.map(tag => (
                      <Chip
                        key={tag}
                        size="small"
                        label={tag}
                        sx={{
                          backgroundColor: '#4A4A53',
                          color: '#FF8C38',
                          '&:hover': { backgroundColor: '#5A5A63' }
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
                <Divider sx={{ backgroundColor: '#4A4A53' }} />
                <CardActions sx={{ 
                  justifyContent: 'space-between', 
                  p: 1.5, 
                  backgroundColor: '#2A2A31'
                }}>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      size="small"
                      icon={<ThumbUpIcon sx={{ fontSize: 16, color: '#7DBA63' }} />}
                      label={question.score || 0}
                      sx={{
                        backgroundColor: '#4A4A53',
                        color: '#E8E8E8',
                        '&:hover': { backgroundColor: '#5A5A63' }
                      }}
                    />
                    <Chip
                      size="small"
                      icon={<PersonIcon sx={{ fontSize: 16, color: '#FF8C38' }} />}
                      label={question.owner?.display_name || 'Anonymous'}
                      sx={{
                        backgroundColor: '#4A4A53',
                        color: '#E8E8E8',
                        '&:hover': { backgroundColor: '#5A5A63' }
                      }}
                    />
                  </Stack>
                  <Button 
                    variant="contained"
                    size="small"
                    startIcon={<QuestionAnswerIcon />}
                    href={question.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: '#FF8C38',
                      color: '#2C2C34',
                      fontSize: '0.75rem',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: '#FFA35E'
                      }
                    }}
                  >
                    View Question
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