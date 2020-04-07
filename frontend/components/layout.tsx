import Head from 'next/head';
import { Global, css } from '@emotion/core'

type LayoutProps = {
    readonly children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
    <>
        <Head>
            <title>Create Next App</title>
            <link rel='icon' href='/favicon.ico' />
            <link href='https://fonts.googleapis.com/css2?family=Roboto' rel='stylesheet' />
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
        <main>{children}</main>
    </>
);

export default Layout;
