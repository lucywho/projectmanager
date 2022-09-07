import { useState } from "react"
import { useRouter } from "next/router"
import { useSession, getSession } from "next-auth/react"

import prisma from "lib/prisma"
import { getProjects } from "lib/data"
import Loading from "components/Loading"

export default function Dashboard({ projects }) {
    const router = useRouter()
    const [name, setName] = useState("")

    const { data: session, status } = useSession()

    const loading = status === "loading"

    if (loading) {
        return <Loading />
    }

    if (!session) {
        router.push("/")
        return
    }

    if (!session.user.isSubscriber) {
        router.push("/subscribe")
        return
    }

    return (
        <div className="text-center ">
            <form
                className="mt-10 flex flex-row justify-center"
                onSubmit={async (e) => {
                    e.preventDefault()
                    await fetch("/api/project", {
                        body: JSON.stringify({
                            name,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                    })
                    router.reload()
                }}
            >
                <input
                    onChange={(e) => setName(e.target.value)}
                    className="border p-1 font-black outline-none bg-yellow-50 border-red-800"
                    required
                    placeholder="new project name"
                />
                <button
                    disabled={name ? false : true}
                    className={`border px-8 py-2 ml-2 font-bold ${
                        name
                            ? "text-emerald-800 border-emerald-800 hover:text-yellow-50 hover:bg-emerald-800"
                            : "cursor-not-allowed text-gray-400 border-gray-400"
                    }`}
                >
                    Add
                </button>
            </form>
            <div className="grid sm:grid-cols-2">
                {projects.map((project, index) => (
                    <div key={index}>
                        <h2 className="mt-10 font-bold">{project.name}</h2>

                        <ol className="mt-4 list-inside list-decimal">
                            <li>TODO 1</li>
                            <li>TODO 2</li>
                            <li>TODO 3</li>
                        </ol>
                    </div>
                ))}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const projects = await getProjects(prisma, session?.user.id)

    return {
        props: {
            projects,
        },
    }
}
