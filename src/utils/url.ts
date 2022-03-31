import pkg from "../../package.json"

const createUrl = (path: string): string => {
    console.log(process.env.NODE_ENV)

    const base =
        process.env.NODE_ENV !== "production"
            ? "http://localhost:3000"
            : pkg.homepage

    console.log(base)
    const url = `${base}${path}`
    console.log(url)

    return url
}

export {createUrl}
