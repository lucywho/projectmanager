import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import Loading from "components/Loading"

export default function Dashboard() {
    const router = useRouter()

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
            <div className="grid sm:grid-cols-2">
                <div>
                    <h2 className="mt-10 font-bold">Project #1</h2>

                    <ol className="mt-4 list-inside list-decimal">
                        <li>TODO 1</li>
                        <li>TODO 2</li>
                        <li>TODO 3</li>
                    </ol>
                </div>
                <div>
                    <h2 className="mt-10 font-bold">Project #2</h2>

                    <ol className="mt-4 list-inside list-decimal">
                        <li>TODO 1</li>
                        <li>TODO 2</li>
                        <li>TODO 3</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}
