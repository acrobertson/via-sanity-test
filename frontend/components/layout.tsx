import Head from 'next/head';

type LayoutProps = {
    readonly children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
    <>
        <Head>
            <title>Create Next App</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>
        <main>{children}</main>
    </>
);

export default Layout;
