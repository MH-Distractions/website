import { writable } from "svelte/store";

let userValue = null;
if (typeof window !== "undefined") {
  userValue = sessionStorage.getItem("token");
  if (userValue) {
    let token = JSON.parse(atob(userValue.split(".")[1]));
    if (token.exp < Date.now() / 1000) {
      userValue = null;
    } else {
      userValue = {
        token: userValue,
        user: { id: token.sub, role: token.role },
      };
    }
  }
}

export const user = writable(userValue);

user.subscribe((val) => {
  if (typeof window !== "undefined") {
    if (val) {
      sessionStorage.setItem("token", val.token);
    } else {
      sessionStorage.removeItem("token");
    }
  }
});
