import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:3001/users/signin", async ({ request }) => {
    // Read the request body as JSON.
    const user = await request.json();
    const { email } = user;
    return HttpResponse.json({ email, token: "mocked_user_token" });
  }),
  http.post("http://localhost:3001/users/signup", async ({ request }) => {
    // Read the request body as JSON.
    const user = await request.json();
    const { email } = user;
    return HttpResponse.json({ email, token: "mocked_user_token" });
  }),
];
