import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Loading from "components/Loading"

export default function Home() {
    const router = useRouter()

    const { data: session, status } = useSession()

    const loading = status === "loading"

    if (loading) {
        return <Loading />
    }

    if (session) {
        router.push("/dashboard")
        return
    }

    return (
        <div className="text-center ">
            <p className="mt-10 text-xl text-red-700">
                The best way to manage your projects!
            </p>

            <p className="mt-10">Free 7 days trial then just $19.99/m</p>

            <div className="mt-10">
                <a
                    href="/api/auth/signin"
                    className="bg-red-700 text-yellow-50 border-2 border-red-700 hover:bg-yellow-50 hover:text-red-700 px-5 py-2"
                >
                    Log in
                </a>
            </div>
        </div>
    )
}
