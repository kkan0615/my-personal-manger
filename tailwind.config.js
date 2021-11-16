module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'bs-primary': '#0d6efd', // bootstrap 5 default coors
        'bs-secondary': '#6c757d', // bootstrap 5 default coors
        'bs-success': '#198754', // bootstrap 5 default coors
        'bs-info': '#0dcaf0', // bootstrap 5 default coors
        'bs-warning': '#ffc107', // bootstrap 5 default coors
        'bs-danger': '#dc3545', // bootstrap 5 default coors
        'bs-light': '#f8f9fa', // bootstrap 5 default coors
        'bs-dark': '#212529', // bootstrap 5 default coors
        'general-sidebar': {
          light: '#1c2742',
          DEFAULT: '#1c2742',
          dark: '#1c2742',
        }, // general layout sidebar colors
      },
      fontSize: {
        cxs: ['0.5rem', '1rem']
      },
      width: {
        '62': '15.5rem'
      },
      height: {
        '18': '4.5rem'
      }
    },
  },
  variants: {
    extend: {},
    width: ['responsive', 'hover', 'focus'],
  },
  // plugins: [
  //   require('@tailwindcss/typography'),
  // ],
  prefix: 'tw-',
}
