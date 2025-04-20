
import Layout from '../Layout/Layout';
import TanstackTable from '../Layout/TanstackTable';


const MoviesPage = () => {
 

  document.title = 'All Movies';

  return (
    <Layout>
      <TanstackTable/>
    </Layout>
  );
};

export default MoviesPage;
