import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function RecipeCard({ title, subheader, image, body, avatarLetter, expandedContent }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 345,
        bgcolor: 'var(--card-bg)',
        borderRadius: '12px',
        outline: '5px solid var(--border-color)',
        color: 'var(--text-color)',
        boxShadow: '0 4px 12px rgba(22, 22, 22, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        }
      }}
    >
      <CardHeader
        avatar={
          <Avatar 
            sx={{ 
              bgcolor: 'var(--accent)',
              color: '#fff'
            }} 
            aria-label="recipe"
          >
            {avatarLetter}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" sx={{ color: 'var(--text-color)' }}>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h6" sx={{ color: 'var(--text-color)', fontWeight: 600 }}>
            {title}
          </Typography>
        }
        subheader={
          <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
            {subheader}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'var(--text-color)' }}>
          {body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" sx={{ color: 'var(--accent)' }}>
          <FavoriteIcon  />
        </IconButton>
        <IconButton aria-label="share" sx={{ color: 'var(--text-color)' }}>
          <ShareIcon />
        </IconButton>
        {expandedContent && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ color: 'var(--text-color)' }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>
      {expandedContent && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {expandedContent}
          </CardContent>
        </Collapse>
      )}
    </Card>
  );
}
         
