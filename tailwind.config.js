module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      color: {
        'bs-primary': '#0d6efd', // bootstrap 5 default coors
        'bs-secondary': '#6c757d', // bootstrap 5 default coors
        'bs-success': '#198754', // bootstrap 5 default coors
        'bs-info': '#0dcaf0', // bootstrap 5 default coors
        'bs-warning': '#ffc107', // bootstrap 5 default coors
        'bs-danger': '#dc3545', // bootstrap 5 default coors
        'bs-light': '#f8f9fa', // bootstrap 5 default coors
        'bs-dark': '#212529', // bootstrap 5 default coors
      },
      fontSize: {
        '4xs': ['0.5rem', '1rem'],
        '2xs': ['0.65rem', '1rem']
      }
    },
  },
  variants: {
    extend: {},
  },
  // plugins: [
  //   require('@tailwindcss/typography'),
  // ],
  prefix: 'tw-',
}
