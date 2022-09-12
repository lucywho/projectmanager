import { useRouter } from "next/router"

export default function AreYouSureSub({ setSureDisplay }) {
    const router = useRouter()

    return (
        <div className="flex flex-row text-red-700 mt-1 w-full justify-center text-sm font-bold">
            <h3>
                Cancelling your subscription will delete all of your data. Are
                you sure?
            </h3>
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
                    await fetch("/api/cancel", {
                        method: "POST",
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
