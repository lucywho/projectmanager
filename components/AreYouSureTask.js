import { useRouter } from "next/router"

export default function AreYouSureTask({ todo, setSureDisplay }) {
    const router = useRouter()

    return (
        <div className="flex flex-row text-red-700 mt-1">
            <h3>Delete this task?</h3>
            <button
                className="cursor-pointer ml-4 px-2 border border-red-700 hover:bg-emerald-700 hover:border-emerald-900 hover:text-yellow-50"
                onClick={(e) => {
                    e.preventDefault()
                    setSureDisplay(false)
                    return
                }}
            >
                no
            </button>
            <button
                className="cursor-pointer ml-4 px-2 border border-red-700 hover:bg-red-700 hover:text-yellow-50"
                onClick={async (e) => {
                    e.preventDefault()
                    await fetch("/api/todo", {
                        body: JSON.stringify({
                            id: todo.id,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: "DELETE",
                    })

                    setSureDisplay(false)
                    router.reload()
                }}
            >
                yes
            </button>
        </div>
    )
}
