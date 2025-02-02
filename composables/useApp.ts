export const useApp = () => {
  const getAppList = (isMobile: boolean) => {
    const files = import.meta.glob("@/public/images/dock/*", { eager: true });
    let components: Record<string, any> = {};
    if (isMobile) {
      components = import.meta.glob(
        `@/components/Mobile/WindowList/WindowItems/*`,
        { eager: true }
      );
    } else {
      components = import.meta.glob(
        `@/components/Desktop/WindowList/WindowItems/*`,
        { eager: true }
      );
    }

    return Object.keys(files)
      .filter((key) => {
        const name = key.split("/").pop()?.split(".")[0];
        return Object.keys(components).some((comp) => {
          const compName = comp.split("/").pop()?.split(".")[0];
          return compName === name;
        });
      })
      .map((key) => {
        const name = key.split("/").pop()?.split(".")[0];
        if (!name) {
          console.error("파일 이름을 찾을 수 없습니다.", key);
          return {
            name: "",
            src: "",
          };
        }

        return {
          name,
          src: key.replace("/public", ""),
        };
      });
  };

  return {
    getAppList,
  };
};
