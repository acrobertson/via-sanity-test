import Head from 'next/head';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';

type LayoutProps = {
    readonly title: string;
    readonly children: React.ReactNode;
};

const Header = styled.div`
    width: 100%;
    padding: 20px 2%;
    background: #34495e;
    margin: 0px;
    border-top: solid 10px #2c3e50;
    color: #fff;
    h1 {
        margin: 0;
        padding: 0;
    }
`;

const Main = styled.main`
    margin: 40px;
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
            <h1>Sanity.io / Next.js Demo</h1>
        </Header>
        <Main>{children}</Main>
    </>
);

export default Layout;
