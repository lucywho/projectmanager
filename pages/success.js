import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import Loading from "components/Loading"

export default function Success() {
    const router = useRouter()
    const { session_id } = router.query

    const { data: session, status } = useSession()

    const loading = status === "loading"

    useEffect(() => {
        const call = async () => {
            await fetch("/api/stripe/success", {
                method: "POST",
                body: JSON.stringify({ session_id }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            window.location = "/dashboard"
        }
        call()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return <Loading />
    }

    if (!session) {
        router.push("/")
        return
    }

    return <div></div>
}

export async function getServerSideProps(context) {
    return {
        props: {},
    }
}
