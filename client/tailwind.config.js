const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      Inter: ['Inter', ...defaultTheme.fontFamily.sans]
    },
    fontSize: {
      ...defaultTheme.fontSize,
      '2xs': ['10px', '12px']
    },
    extend: {
      colors: {
        ...colors,
        background: {
          DEFAULT: '#FFFFFF',
          inactive: '#F6F6F6',
          primary: '#C489FF',
          primaryStrong: '#A54AFF',
          secondary: '#E9E9E7'
        },
        text: {
          primary: '#C489FF',
          white: '#FFFFFF',
          active: '#37352F',
          inactive: '#7D7C78',
          status: {
            1: '#FFFFFF',
            2: '#5599FF',
            3: '#FFC107'
          }
        },
        buyerIntent: {
          hot: '#E34A3E',
          strong: '#FF8C42',
          warm: '#FFC107',
          cold: '#5599FF',
          DEFAULT: '#F6F6F6' // gray
        },
        prospectStatus: {
          1: '#7D7C78',
          2: '#CEDFF9',
          3: '#F6EAC3'
        },
        lines: '#E9E9E7',

        // page themes
        prospect: {
          DEFAULT: '#A54AFF',
          1: '#C489FF'
        },
        nurture: {
          DEFAULT: '#0087F0',
          1: '#A8C3F8'
        },
        deals: {
          DEFAULT: '#47AC3A',
          1: '#D1EACE'
        },

        // deals themes
        blue: {
          DEFAULT: '#A3C4F3B2',
          light: '#AAC9F526',
          strong: '#0087F0'
        },
        green: {
          DEFAULT: '#B7D5B1B2',
          light: '#BDD9B926'
        },
        orange: {
          DEFAULT: '#FAD2A5B2',
          light: '#FAD6AE26'
        },
        purple: {
          DEFAULT: '#D4B5D8B2',
          light: '#D7BCDC26'
        },
        red: {
          DEFAULT: '#E34A3EB2',
          light: '#F8CEC526',
          strong: '#E34A3E'
        }
      }
    }
  }
}
