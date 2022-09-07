import prisma from "lib/prisma"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
    const { name } = req.body

    if (req.method !== "POST") {
        return res.status(501).end()
    }

    const session = await getSession({ req })
    if (!session) return res.status(401).json({ message: "not logged in" })
    const { id } = session.user

    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    })
    if (!user) return res.status(401).json({ message: "user not found" })

    await prisma.project.create({
        data: {
            name: name,
            owner: {
                connect: { id: user.id },
            },
        },
    })

    res.end()
}
