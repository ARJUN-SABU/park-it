//styles
import "../styles/LoginPage.css";

function LoginPage() {
  return (
    <div className="loginPage">
      <div className="loginPage__inputBox">
        <p>Login to your account.</p>
        <input type="text" placeholder="email"></input>
        <input type="password" placeholder="password"></input>
        <button>Sign In</button>
      </div>
      <div className="loginPage__inputBox">
        <p>Don't have an account?</p>
        <input type="text" placeholder="email"></input>
        <input type="password" placeholder="password"></input>
        <button>Sign Up</button>
      </div>
    </div>
  );
}

export default LoginPage;
