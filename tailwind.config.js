/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        typography: (theme) => ({}),
        extend: {
            colors: {
                primary: '#EA8143',
                grey: '#F2F2F2',
                primaryHover: '#ea580c'
            }
        },
    },
    plugins: [require('@tailwindcss/line-clamp')]
}