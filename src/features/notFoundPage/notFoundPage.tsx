import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
  <main style={{ padding: "1rem" }}>
    <p>There's nothing here!</p>
    <div>Back to <Link to="/">Login</Link></div>
  </main>)
}

export default NotFoundPage;