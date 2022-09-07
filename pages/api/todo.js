import prisma from "lib/prisma"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
    const { name, project_id, id } = req.body

    if (req.method !== "POST" && req.method !== "DELETE") {
        return res.status(501).end()
    }

    const session = await getSession({ req })
    if (!session) return res.status(401).json({ message: "not logged in" })

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    })

    if (!user) return res.status(401).json({ message: "user not found" })

    if (req.method === "POST") {
        await prisma.todo.create({
            data: {
                name: name,
                project: {
                    connect: { id: project_id },
                },
            },
        })
    }

    if (req.method === "DELETE") {
        await prisma.todo.deleteMany({
            where: {
                id: id,
                project: {
                    owner: {
                        id: user.id,
                    },
                },
            },
        })
    }
    res.end()
}
