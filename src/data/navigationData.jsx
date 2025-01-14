import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import PagesOutlined from '@mui/icons-material/PagesOutlined';
import Dashboard from "../views/Dashboard";
import BlogPosts from "../views/BlogPosts";
import BlogPostForm from '../views/BlogPostForm';

export const navigationData = [
  { 
    displayName: 'Dashboard', 
    path: '/', 
    element: <Dashboard />, 
    icon: <DashboardOutlined />
  },
  { 
    displayName: 'Blog Posts', 
    path: '/blog-posts', 
    element: <BlogPosts />, 
    icon: <PagesOutlined />
  },
  {
    path: '/blog-post-form/:id', 
    element: <BlogPostForm />, 
  }
];