/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gold: {
          50: 'oklch(0.98 0.02 85)',
          100: 'oklch(0.95 0.04 82)',
          200: 'oklch(0.90 0.07 80)',
          300: 'oklch(0.84 0.10 78)',
          400: 'oklch(0.78 0.12 76)',
          500: 'oklch(0.72 0.12 75)',
          600: 'oklch(0.64 0.11 73)',
          700: 'oklch(0.54 0.09 70)',
          800: 'oklch(0.42 0.07 68)',
          900: 'oklch(0.30 0.05 65)',
        },
        cream: {
          50: 'oklch(0.99 0.005 85)',
          100: 'oklch(0.97 0.01 82)',
          200: 'oklch(0.94 0.02 80)',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "14px",
        "2xl": "18px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        'luxury': '0 4px 24px oklch(0.72 0.12 75 / 0.15)',
        'luxury-lg': '0 8px 48px oklch(0.72 0.12 75 / 0.20)',
        'luxury-xl': '0 16px 64px oklch(0.72 0.12 75 / 0.25)',
        'gold': '0 4px 20px oklch(0.72 0.12 75 / 0.4)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "ping-slow": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.5)", opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ping-slow": "ping-slow 2s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}
