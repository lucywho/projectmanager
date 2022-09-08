import prisma from "lib/prisma"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(501).end()
    }

    const session = await getSession({ req })
    if (!session) return res.status(401).json({ message: "user not logged in" })

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    })

    if (!user) return res.status(401).json({ message: "user not found" })

    await prisma.todo.update({
        data: {
            done: false,
        },
        where: {
            id: req.body.id,
        },
    })
    res.end()
}
