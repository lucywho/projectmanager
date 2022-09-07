import { useState } from "react"
import { useRouter } from "next/router"

export default function NewTodo({ project_id }) {
    const router = useRouter()
    const [name, setName] = useState("")

    return (
        <form
            className="mt-5 flex flex-row text-sm "
            onSubmit={async (e) => {
                e.preventDefault()
                await fetch("/api/todo", {
                    body: JSON.stringify({
                        name,
                        project_id,
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
                placeholder="new todo"
            />
            <button
                disabled={name ? false : true}
                className={`border px-4 py-2 ml-2 font-bold text-xs uppercase ${
                    name
                        ? "text-emerald-800 border-emerald-800 hover:text-yellow-50 hover:bg-emerald-800"
                        : "cursor-not-allowed text-gray-400 border-gray-400"
                }`}
            >
                Add
            </button>
        </form>
    )
}
