export default defineNuxtRouteMiddleware((to, from) => {
  const userAgent = import.meta.env.SSR
    ? useRequestHeaders()["user-agent"]
    : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  useState("isMobile", () => isMobile);
});
