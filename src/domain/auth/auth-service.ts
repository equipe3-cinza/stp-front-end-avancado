import {User} from "./auth.ts";

export interface AuthService {
  // eslint-disable-next-line no-unused-vars
  authorize(login: string, password: string): Promise<User>;
}

export function createClientOnlyAuthService (): AuthService {
  return {
    async authorize (login: string, password: string) {
      if (login === "doctor-a" && password === "password") {
        return {
          kind: "User",
          personId: "doctor-a",
          hospitalId: "hospital-a",
          accessToken: "my-token"
        };
      }

      return {
        kind: "Guest"
      };
    }
  };
}

export function createAuthService (url: string = "/api/auth"): AuthService {
  // TODO Replace with auto-generated code
  return {
    async authorize (login: string, password: string) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          login,
          password
        })
      });

      // TODO not the best way to check for unauthorized
      if (response.status !== 200) {
        return {
          kind: "Guest"
        };
      }

      const data = await response.json();

      return {
        ...data,
        kind: "User"
      };
    }
  };
}
