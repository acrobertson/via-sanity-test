import { NextPage, GetStaticProps } from 'next';
import Link from 'next/link';
import sanity from '../lib/sanity';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import Layout from '../components/layout';
import imageUrlFor from '../utils/imageUrlFor';
import Stack from '../components/layout/stack';

// types
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
    _id: string;
    author: Author;
    title: string;
    summary: string;
    mainImage: string;
    imageAspect: number;
}

type HomeProps = {
    posts: Post[];
};

// styled components
const Post = styled(motion.article)`
    width: min-content;
    padding: 2em;
    background: #fff;
    border-radius: 5px;
    border-bottom: solid 5px #dadada;
`;

const Title = styled.a`
    & > h1 {
        margin: 1em 0 0;
    }
`;

const Author = styled.p`
    margin: 0.5em 0 0;
    font-size: 0.9rem;
`;

const Summary = styled.p`
    margin: 1.5em 0 0;
`;

// sanity query
const query = `*[_type == "post"] {
  _id,
  title,
  slug,
  summary,
  mainImage,
  "imageAspect": mainImage.asset->.metadata.dimensions.aspectRatio,
  author->
}[0...5]
`;

const Home: NextPage<HomeProps> = ({ posts }) => (
    <Layout title='Sanity/Next Demo'>
        <Stack>
            {posts.map((post) => (
                <Post key={post._id} whileHover={{ scale: 1.025 }}>
                    <img
                        src={imageUrlFor(post.mainImage).width(800).url() ?? ''}
                        width={800}
                        height={800 / post.imageAspect}
                    />
                    <Link href='/post/[id]' as={`/post/${post._id}`} passHref>
                        <Title>
                            <h1>{post.title}</h1>
                        </Title>
                    </Link>
                    <Author>by {post.author.name}</Author>
                    <Summary>{post.summary}</Summary>
                </Post>
            ))}
        </Stack>
    </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
    const posts: Post[] = await sanity.fetch(query);
    return {
        props: { posts },
    };
};

export default Home;
