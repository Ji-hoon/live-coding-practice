import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const baseURL = "https://dummyjson.com/users/add";

type userType = {
  id: number;
  email: string;
  password: string;
};

type FormValues = Omit<userType, "id">;

export default function SignUp() {
  const [id, setId] = useState(101);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [users, setUsets] = useState<userType[]>([]);
  const { register, handleSubmit, setValue } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    if (data.email === "" || data.password === "") {
      alert("모든 필드를 입력해주세요.");
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
        setUsets([...users, res.data]);
        setValue("email", "", {
          shouldDirty: true,
        });
        setValue("password", "", {
          shouldDirty: true,
        });
        // setEmail("");
        // setPassword("");
        setId(id + 1);
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
          users.reverse().map((user: userType, index) => {
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
    </>
  );
}
