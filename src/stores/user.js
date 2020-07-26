import { writable } from "svelte/store";

let userValue = null;
if (typeof window !== "undefined") {
  userValue = sessionStorage.getItem("token");
  if (userValue) {
    userValue = JSON.parse(userValue);
  }
}

export const user = writable(userValue);

user.subscribe((val) => {
  if (typeof window !== "undefined") {
    if (val) {
      sessionStorage.setItem("token", JSON.stringify(val));
    } else {
      sessionStorage.removeItem("token");
    }
  }
});
