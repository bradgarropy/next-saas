const config = {
    content: ["src/pages/**/*.tsx", "src/components/**/*.tsx"],
    theme: {
        extend: {
            gridTemplateRows: {
                layout: "auto 1fr auto",
            },
            gridTemplateColumns: {
                form: "auto 1fr",
                todo: "auto 1fr auto",
            },
        },
    },
    plugins: [],
}

module.exports = config
