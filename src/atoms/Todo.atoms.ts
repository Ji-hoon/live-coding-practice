import { atom } from "recoil";
import { todoType } from "../components/pages/Todos";

export const pageState = atom({
  key: "pageState",
  default: 0,
});
export const todoState = atom<todoType[]>({
  key: "todoState",
  default: [],
});
