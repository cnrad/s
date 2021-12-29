import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";

export async function getServerSideProps(ctx: any) {
    let body: any = await fetch("https://api.lanyard.rest/v1/users/705665813994012695").then((res: any) => res.json());

    return {
        props: { body },
    };
}

const Home: NextPage = ({ body }: any) => {
    const [data, setData] = useState(body.data);

    const [second, addSecond] = useState(0);
    let count = 0;

    // This is a really stupid workaround but I render an unused state every second to update the rest of the data lol theres def a better way to do this but i cba
    const updateData = (newData: any) => {
        addSecond(count++);
    };

    useEffect(() => {
        updateData(data);

        setInterval(() => {
            updateData(data);
        }, 1000);

        setInterval(async () => {
            let newBody: any = await fetch("https://api.lanyard.rest/v1/users/705665813994012695").then((res: any) =>
                res.json()
            );
            if (newBody.data.spotify !== data.spotify) setData(newBody.data);
        }, 4000);
    }, []);

    if (data.spotify === null)
        return (
            <div className="w-[100vw] h-[100vh] flex items-center justify-center text-white">
                Not listening to anything right now :(
            </div>
        );

    function fromMS(ms: number) {
        const totalSeconds = ms / 1000;
        const minutes = (~~(totalSeconds / 60)).toString();
        const seconds = (~~(totalSeconds % 60)).toString();
        return minutes + ":" + seconds.padStart(2, "0");
    }

    return (
        <>
            <Head>
                <title>
                    Listening to: {data.spotify.song} by {data.spotify.artist}{" "}
                </title>
            </Head>
            <div className="absolute w-[100vw] h-[100vh] overflow-hidden opacity-80 z-[10] flex items-center justify-center">
                <img className="w-[100vw] blur-2xl z-[10]" src={data.spotify.album_art_url} />
            </div>

            <div className="absolute w-[100vw] h-[100vh] flex items-center justify-center text-white z-[20]">
                <div className="p-8 w-[33rem] bg-[#000] bg-opacity-60 rounded-lg flex flex-col items-center justify-start font-karla">
                    <div className="w-full flex flex-row items-center justify-start mb-6">
                        <img src={data.spotify.album_art_url} className="w-[8rem] h-[8rem] rounded-md" />
                        <div className="ml-6 flex flex-col items-start justify-center">
                            <a
                                href={`https://open.spotify.com/track/${data.spotify.track_id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xl text-white font-semibold"
                            >
                                {data.spotify.song}
                            </a>
                            <h2 className="text-lg text-gray-300 font-normal">{data.spotify.artist}</h2>
                            <h3 className="text-lg text-gray-300 font-normal italic">in {data.spotify.album}</h3>
                        </div>
                    </div>
                    <div className="w-full h-[0.35rem] rounded-full bg-gray-700 mb-1">
                        <div
                            className="bg-gray-300 h-[0.35rem] rounded-full"
                            style={{
                                width: `${(
                                    ((new Date().getTime() - data.spotify.timestamps.start) /
                                        (data.spotify.timestamps.end - data.spotify.timestamps.start)) *
                                    100
                                ).toString()}%`,
                            }}
                        />
                    </div>
                    <div className="w-full h-auto flex flex-row items-center justify-between text-base text-gray-400">
                        <p>{fromMS(new Date().getTime() - data.spotify.timestamps.start)}</p>
                        <p>{fromMS(data.spotify.timestamps.end - data.spotify.timestamps.start)}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
