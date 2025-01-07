import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import PagesOutlined from '@mui/icons-material/PagesOutlined';
import Dashboard from "../views/Dashboard";
import BlogPosts from "../views/BlogPosts";

export const navigationData = [
  { 
    displayName: 'Dashboard', 
    path: '/', 
    element: <Dashboard />, 
    icon: <DashboardOutlined />
  },
  // { 
  //   displayName: 'Data Table', 
  //   path: 'data-table', 
  //   element: <DataTable />,
  //   icon: <TableChartOutlined />
  // },
  { 
    displayName: 'Blog Posts', 
    path: 'blog-posts', 
    element: <BlogPosts />, 
    icon: <PagesOutlined />
  },
  // { 
  //   displayName: 'Empty Page', 
  //   path: 'empty-page', 
  //   element: <FeaturePage />, 
  //   icon: <CloudQueueOutlined />
  // },
];