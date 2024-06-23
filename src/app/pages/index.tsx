// Misalnya, di halaman pages/index.tsx
import { GetStaticProps } from "next";
import client from "../../lib/contentful";

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
      {pages.map((page) => (
        <li key={page.sys.id}>
          <h2>{page.fields.title}</h2>
          {/* Render other fields as needed */}
        </li>
      ))}
    </ul>
  </div>
);

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const response = await client.getEntries({
      content_type: "page", // Sesuaikan berdasarkan tipe konten di Contentful
    });

    const pages: Page[] = response.items.map((item) => ({
      sys: item.sys,
      fields: item.fields as {
        title: string;
        // Add more fields as per your Contentful content model
      },
    }));

    return {
      props: {
        pages,
      },
    };
  } catch (error) {
    console.error("Error retrieving Contentful data:", error);
    return {
      props: {
        pages: [],
      },
    };
  }
};
