import Head from 'next/head';
import { NextPage, GetStaticProps } from 'next';
import sanity from '../lib/sanity';

import Layout from '../components/layout';

interface Author {
    _createdAt: string;
    _id: number;
    _rev: number;
    _type: string;
    _updatedAt: string;
    bio: string;
    image: string;
    name: string;
    slug: string;
}

interface Post {
    _id: number;
    author: Author;
    title: string;
}

type HomeProps = {
    posts: Post[];
};

const query = `*[_type == "post"] {
  _id,
  title,
  author->
}[0...5]
`;

const Home: NextPage<HomeProps> = ({ posts }) => (
    <Layout>
        <h1>Hello World</h1>
        {/* {console.log(posts)} */}
        <div className='posts'>
            {posts.map(post => (
                <div className='post' key={post._id}>
                    <h1>{post.title}</h1>
                    <p>{post.author.name}</p>
                </div>
            ))}
        </div>
    </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
    const posts: Post[] = await sanity.fetch(query);
    return {
        props: { posts }, // will be passed to the page component as props
    };
};

export default Home;
