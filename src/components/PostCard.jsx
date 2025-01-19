
import PropTypes from 'prop-types';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import { Divider, Link } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import { Star, Edit, Delete, StarBorder, FavoriteBorderRounded } from '@mui/icons-material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useNavigate } from 'react-router';

PostCard.propTypes = {
  blog: PropTypes.object
};

export default function PostCard(props) {
  const { blog: { id, title, href, description, category, imageUrl, favorite, review }, onDelete, toggleFavorite } = props;
  let navigate = useNavigate();

  const editPost = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/blog-post-form/${id}`)
  }

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        '&:hover': {
          borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
          bgcolor: 'neutral.softBg',
        },
      }}
    >
      <CardOverflow
        sx={{
          mr: { xs: 'var(--CardOverflow-offset)', sm: 0 },
          mb: { xs: 0, sm: 'var(--CardOverflow-offset)' },
          '--AspectRatio-radius': {
            xs: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0',
            sm: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))',
          },
        }}
      >
        <AspectRatio
          ratio="1"
          flex
          sx={{
            minWidth: { sm: 120, md: 160 },
            '--AspectRatio-maxHeight': { xs: '160px', sm: '9999px' },
          }}
        >
          <img src={`${imageUrl}`} />
          <Stack
            alignItems="center"
            direction="row"
            sx={{ position: 'absolute', top: 0, width: '100%', p: 1 }}
          >
            <IconButton
              variant="plain"
              color={favorite ? 'danger' : 'neutral'}
              sx={{
                display: { xs: 'flex', sm: 'none' },
                ml: 'auto',
                borderRadius: '50%',
                zIndex: '20',
              }}
            >
              <FavoriteRoundedIcon />
            </IconButton>
          </Stack>
        </AspectRatio>
      </CardOverflow>

      <CardContent>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <div>
            <Chip variant='outlined'>{category}</Chip>
            
            <Typography level="title-md">
              <Link
                underline="none"
                href={href}
                sx={{ textDecoration: 'none' }}
                rel='noopener noreferrer'
                target="_blank"
              >
                {title}
              </Link>
            </Typography>

            <Typography level="title-sm">
              {description}
            </Typography>
          </div>

          <Stack direction="row">
            <IconButton
              variant="plain"
              color={favorite ? 'primary' : 'neutral'}
              onClick={() => toggleFavorite(id, !favorite)}
              size='lg'
              sx={{
                display: { xs: 'none', sm: 'flex' },
                borderRadius: '50%',
              }}
            >
              { favorite ? <FavoriteRoundedIcon /> : <FavoriteBorderRounded /> }
            </IconButton>
            
            <Divider orientation='vertical' />

            <IconButton
              variant="plain"
              onClick={editPost}
              size='lg'
              sx={{
                display: { xs: 'none', sm: 'flex' },
                borderRadius: '50%',
              }}
            >
              <Edit />
            </IconButton>

            <Divider orientation='vertical' />

            <IconButton
              variant="plain"
              size='lg'
              onClick={() => onDelete(id)}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                borderRadius: '50%',
              }}
            >
              <Delete />
            </IconButton>
          </Stack>
        </Stack>

        <Stack direction="row" sx={{ mt: 'auto' }} gap="0.25rem" alignItems="center">
            {Array(1,2,3,4,5).map((item, i) => <span key={i}>{i < review ? <Star /> : <StarBorder />}</span>)}
        </Stack>
      </CardContent>
    </Card>
  );
}