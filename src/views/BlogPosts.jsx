import { useState } from "react";
import { Grid, Input, Stack, Typography } from "@mui/joy";
import PostCard from "../components/PostCard";
import ActionModal from "../components/ActionModal";

/**
 * Fake data
 */
const blogsData = [
  {
    id: "001",
    title: "Thinking in React",
    href: "https://react.dev/learn/thinking-in-react",
    description: "Getting familiar with React concepts",
    category: "dev",
    image: "https://picsum.photos/200?random=1",
    review: 3
  }, {
    id: "002",
    title: "React App Starter",
    href: "https://github.com/liadbe-genesys/react-app-starter",
    description: "Hassle-free boilerplate to win the hackathon ",
    category: "dev",
    image: "https://picsum.photos/200?random=2",
    review: 3
  }, {
    id: "003",
    title: "Clone a Github Repository",
    href: "https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository",
    description: "Get the files to your laptop",
    category: "dev",
    image: "https://picsum.photos/200?random=3",
    review: 3
  }, {
    id: "004",
    title: "Bike Map Tel-Aviv",
    href: "https://experience.arcgis.com/experience/0b4adbaac0b84c21af90f4ee4a397fe6",
    description: "No more guessing bus ETAs",
    category: "leisure",
    image: "https://picsum.photos/200?random=4",
    review: 3
  }
]

// Init data for the state
const defaultPost = {
  id: '',
  title: '',
  href: '',
  description: '',
  category: '',
  image: 'https://picsum.photos/200',
  review: 3
}

/**
 * BlogPosts view is basically a view container for <PostCard /> components.
 */
export default function BlogPosts() {
  const [blogPosts, setBlogPosts] = useState(blogsData);
  const [newPost, setNewPost] = useState(defaultPost);
  
  // Title we send to the modal
  const title = "Add New Post";

  // save function that we send to the modal
  const onSave = () => {
    const post = {...newPost};
    const blogPostsArr = [...blogPosts];
    post.id = Math.random();
    blogPostsArr.push(post);

    // updating the states
    setBlogPosts(blogPostsArr)
    setNewPost(defaultPost);
  }

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
                removePost={(id) => {
                  let clonedBlogPosts = blogPosts.slice();
                  const blogIdToRemove = blogPosts.findIndex(blog => id === blog.id);
                  if (blogIdToRemove > -1) {
                    clonedBlogPosts.splice(blogIdToRemove, 1);
                    setBlogPosts(clonedBlogPosts);
                  }
                }} 
              />
            )}
          </Stack>
        </Grid>
        <Grid>
          {/** Using the modal */}
          <ActionModal title={title} onSave={onSave}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px'}}>
              <Input placeholder="Title" variant="outlined" onChange={(e) => setNewPost({...newPost, title: e.target.value})} />
              <Input placeholder="Href" variant="outlined" onChange={(e) => setNewPost({...newPost, href: e.target.value})}/>
              <Input placeholder="Description" variant="outlined" onChange={(e) => setNewPost({...newPost, description: e.target.value})}/>
              <Input placeholder="Category" variant="outlined" onChange={(e) => setNewPost({...newPost, category: e.target.value})}/>
            </div>
          </ActionModal>
        </Grid>
      </Grid>
    </>
  );
}
