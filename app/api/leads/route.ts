export async function GET() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzi7nW4R2bv_0_u2K8gVK4w8L-46_nrqtJxXLfQJuFWzdAaopSgya49KEFNApnZPj72Zg/exec",
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    return Response.json(data);
  } catch {
    return Response.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzi7nW4R2bv_0_u2K8gVK4w8L-46_nrqtJxXLfQJuFWzdAaopSgya49KEFNApnZPj72Zg/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return Response.json(data);
  } catch {
    return Response.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}