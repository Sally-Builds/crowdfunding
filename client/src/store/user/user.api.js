import axios from "axios";

// export async function fetchProject() {
//   try {
//     const res = await axios.get("http://localhost:9000/projects");
//     console.log(res.data);
//     return res.data;
//   } catch (error) {
//     return [];
//   }
// }

const register = async (data) => {
  const response = await axios.post(
    "http://localhost:4000/api/users/register",
    data
  );
  console.log(response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
};

// export async function Login(data) {
//   try {
//     console.log(data);
//     console.log("from api");
//     const res = await axios({
//       method: "POST",
//       url: "http://localhost:4000/api/users/login",
//       data,
//     });
//     console.log(res);
//   } catch (error) {
//     console.log(error.response);
//   }
// }

const userService = {
  register,
};

export default userService;
