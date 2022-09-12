import { useState } from "react"
import { useRouter } from "next/router"
import { useSession, getSession } from "next-auth/react"

import prisma from "lib/prisma"
import { getProjects } from "lib/data"

import Loading from "components/Loading"
import NewTodo from "components/NewTodo"
import AreYouSure from "components/AreYouSure"
import AreYouSureSub from "components/AreYouSureSub"
import AreYouSureTask from "components/AreYouSureTask"

export default function Dashboard({ projects }) {
    const router = useRouter()
    const [name, setName] = useState("")
    const [sureDisplay, setSureDisplay] = useState(false)
    const [onlyThis, setOnlyThis] = useState("")

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
                className="mt-10 flex flex-row justify-center "
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
                    className="border-2 p-1 font-black outline-none bg-yellow-50 border-red-700"
                    required
                    placeholder="new project name"
                />
                <button
                    disabled={name ? false : true}
                    className={`border-2 px-8 py-2 ml-2 font-bold text-sm uppercase ${
                        name
                            ? "text-emerald-800 border-emerald-800  hover:text-yellow-50 hover:bg-emerald-800"
                            : "cursor-not-allowed text-gray-400 border-gray-400"
                    }`}
                >
                    Add
                </button>
            </form>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 text-left ml-16">
                {projects.map((project, project_index) => (
                    <div key={project_index}>
                        <h2 className="mt-10 font-bold text-emerald-800">
                            {project.name}
                            <span
                                className="cursor-pointer ml-4"
                                onClick={async (e) => {
                                    e.preventDefault()
                                    setSureDisplay(true)
                                    setOnlyThis(project.id)
                                }}
                            >
                                🚮
                            </span>
                            {sureDisplay && onlyThis == project.id && (
                                <AreYouSure
                                    project={project}
                                    setSureDisplay={setSureDisplay}
                                />
                            )}
                        </h2>
                        <NewTodo project_id={project.id} />
                        <ol className="mt-4 list-inside text-left ">
                            {project.todos.map((todo, todo_index) => (
                                <li key={todo_index}>
                                    <span
                                        className="cursor-pointer"
                                        onClick={async (e) => {
                                            e.preventDefault()

                                            await fetch(
                                                todo.done
                                                    ? `/api/complete?done=${true}`
                                                    : `/api/complete?done=${false}`,
                                                {
                                                    body: JSON.stringify({
                                                        id: todo.id,
                                                    }),
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                    method: "POST",
                                                }
                                            )
                                            router.reload()
                                        }}
                                    >
                                        {todo.done ? "✅" : "🟥"}
                                    </span>
                                    <span
                                        className={`${
                                            todo.done
                                                ? "line-through ml-2"
                                                : "ml-2"
                                        }`}
                                    >
                                        {""} {todo.name}
                                    </span>
                                    <span
                                        className="cursor-pointer ml-4 noline"
                                        onClick={async (e) => {
                                            e.preventDefault()
                                            setSureDisplay(true)
                                            setOnlyThis(todo.id)
                                        }}
                                    >
                                        🗑
                                    </span>
                                    {sureDisplay && onlyThis == todo.id && (
                                        <AreYouSureTask
                                            todo={todo}
                                            setSureDisplay={setSureDisplay}
                                        />
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>
                ))}
            </div>
            <p
                className="text-center text-xs mt-40
                 hover:underline cursor-pointer hover:text-red-700"
                onClick={async (e) => {
                    e.preventDefault()
                    setSureDisplay(true)
                    setOnlyThis("sub")
                }}
            >
                cancel your subscription
            </p>
            {sureDisplay && onlyThis == "sub" && (
                <AreYouSureSub setSureDisplay={setSureDisplay} />
            )}
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
