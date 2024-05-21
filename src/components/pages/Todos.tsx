import { useLayoutEffect, useMemo, useState } from "react";
import { useIntersectionObserver } from "../../useIntersectionObserver";
import Todo from "../atoms/Todo";

const baseURL = (cursor: number, limit: number) => {
  return `https://dummyjson.com/todos?skip=${cursor}&limit=${limit}`;
};

const LIMIT = 30;
const MAX_COUNT = 150;

export type todoType = {
  todo: string;
  id: number;
  completed: boolean;
};

export default function Todos() {
  const [page, setPage] = useState(0);
  const [todos, setTodos] = useState<todoType[]>([]);
  const { targetRef } = useIntersectionObserver({
    todos: todos,
    onIntersect: getNextPage,
  });

  console.log(page);

  function getNextPage() {
    if (page < MAX_COUNT) {
      setPage(page + LIMIT);
    }
    if (page >= MAX_COUNT) setPage(MAX_COUNT);
  }

  const prevTodos = useMemo(() => {
    return [...todos];
  }, [page]);

  useLayoutEffect(() => {
    fetch(baseURL(page, LIMIT), {})
      .then((res) => res.json())
      .then((json) => {
        const todos = [...prevTodos, ...json.todos];
        setTodos(todos);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, [page]);

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        {todos &&
          todos.map((todo, index) => {
            return <Todo todo={todo} key={index} />;
          })}
      </div>
      {page !== MAX_COUNT && (
        <button ref={targetRef} onClick={() => getNextPage()}>
          more page
        </button>
      )}
    </>
  );
}
