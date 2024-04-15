import axios from "axios";

const MY_KEY = "AIzaSyACpjUtJkZ3ISj8Kcbm6N5fN69yXEOpncw";
const SIGN_UP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${MY_KEY}`;
const SIGN_IN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${MY_KEY}`;

async function authenticate(isSignIn, email, password) {
  const url = isSignIn ? SIGN_IN : SIGN_UP;
  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;

  return token;
}

export function createUser(email, password) {
  return authenticate(false, email, password);
}

export function logIn(email, password) {
  return authenticate(true, email, password);
}
