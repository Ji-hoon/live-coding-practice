import axios from "axios";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { UserStateType } from "../../store/index";
import { userActions } from "../../store/index";
import { createPortal } from "react-dom";
import { useState } from "react";

const baseURL = "https://dummyjson.com/users/add";

export type userType = {
  id: number;
  email: string;
  password: string;
};

type FormValues = Omit<userType, "id">;

export default function SignUp() {
  const { id, users } = useSelector(
    (state: { user: UserStateType }) => state.user
  );
  const dispatch = useDispatch();

  // const [id, setId] = useState(101);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const [users, setUsers] = useState<userType[]>([]);
  console.log(id, users);
  const [error, setError] = useState("");
  const { register, handleSubmit, setValue } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    if (data.email === "" || data.password === "") {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    // console.log({ email, password });
    axios
      .post(baseURL, {
        // method: "POST",
        // headers: { "Content-Type": "application/json" },
        //body: {
        id,
        email: data.email,
        password: data.password,
        //},
      })
      .then((res) => {
        console.log(res.data);
        //setUsers([...users, res.data]);
        setValue("email", "", {
          shouldDirty: true,
        });
        setValue("password", "", {
          shouldDirty: true,
        });

        dispatch(userActions.incrementId());
        dispatch(userActions.setUsers(res.data));

        // setEmail("");
        // setPassword("");
        //setId(id + 1);
      })
      .catch((error) => alert(error));
  }

  // console.log(users);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="type email..." type="text" />
        <input
          {...register("password")}
          type="password"
          placeholder="type password..."
        />
        <button>회원가입</button>
      </form>
      <h3>Users</h3>
      <ul>
        {users.length > 0 ? (
          users.map((user: userType, index) => {
            return (
              <li key={index}>
                {user.id} | {user.email} | {user.password}
              </li>
            );
          })
        ) : (
          <li>no users</li>
        )}
      </ul>
      {error &&
        createPortal(
          <div
            style={{
              position: "absolute",
              left: "0px",
              right: "0px",
              bottom: "0px",
              top: "0px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.8)",
            }}
          >
            <p>{error}</p>
            <button onClick={() => setError("")}>닫기</button>
          </div>,
          document.getElementById("dialog") || document.body
        )}
    </>
  );
}
