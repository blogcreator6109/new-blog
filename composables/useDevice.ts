export function useDevice() {
  const isMobile = ref(false);

  onMounted(() => {
    const ua = navigator.userAgent.toLowerCase();
    const mobileDevices = /(ipad|iphone|android|ipod|blackberry)/;
    const isTouch = "ontouchstart" in window;

    isMobile.value = mobileDevices.test(ua) && isTouch;
  });

  return {
    isMobile,
    isDesktop: computed(() => !isMobile.value),
  };
}
