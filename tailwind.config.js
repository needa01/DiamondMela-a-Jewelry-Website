/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                'droid': ['Droid Serif', 'serif'],
            },
            textColor:{
                'custom-grey': 'rgb(#929292)',
            },
        },
    },
    plugins: [],
}