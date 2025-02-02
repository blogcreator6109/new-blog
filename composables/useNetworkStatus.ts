export const useNetworkStatus = () => {
  const strength = ref(0);
  const type = ref<"4g" | "3g" | "2g" | "slow-2g" | null>(null);
  const latency = ref(0);

  const measureLatency = async () => {
    const start = performance.now();
    try {
      await fetch("/api/ping", { method: "HEAD" });
      latency.value = performance.now() - start;
    } catch (error) {
      console.warn("Latency measurement failed:", error);
    }
  };

  const updateNetworkStatus = async () => {
    try {
      if (navigator.connection) {
        type.value = navigator.connection.effectiveType as any;

        // RTT 기반 신호 강도 계산
        const rtt = navigator.connection.rtt;
        if (type.value === "4g" && rtt < 100) strength.value = 4;
        else if (type.value === "4g" || rtt < 200) strength.value = 3;
        else if (type.value === "3g" || rtt < 500) strength.value = 2;
        else if (navigator.onLine) strength.value = 1;
        else strength.value = 0;
      } else {
        await measureLatency();
        // 레이턴시 기반 신호 강도 계산
        if (latency.value < 100) strength.value = 4;
        else if (latency.value < 200) strength.value = 3;
        else if (latency.value < 500) strength.value = 2;
        else strength.value = 1;
      }
    } catch (error) {
      console.warn("Network status update failed:", error);
      strength.value = navigator.onLine ? 2 : 0;
    }
  };

  onMounted(() => {
    updateNetworkStatus();
    navigator.connection?.addEventListener("change", updateNetworkStatus);
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);
  });

  onUnmounted(() => {
    navigator.connection?.removeEventListener("change", updateNetworkStatus);
    window.removeEventListener("online", updateNetworkStatus);
    window.removeEventListener("offline", updateNetworkStatus);
  });

  return {
    strength,
    type,
    latency,
  };
};
