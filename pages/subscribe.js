import Script from "next/script"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import Loading from "components/Loading"

export default function Subscribe() {
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

    if (session.user.isSubscriber) {
        router.push("/dashboard")
        return
    }

    return (
        <>
            <Script src="https://js.stripe.com/v3/" />
            <div className="text-center ">
                <p className="mt-10">
                    Join for just $19.99/m. Free trial for the first 7 days
                </p>

                <button
                    className="mt-10 bg-red-700 text-yellow-50 border border-red-700 hover:bg-yellow-50 hover:text-red-700 px-5 py-2"
                    onClick={async () => {
                        const res = await fetch("/api/stripe/session", {
                            method: "POST",
                        })

                        const data = await res.json()

                        if (data.status === "error") {
                            alert(data.message)
                            return
                        }

                        const sessionId = data.sessionId
                        const stripePublicKey = data.stripePublicKey

                        const stripe = Stripe(stripePublicKey)
                        stripe.redirectToCheckout({
                            sessionId,
                        })
                    }}
                >
                    Create a subscription
                </button>
            </div>
        </>
    )
}
