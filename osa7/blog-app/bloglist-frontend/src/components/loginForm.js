import PropTypes from 'prop-types';

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        {/* target = event.target */}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;

/*
handleLogin ja onChange näyttäisi tältä ilman nuolifunktiota

function handleLogin(event) {
  event.preventDefault();
  const target = event.target;
  const usernameValue = target.elements.Username.value;
  const passwordValue = target.elements.Password.value;

  setUsername(usernameValue);
  setPassword(passwordValue);

  console.log('logging in with', usernameValue, passwordValue);
}
*/
