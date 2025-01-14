import { useEffect, useState } from "react";
import { Grid, Input, Stack, Typography } from "@mui/joy";
import PostCard from "../components/PostCard";
import ActionModal from "../components/ActionModal";
import { useNotification } from "../hooks/useNotification";
import useAxios from "../hooks/useAxios";

export const getNotificationMessage = ({ endpoint, method, status }) => { 
  return `API Endpoint: ${endpoint}\nMethod: ${method?.toUpperCase()}\nStatus: ${status}`
} 

/**
 * BlogPosts view is basically a view container for <PostCard /> components.
 */
export default function BlogPosts() {
  const [blogPosts, setBlogPosts] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', href: '', description: '', category: '' });
  const [changedData, setChangedData] = useState(false);
  const { notifySuccess, notifyError } = useNotification();

  useEffect(() => {
    const endpoint = 'http://localhost:3000/posts';
    useAxios().get(endpoint)
      .then(result => {
        console.log(result)
        setBlogPosts(result.data)
        notifySuccess({ message: getNotificationMessage({endpoint, method: result.config.method, status: result.status}) })
      })
      .catch(error => {
        console.log(error)
        notifyError({ message: getNotificationMessage({endpoint, method: error.config.method, status: `${error.status ? error.status + '; ' : ''}${error.message}` }) })
      });
    setChangedData(false);
  }, [changedData]);

  const handleInputChange = (e) => {
      const {name, value} = e.target;
      setNewPost({ ...newPost, [name]: value });
  };

  const handleSaveNewPost = () => {
    const endpoint = 'http://localhost:3000/posts'
    useAxios().post(endpoint, newPost)
      .then(result => {
        console.log(result)
        notifySuccess({ message: getNotificationMessage({endpoint, method: result.config.method, status: result.status}) })
        setTimeout(() => setChangedData(true), 5000);
      })
      .catch(error => {
        console.log(error);
        notifyError({ message: getNotificationMessage({endpoint, method: error.config.method, status: `${error.status ? error.status + '; ' : ''}${error.message}` }) })
      });    
  }

  const handleDelete = (id) => {
    const endpoint = `http://localhost:3000/posts/${id}`;
    useAxios().delete(endpoint)
      .then(result => {
        console.log(result);
        notifySuccess({ message: getNotificationMessage({endpoint, method: result.config.method, status: result.status}) })
        setTimeout(() => setChangedData(true), 5000);
      })
      .catch(error => {
        console.log(error);
        notifyError({ message: getNotificationMessage({endpoint, method: error.config.method, status: `${error.status ? error.status + '; ' : ''}${error.message}` }) })
      });
  }

  if (blogPosts === null) { return (<div>Loading...</div>) }

  return (
    <>
      <Typography level="h1" sx={{ marginBottom: '1rem' }}>
        Blog Posts
      </Typography>

      <Grid direction="row" justifyContent="space-between" container>
        <Grid sm={12} md={8}>
          <Stack 
            direction="column" 
            spacing="1rem"
          >
            {blogPosts.map(blog => 
              <PostCard 
                key={blog.id} 
                blog={blog}
                onDelete={handleDelete} 
              />
            )}
          </Stack>
        </Grid>
        
        <Grid>
          <ActionModal title="New Post" onSave={handleSaveNewPost}>
            <div style={{display: 'flex', flexDirection: 'column', marginTop: '1rem'}}>
              <Typography level="label">Title</Typography>
              <Input 
                name="title"
                onChange={handleInputChange} 
                size="sm" 
                placeholder="e.g.: My Post" 
              />
              
              <Typography level="label">Additional Link</Typography>
              <Input 
                name="href"
                onChange={handleInputChange} 
                size="sm" 
                placeholder="e.g.: https://google.com"
              />
              
              <Typography level="label">Description</Typography>
              <Input 
                name="description"
                onChange={handleInputChange} 
                size="sm" 
                placeholder="description"
              />
              
              <Typography level="label">Category</Typography>
              <Input 
                name="category"
                onChange={handleInputChange} 
                size="sm" 
                placeholder="work, dev, fun, etc..."
              />

            </div>
          </ActionModal>
        </Grid>
      </Grid>
    </>
  );
}
