import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  GlobalSignOutCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { jwtDecode } from "jwt-decode";

const client = new CognitoIdentityProviderClient({
  region: import.meta.env.VITE_COGNITO_REGION,
});
const USER_POOL_ID = import.meta.env.VITE_COGNITO_USERPOOL_ID;
const CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;

export const login = async (email, password) => {
  try {
    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const response = await client.send(command);

    const idToken = response.AuthenticationResult.IdToken;
    const accessToken = response.AuthenticationResult.AccessToken;
    const refreshToken = response.AuthenticationResult.RefreshToken;

    const decoded = jwtDecode(idToken);
    const groups = decoded["cognito:groups"] || [];
    const role = groups.includes("admin")
      ? "admin"
      : groups.length > 0
      ? groups[0]
      : "employee";

    localStorage.setItem("idToken", idToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", role);

    return { email, idToken, accessToken, refreshToken, role };
  } catch (err) {
    console.error("Cognito login error:", err);
    throw err;
  }
};

export const logout = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      await client.send(new GlobalSignOutCommand({ AccessToken: accessToken }));
    } catch (err) {
       if (err.name === "NotAuthorizedException") {
        console.log("Access token already expired, ignoring.");
      } else {
      console.warn("Cognito logout failed", err);
      }
    }
  }
  localStorage.clear();
};
