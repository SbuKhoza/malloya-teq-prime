import { useEffect, useState } from "react";
import { defaultContent, subscribeContent, type ContentDoc } from "./content-service";

export function useContent(): ContentDoc {
  const [content, setContent] = useState<ContentDoc>(defaultContent);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const unsub = subscribeContent(setContent);
    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, []);

  return content;
}
