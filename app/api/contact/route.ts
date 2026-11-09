import { contact } from "@/data/contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");

  if (origin && origin !== new URL(request.url).origin) {
    return Response.json(
      { error: "This request is not allowed." },
      { status: 403 },
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return Response.json(
      { error: "The submitted form could not be read." },
      { status: 400 },
    );
  }

  const limits = {
    name: 100,
    email: 254,
    company: 150,
    project: 150,
    budget: 100,
    timeline: 150,
    message: 5000,
    website: 200,
  };

  const fields: Record<string, string> = {};

  for (const [key, limit] of Object.entries(limits)) {
    const value = formData.get(key);

    if (value !== null && typeof value !== "string") {
      return Response.json(
        { error: "Invalid form data." },
        { status: 400 },
      );
    }

    const text = (value ?? "").trim();

    if (text.length > limit) {
      return Response.json(
        { error: "One of the fields is too long." },
        { status: 400 },
      );
    }

    fields[key] = text;
  }

  const {
    name,
    email,
    company,
    project,
    budget,
    timeline,
    message,
    website,
  } = fields;

  if (website) {
    return Response.json(
      { error: "Your inquiry could not be submitted." },
      { status: 400 },
    );
  }

  if (
    !name ||
    !project ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.length < 10
  ) {
    return Response.json(
      { error: "Please complete all required fields with valid information." },
      { status: 400 },
    );
  }

  if (budget && !contact.budgets.includes(budget)) {
    return Response.json(
      { error: "Please select a valid budget range." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return Response.json(
      {
        error:
          "The contact form is temporarily unavailable. Please email me directly.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [contact.email],
        reply_to: email,
        subject: `Portfolio inquiry: ${project.replace(/[\r\n]/g, " ")}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company / organization: ${company || "Not provided"}`,
          `Project / inquiry: ${project}`,
          `Budget: ${budget || "Not provided"}`,
          `Ideal timeline: ${timeline || "Not provided"}`,
          "",
          "Project details:",
          message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error("Contact email service returned:", response.status);

      return Response.json(
        {
          error:
            "Your inquiry could not be sent. Please try again or email me directly.",
        },
        { status: 502 },
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      {
        error:
          "The email service could not be reached. Please try again or email me directly.",
      },
      { status: 502 },
    );
  }
}