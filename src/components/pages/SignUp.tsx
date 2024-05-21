import { useState } from "react";

const baseURL = "https://dummyjson.com/users/add";

type userType = {
  id: number;
  email: string;
  password: string;
};
export default function SignUp() {
  const [id, setId] = useState(101);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsets] = useState<userType[]>([]);

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // console.log({ email, password });
    fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setUsets([...users, json]);
        setEmail("");
        setPassword("");
        setId(id + 1);
      })
      .catch((error) => alert(error));
  }

  // console.log(users);

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          placeholder="type email..."
          type="text"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <input
          type="password"
          placeholder="type password..."
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
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
