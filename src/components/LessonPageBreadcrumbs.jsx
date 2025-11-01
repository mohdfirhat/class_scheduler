import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';

const LessonPageBreadcrumbs = () => {
    return (
        <Breadcrumbs aria-label="breadcrumb" sx ={{padding:3}}>
        <Link
          href = '/dashboard/lessons'
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Lesson Overview
        </Link>

        <Link
          href = '/lessons'
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
        >
          <AddIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Create Lesson
        </Link>
      
      </Breadcrumbs>
    );
};
export default LessonPageBreadcrumbs;