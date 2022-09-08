import { useRouter } from "next/router"

export default function AreYouSure({ project, setSureDisplay }) {
    const router = useRouter()

    return (
        <div className="flex flex-row text-red-700">
            <h1>Delete entire project?</h1>
            <button
                className="cursor-pointer ml-4 px-2 border border-red-700 hover:bg-emerald-700 hover:border-emerald-900 hover:text-yellow-50"
                onClick={(e) => {
                    e.preventDefault()
                    // router.reload()
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
                    await fetch("/api/project", {
                        body: JSON.stringify({
                            id: project.id,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: "DELETE",
                    })

                    router.reload()
                }}
            >
                yes
            </button>
        </div>
    )
}
