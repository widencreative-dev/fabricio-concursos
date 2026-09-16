// Configuracao do Tailwind (via CDN) compartilhada por todas as paginas do
// site. Carregue depois do script https://cdn.tailwindcss.com.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#1A0448",
          navyDark: "#0B0123",
          purple: "#5B14A8",
          purpleDark: "#3D0F80",
          magenta: "#8B1FE0",
          lavender: "#C77DFF",
          rose: "#E11D48",
        },
        ink: {
          900: "#0F1024",
          700: "#2B2A45",
          500: "#5B5A78",
          300: "#9998B3",
          100: "#EDEDF5",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Lexend", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(120deg, #0B0123 0%, #3D0F80 45%, #8B1FE0 100%)",
        "gradient-cta": "linear-gradient(90deg, #5B14A8 0%, #8B1FE0 55%, #C77DFF 100%)",
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(15, 16, 36, 0.12)",
        cardHover: "0 12px 32px -6px rgba(91, 20, 168, 0.25)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
};
