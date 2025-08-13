import type { Schema } from "../../data/resource"
export const handler: Schema["sayHello"]["functionHandler"] = async (event) => {
    const { name, userId } = event.arguments
    return `Hello, ${userId}!`
}