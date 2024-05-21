import { useEffect, useRef } from "react";
import { todoType } from "./components/pages/Todos";

export function useIntersectionObserver({
  todos,
  onIntersect,
}: {
  todos: todoType[];
  onIntersect: () => void;
}) {
  const targetRef = useRef(null);
  //   console.log(targetRef.current);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("요소가 화면에 보임");
          // 이 때 fetchNextPage를 호출
          onIntersect();
        } else {
          console.log("요소가 화면에서 사라짐");
        }
      });
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        console.log("unmount");
        observer.unobserve(targetRef?.current);
      }
    };
  }, [todos]);

  return { targetRef };
}
