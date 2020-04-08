import { GetStaticProps, GetStaticPaths } from 'next';
import sanity from '../../lib/sanity';
import BlockContent from '@sanity/block-content-to-react';
import imageUrlFor from '../../utils/imageUrlFor';

import Layout from '../../components/layout';
import styled from '@emotion/styled';

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
    publishedAt: string;
    title: string;
    mainImage: string;
    body: string;
}

type PostProps = {
    post: Post;
};

// styled components
const Article = styled.article`
    width: 800px;
    margin: 0 auto;
    background: white;
`;

const ArticleText = styled.div`
    padding: 2em;
`;

const ArticleHeading = styled.h1`
    margin: 0;
`;

const Subtitle = styled.p`
    margin: 0.5em 0 0;
    font-size: 0.9rem;
`;

// sanity queries
const postsQuery = `*[_type == "post"] { _id }`;

const singlePostQuery = `*[_type == "post" && _id == $id] {
  _id,
  publishedAt,
  author->,
  title,
  mainImage,
  body,
}[0]
`;

const Post = ({ post }: PostProps) => {
    console.log(post);
    return (
        <Layout title={`Post | ${post.title}`}>
            <Article>
                <img src={imageUrlFor(post.mainImage).width(800).url() ?? ''} />
                <ArticleText>
                    <ArticleHeading>{post.title}</ArticleHeading>
                    <Subtitle>By {post.author.name}</Subtitle>
                    <Subtitle>Published {post.publishedAt}</Subtitle>
                    <BlockContent blocks={post.body} />,
                </ArticleText>
            </Article>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts: Post[] = await sanity.fetch(postsQuery);
    const paths = posts.map((post) => ({
        params: { id: post._id },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const post: Post = await sanity.fetch(singlePostQuery, { id: params?.id });
    return { props: { post } };
};

export default Post;
