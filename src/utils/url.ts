import pkg from "../../package.json"

const createUrl = (path: string): string => {
    const base =
        process.env.NODE_ENV !== "production"
            ? "http://localhost:3000"
            : pkg.homepage

    const url = `${base}${path}`
    return url
}

export {createUrl}
