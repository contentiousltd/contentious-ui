import type { Config } from "tailwindcss";

/**
 * Generates a 17-shade colour scale (100–900 at 50-step intervals)
 * from CSS custom properties. All 11 Contentious brand colours
 * use this same structure.
 */
const fullScale = (name: string) =>
  Object.fromEntries(
    [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900].map(
      (shade) => [shade, `hsl(var(--${name}-${shade}))`],
    ),
  );

export const contentiousPreset: Config = {
  content: [],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
    extend: {
      screens: {
        xs: "475px",
        "sm-early": "720px",
      },
      colors: {
        /* Semantic tokens (shadcn/ui) */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        /* Contentious brand palette — all 11 colours, 17 shades each */
        limestone: fullScale("limestone"),
        gloaming: fullScale("gloaming"),
        fire: fullScale("fire"),
        sunshine: fullScale("sunshine"),
        wave: fullScale("wave"),
        sapling: fullScale("sapling"),
        amber: fullScale("amber"),
        olive: fullScale("olive"),
        sorbet: fullScale("sorbet"),
        coffee: fullScale("coffee"),
        lichen: fullScale("lichen"),

        /* Star rating tokens */
        star: {
          "1": "hsl(var(--fire-500))",
          "2": "hsl(var(--amber-500))",
          "3": "hsl(var(--sunshine-500))",
          "4": "hsl(var(--olive-500))",
          "5": "hsl(var(--sapling-500))",
        },
      },
      borderRadius: {
        sm: "var(--radius)",
        md: "calc(var(--radius) + 2px)",
        lg: "calc(var(--radius) + 4px)",
      },
      fontSize: {
        base: ["1.1rem", { lineHeight: "1.6" }],
      },
      fontFamily: {
        display: ["bely-display", "serif"],
        mono: ["Courier New", "Courier", "monospace"],
        hand: ["Caveat", "cursive"],
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};

export default contentiousPreset;
