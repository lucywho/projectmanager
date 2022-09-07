import Head from "next/head"

export default function Header() {
    return (
        <>
            <Head>
                <title>Project Manager</title>
                <meta name="description" content="project manager" />
                <link rel="icon" href="/bookmark.ico" />
            </Head>
            <header className=" font-extrabold text-3xl py-2 bg-red-700 text-yellow-50 text-center">
                Project Manager
            </header>
        </>
    )
}
