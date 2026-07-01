import type { Config } from 'tailwindcss'
import { colors } from './src/lib/tokens/colors'
import { spacing } from './src/lib/tokens/spacing'
import { typography } from './src/lib/tokens/typography'
import { borderRadius, shadows } from './src/lib/tokens/components'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.gray,
        success: colors.success,
        warning: colors.warning,
        danger: colors.danger,
        info: colors.info,
      },
      spacing,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,
      borderRadius,
      boxShadow: shadows,
      fontFamily: {
        sans: typography.fontFamily.sans,
        mono: typography.fontFamily.mono,
      },
    },
  },
  plugins: [],
}

export default config
