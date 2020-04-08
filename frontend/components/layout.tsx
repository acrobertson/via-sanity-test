import Head from 'next/head';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import Link from 'next/link';

type LayoutProps = {
    readonly title: string;
    readonly children: React.ReactNode;
};

const Header = styled.div`
    width: 100%;
    padding: 1.5em 4em;
    background: #34495e;
    margin: 0px;
    border-top: solid 10px #2c3e50;
    color: #fff;
    h1 {
        margin: 0;
        padding: 0;
    }
`;

const HomeLink = styled.a`
    color: white;
    &:visited {
        color: white;
    }
`;

const Main = styled.main`
    max-width: 1280px;
    margin: 0 auto;
    padding: 2em 0;
`;

const Layout = ({ title, children }: LayoutProps) => (
    <>
        <Head>
            <title>{title}</title>
            <link rel='icon' href='/favicon.ico' />
            <link
                href='https://fonts.googleapis.com/css2?family=Roboto'
                rel='stylesheet'
            />
        </Head>
        <Global
            styles={css`
                html {
                    box-sizing: border-box;
                }
                *,
                *:before,
                *:after {
                    box-sizing: inherit;
                }
                body {
                    margin: 0;
                    background: #eef0f7;
                    font-family: 'Roboto', sans-serif;
                }
            `}
        />
        <Header>
            <Link href='/' passHref>
                <HomeLink>
                    <h1>Sanity.io / Next.js Demo</h1>
                </HomeLink>
            </Link>
        </Header>
        <Main>{children}</Main>
    </>
);

export default Layout;
