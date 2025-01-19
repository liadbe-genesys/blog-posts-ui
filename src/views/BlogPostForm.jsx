import { useParams } from 'react-router';
import { Button, Grid, Input, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useNotification } from '../hooks/useNotification';
import { getNotificationMessage } from './BlogPosts';

export default function BlogPostForm() {
  const { id } = useParams();
  const [blogPostData, setBlogPostData] = useState(null);
  const [changedData, setChangedData] = useState(false);
  const { notifySuccess, notifyError } = useNotification();

  useEffect(() => {
    const endpoint = `http://localhost:3000/posts/${id}`;
    useAxios().get(endpoint)
      .then(result => {
        console.log(result)
        setBlogPostData(result.data)
        notifySuccess({ message: getNotificationMessage({endpoint, method: result.config.method, status: result.status}) })
      })
      .catch(error => {
        console.log(error);
        notifyError({ message: getNotificationMessage({endpoint, method: error.config.method, status: `${error.status ? error.status + '; ' : ''}${error.response.data.message}` }) })
      });
    setChangedData(false);
  }, [changedData]);

  const handleInputChange = (e) => {
      const {name, value} = e.target;
      console.log(name, value)
      setBlogPostData({ ...blogPostData, [name]: value });
  };

  const handleSave = () => {
    const endpoint = `http://localhost:3000/posts/${id}`;
    useAxios().put(endpoint, blogPostData)
    .then(result => {
      console.log(result)
      notifySuccess({ message: getNotificationMessage({endpoint, method: result.config.method, status: result.status}) })
      setTimeout(() => setChangedData(true), 2000);
    })
    .catch(error => {
      console.log(error);
      notifyError({ message: getNotificationMessage({endpoint, method: error.config.method, status: `${error.status ? error.status + '; ' : ''}${error.response.data.message}` }) })
    }); 
  }

  if (blogPostData === null) { return (<div>Loading...</div>) }

  return (
    <>
      <Typography level="h1" sx={{ marginBottom: '1rem' }}>
        {blogPostData.title}
      </Typography>

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