import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost:3001/users/signin", async ({ request }) => {
    // Read the request body as JSON.
    const user = await request.json();
    const { email } = user;
    return HttpResponse.json({ email, token: "mocked_user_token_signin" });
  }),
  http.post("http://localhost:3001/users/signup", async ({ request }) => {
    // Read the request body as JSON.
    const user = await request.json();
    const { email } = user;
    return HttpResponse.json({ email, token: "mocked_user_token_signup" });
  }),
  http.get(
    "http://localhost:3001/tasks/:userEmail",
    async ({ request, params }) => {
      // Read the request body as JSON.
      const { userEmail } = params;
      console.log(userEmail);
      request.url.searchParams.get("userEmail");
      return HttpResponse.json([
        {
          user_email: "alex@test.com",
          title: "Learn Next.js",
          progress: 50,
          date: "2021-09-01",
        },
        {
          user_email: "alex@test.com",
          title: "Learn Nest.js",
          progress: 40,
          date: "2021-09-02",
        },
        {
          user_email: "alex@test.com",
          title: "Learn Nuxt.js",
          progress: 30,
          date: "2021-09-03",
        },
      ]);
    }
  ),
  http.delete("http://localhost:3001/tasks/:id", async ({ params }) => {
    // Read the request body as JSON.
    const { id } = params;
    console.log("id", id);
    return HttpResponse.json({
      user_email: "alex@test.com",
      title: "Learn Next.js",
      progress: 50,
      date: "2021-09-01",
    });
  }),
  http.post("http://localhost:3001/tasks", async ({ request }) => {
    // Read the request body as JSON.
    const task = await request.json();
    // return HttpResponse.json(task);
    return new HttpResponse(JSON.stringify(task), { status: 201 });
  }),
  http.patch("http://localhost:3001/tasks/:id", async ({ request, params }) => {
    // Read the request body as JSON.
    const { id } = params;
    console.log("id", id);
    const task = await request.json();
    return new HttpResponse(JSON.stringify(task), { status: 200 });
  }),
];
