import useAuth from "../hooks/useAuth";

function LoginPage() {
  const { user, token } = useAuth();

  return (
    <div>
      <h1>Login Page</h1>
      <ul>
        <li>User: {user ? user : "None"}</li>
        <li>Token: {token ? token : "None"}</li>
      </ul>
    </div>
  );
}
export default LoginPage;
