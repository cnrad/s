module.exports = {
    mode: "jit",
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            karla: ["Karla", "sans-serif"],
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
