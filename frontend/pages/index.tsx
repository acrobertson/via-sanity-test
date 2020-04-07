import Head from 'next/head';
import { NextPage, GetStaticProps } from 'next';
import sanity from '../lib/sanity';

import { css, cx } from 'emotion'

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
        <div className={css`
            width: 100%;
            padding: 20px 2%;
            background: #34495e;
            margin: 0px;
            border-top: solid 10px #2c3e50;
            color: #fff;
        `}>
            <h1 className={css`
                margin: 0px;
                padding: 0px;
            `}>Sanity.io / Next.js Demo</h1>
        </div>
        {/* {console.log(posts)} */}
        <div className={css`
            margin: 40px;
        `}>
            {posts.map(post => (
                <div className={css`
                    margin-bottom: 40px;
                    padding: 10px 20px;
                    background: #fff;
                    border-radius: 5px;
                    border-bottom: solid 5px #dadada;
                `} key={post._id}>
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
