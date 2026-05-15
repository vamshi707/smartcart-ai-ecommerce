/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        background: "#f5f5f5",
        foreground: "#111111",
        card: "#ffffff",
        border: "#e5e7eb",

        primary: "#7c3aed",
        "primary-foreground": "#ffffff",

        accent: "#facc15",
        "accent-foreground": "#111111",

        secondary: "#f3f4f6",

        success: "#22c55e",
        "success-foreground": "#ffffff",
      },

      backgroundImage: {
        "gradient-brand":
          "linear-gradient(to right, #7c3aed, #ec4899)",

        "gradient-lime":
          "linear-gradient(to right, #84cc16, #22c55e)",

        "gradient-berry":
          "linear-gradient(to right, #ec4899, #ef4444)",

        "gradient-mint":
          "linear-gradient(to right, #06b6d4, #3b82f6)",

        "gradient-sun":
          "linear-gradient(to right, #f59e0b, #f97316)",
      },

      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.08)",
        pop: "0 10px 30px rgba(0,0,0,0.15)",
        soft: "0 2px 10px rgba(0,0,0,0.08)",
      },

      animation: {
        marquee: "marquee 20s linear infinite",
        float: "float 3s ease-in-out infinite",
      },

      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },

        float: {
          "0%,100%": {
            transform: "translateY(0px)",
          },

          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
    },
  },

  plugins: [],
}