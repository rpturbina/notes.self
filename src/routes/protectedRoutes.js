import AddNewPage from '../pages/AddNewPage';
import ArchivePage from '../pages/ArchivePage';
import DetailPage from '../pages/DetailPage';
import HomePage from '../pages/HomePage';

const protectedRoutes = [
  {
    path: '/',
    element: HomePage,
  },
  {
    path: '/notes/:id',
    element: DetailPage,
  },
  {
    path: '/notes/new',
    element: AddNewPage,
  },
  {
    path: '/archives',
    element: ArchivePage,
  },
];

export default protectedRoutes;
