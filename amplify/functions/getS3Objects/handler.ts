import type { Schema } from "../../data/resource"
export const handler: Schema["getS3Objects"]["functionHandler"] = async (event) => {

    return [
        {
            key: "a/b/c/d/e/f.csv",
            lastModified: '2025-08-05'
        },
        {
            key: "a/b/c/d/e/g.csv",
            lastModified: '2025-08-05'
        },
        {
            key: "a/b/c/d/e/h.csv",
            lastModified: '2025-08-05'
        },
        {
            key: "a/b/c/d/e/i.csv",
            lastModified: '2025-08-05'
        },
        {
            key: "a/b/c/d/e/o.csv",
            lastModified: '2025-08-05'
        }
    ]
}