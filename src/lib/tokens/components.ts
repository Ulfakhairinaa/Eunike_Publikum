export const components = {
  // Button sizing & styling
  button: {
    sizes: {
      sm: {
        padding: '6px 12px',
        fontSize: '12px',
        height: '32px',
      },
      md: {
        padding: '8px 16px',
        fontSize: '14px',
        height: '40px',
      },
      lg: {
        padding: '12px 24px',
        fontSize: '16px',
        height: '48px',
      },
    },
    borderRadius: '8px',
  },

  // Input field sizing
  input: {
    height: '40px',
    padding: '8px 16px',
    fontSize: '14px',
    borderRadius: '8px',
    borderWidth: '1px',
  },

  // Card styling
  card: {
    borderRadius: '12px',
    padding: '24px',
    shadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.05)',
  },

  // Modal/Dialog sizing
  modal: {
    borderRadius: '16px',
    maxWidth: '512px',
    padding: '24px',
  },

  // Navbar sizing
  navbar: {
    height: '64px',
    padding: '16px 24px',
  },

  // Avatar sizing
  avatar: {
    sizes: {
      sm: '32px',
      md: '40px',
      lg: '56px',
    },
    borderRadius: '50%',
  },
}

// Border radius scale
export const borderRadius = {
  none: '0px',
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  full: '9999px',
}

// Shadows
export const shadows = {
  none: 'none',
  sm: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
  base: '0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
  md: '0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0px 4px 15px 0px rgba(0, 0, 0, 0.05)',
}
