import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>cnrad's next.js template</title>
            </Head>
            <div className="w-[100vw] h-[100vh] flex items-center justify-center text-white text-3xl">
                cnrad's next.js template
            </div>
        </>
    );
};

export default Home;
