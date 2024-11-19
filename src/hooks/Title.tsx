import { useEffect } from "react";

const useTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ?? "minigram";

    return () => {
      document.title = "Minigram";
    };
  }, [title]);
};

export default useTitle;
