import { useNavigate, useParams } from 'react-router';
import { Button, Grid, IconButton, Input, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useNotification } from '../hooks/useNotification';
import { getNotificationMessage } from './BlogPosts';
import { ArrowBackIosNew } from '@mui/icons-material';

export default function BlogPostForm() {
  const { id } = useParams();
  const [blogPostData, setBlogPostData] = useState(null);
  const { notifySuccess, notifyError } = useNotification();
  let navigate = useNavigate(); 
  
  const fetchBlogPost = () => {
    const endpoint = `http://localhost:3000/posts/${id}`;
    useAxios().get(endpoint)
      .then(response => {
        console.log(response)
        setBlogPostData(response.data)
        notifySuccess({ message: getNotificationMessage({ endpoint, response }) });
      })
      .catch(error => {
        console.log(error)
        notifyError({ message: getNotificationMessage({ endpoint, response: error.response }) });
      });
  }

  useEffect(() => fetchBlogPost(false), []);

  const handleInputChange = (e) => {
      const {name, value} = e.target;
      console.log(name, value)
      setBlogPostData({ ...blogPostData, [name]: value });
  };

  const handleSave = () => {
    const endpoint = `http://localhost:3000/posts/${id}`;
    useAxios().put(endpoint, blogPostData)
    .then(response => {
      console.log(response)
      notifySuccess({ message: getNotificationMessage({endpoint, response }) });
    })
    .catch(error => {
      console.log(error);
      notifyError({ message: getNotificationMessage({ endpoint, response: error.response }) });
    })
  }

  if (blogPostData === null) { return (<div>Loading...</div>) }

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <IconButton variant='outlined' size='lg' onClick={() => navigate('/blog-posts')} sx={{ marginRight: '1rem' }}>
          <ArrowBackIosNew />
        </IconButton>
        <Typography level="h1" sx={{ marginBottom: '1rem', display: 'inline' }}>
          {blogPostData.title}
        </Typography>
      </Stack>

      <Grid direction="row" justifyContent="space-between" container>
        <Grid sm={12} md={8}>
          <Typography level="label">Image URL</Typography>
          <Input 
            value={blogPostData.imageUrl}
            name="imageUrl" 
            onChange={handleInputChange}
            placeholder="e.g. https://picsum.photos/200" 
          />
          <img src={`${blogPostData.imageUrl}`} width={128} height="auto" />

          <Typography level="label">Title</Typography>
          <Input 
            value={blogPostData.title}
            name="title" 
            onChange={handleInputChange}
            placeholder="Title"
          />
          
          <Typography level="label">Additional Link</Typography>
          <Input 
            value={blogPostData.href}
            name="href" 
            onChange={handleInputChange}
            placeholder="Additional Link"
          />

          <Typography level="label">Description</Typography>
          <Input 
            value={blogPostData.description}
            name="description" 
            onChange={handleInputChange}
            placeholder="Description"
          />   

          <Typography level="label">Category</Typography>
          <Input 
            value={blogPostData.category}
            name="category" 
            onChange={handleInputChange}
            placeholder="Category"
          />

          <Typography level="label">Review Score</Typography>
          <Input
            value={blogPostData.review} 
            name="review"
            onChange={handleInputChange}
            type="number"
            slotProps={{
              input: {
                min: 1,
                max: 5,
                step: 1,
              },
            }}
          />
       </Grid>

       <Grid>
        <Button onClick={() => handleSave()}>
          Save Changes
        </Button>

       </Grid>
      </Grid>
    </>
  );
}