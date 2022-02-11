module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      accentOne: "#141F31",
      accentTwo: "#D5EBF5",

      buttonDanger: "#FF3300",
      buttonSuccess: "#4ade80",
      buttonOther: "#141F31",
      // buttonWarning: "",
      // buttonSuccess: "",

      lightBgOne: "#ffffff",
      lightBgTwo: "#EBEBEB",
      darkBgOne: "#424242",
      darkBgTwo: "#121212",

      lightFgOne: "#000000",
      lightFgTwo: "",
      darkFgOne: "#f5f5f5",
      darkFgTwo: "#616161",

      lightHover: "#FDF2D4",
      darkHover: "#757575",
    },
    extend: {},
  },
  plugins: [],
};
