export default defineNuxtPlugin(() => {
  const colorMode = useColorMode();
  return {
    provide: {
      toggleTheme: () => {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
      },
    },
  };
});
