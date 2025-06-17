/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/***/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bluegradient: 'linear-gradient(94.31deg, #30589F -24.04%, #002140 19.9%, #002140 78.48%, #30589F 122.42%)',
      },
      boxShadow: {
        btn: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
         ip: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
         shadowcard : 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
         rad : '10px 10px 0px -5px rgba(0,0,0,0.75);',
         cards : '9px 9px 5px -6px rgba(0,20,38,1);',
         lightshad : '3px 3px 0px 0px #001426',
         'right-bottom': '2px 2px 0 0',
      },
      rotate: {
        '270': '270deg',
      },
    },
    colors: {
      black :  '#000000',
      lightblack : '#111111',
      white : "#ffffff",
      blue : '#0F1A2C'
    },
    fontFamily: {
      // pop: ['poppins', 'sans-serif'],
      urban: ['Urbanist', 'sans-serif'],
      dela: ['Dela Gothic One', 'sans-serif'],
      pop: [ "Poppins", 'sans-serif'],
      lato: ['Lato', 'sans-serif'], 
    },
    
  },
  plugins: [ require('@tailwindcss/forms')],
  
}


