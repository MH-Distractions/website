import { user } from "../stores/user";

export default async (fetch, query, variables = null) => {
  const body = {
    query,
  };
  if (variables) {
    body.variables = variables;
  }

  let token;
  user.subscribe((val) => (token = val));

  const response = await fetch("graphql", {
    method: "post",
    headers: { "content-type": "application/json", authorization: token || "" },
    body: JSON.stringify(body),
  });
  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
};
