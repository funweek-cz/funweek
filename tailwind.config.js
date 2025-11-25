module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                funweek: "var(--funweek)",
            },
            fonts: {
                primary: "Inter, sans-serif",
                gabarito: "var(--font-gabarito)",
            }
        },
    },
    plugins: [],
}