import { useEffect, useState } from "react";
import { Grid, Input, Stack, Typography } from "@mui/joy";
import PostCard from "../components/PostCard";
import ActionModal from "../components/ActionModal";
import { useNotification } from "../hooks/useNotification";
import useAxios from "../hooks/useAxios";

export const getNotificationMessage = ({ endpoint, response }) => { 
  return (`API Endpoint: ${endpoint}\nMethod: ${response?.config?.method?.toUpperCase()}\nStatus: ${response.status}—${response.statusText}${response.status >= 400 ? `\n${response?.data?.message || ''} (${response?.data?.missingFields || ''})` : '' }`);
} 

export const FETCH_BLOG_POSTS_TIMEOUT = 2250;

/**
 * BlogPosts view is basically a view container for <PostCard /> components.
 */
export default function BlogPosts() {
  const [blogPosts, setBlogPosts] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', href: '', description: '', category: '' });
  const { notifySuccess, notifyError } = useNotification();

  const fetchBlogPosts = () => {
    const endpoint = 'http://localhost:3000/posts';
    useAxios().get(endpoint)
      .then(response => {
        console.log(response)
        setBlogPosts(response.data)
        notifySuccess({ message: getNotificationMessage({ endpoint, response }) });
      })
      .catch(error => {
        console.log(error)
        notifyError({ message: getNotificationMessage({ endpoint, response: error.response }) });
      });
  }

  useEffect(() => fetchBlogPosts(), []);

  const handleInputChange = (e) => {
      const {name, value} = e.target;
      setNewPost({ ...newPost, [name]: value });
  };

  const handleSaveNewPost = () => {
    const endpoint = 'http://localhost:3000/posts'
    useAxios().post(endpoint, newPost)
      .then(response => {
        console.log(response)
        notifySuccess({ message: getNotificationMessage({endpoint, response }) });
        setBlogPosts([...blogPosts, response.data]);
      })
      .catch(error => {
        console.log(error);
        notifyError({ message: getNotificationMessage({ endpoint, response: error.response }) });
      })
  }

  const handleDelete = (id) => {
    const endpoint = `http://localhost:3000/posts/${id}`;
    useAxios().delete(endpoint)
      .then(response => {
        console.log(response);
        notifySuccess({ message: getNotificationMessage({endpoint, response }) });
        setBlogPosts(blogPosts.filter(post => post.id !== id));
      })
      .catch(error => {
        console.log(error);
        notifyError({ message: getNotificationMessage({ endpoint, response: error.response }) });
      })
  }

  const handleToggleFavorite = (id, favoriteNewValue) => {
    const endpoint = `http://localhost:3000/posts/${id}`;
    useAxios().patch(endpoint, { favorite: favoriteNewValue })
    .then(response => {
      console.log(response)
      notifySuccess({ message: getNotificationMessage({endpoint, response }) });
      setBlogPosts(blogPosts.map(post => post.id === id ? response.data : post));
    })
    .catch(error => {
      console.log(error);
        notifyError({ message: getNotificationMessage({ endpoint, response: error.response }) });
    })
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
            {blogPosts.map((blog, i) => 
              <PostCard 
                key={`${blog.id}${i}`} 
                blog={blog}
                onDelete={handleDelete}
                toggleFavorite={handleToggleFavorite}
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
