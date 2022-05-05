import axios from "axios";

export default async function fetchProject() {
  try {
    const res = await axios.get("http://localhost:9000/projects");
    console.log(res.data);
    return res.data;
  } catch (error) {
    return [];
  }
}
