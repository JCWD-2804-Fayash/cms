// pages/index.tsx

import getStaticProps from "./pages/index.jsx";

interface Page {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    // Add more fields as per your Contentful content model
  };
}

interface HomeProps {
  pages: Page[];
}

const Home = ({ pages }: HomeProps) => (
  <div>
    <h1>List of Pages</h1>
    <ul>
      {pages && pages.length > 0 ? (
        pages.map((page) => (
          <li key={page.sys.id}>
            <h2>{page.fields.title}</h2>
            {/* Render other fields as needed */}
          </li>
        ))
      ) : (
        <li>No pages found.</li>
      )}
    </ul>
  </div>
);
export default Home;
