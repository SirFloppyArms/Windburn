const REQUIRED_FIELDS = ["name", "email", "message"];

function getCorsOrigin() {
  return process.env.ALLOWED_ORIGIN || "*";
}

function makeResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": getCorsOrigin(),
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type"
    },
    body: JSON.stringify(payload)
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return makeResponse(204, {});
  }

  if (event.httpMethod !== "POST") {
    return makeResponse(405, { error: "Method not allowed" });
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return makeResponse(400, { error: "Invalid JSON payload" });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !String(data[field] || "").trim());
  if (missing.length) {
    return makeResponse(400, { error: `Missing fields: ${missing.join(", ")}` });
  }

  const forwardUrl = process.env.CONTACT_FORWARD_URL;
  if (!forwardUrl) {
    return makeResponse(503, {
      error: "CONTACT_FORWARD_URL is not configured"
    });
  }

  try {
    const upstream = await fetch(forwardUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        source: "windburn-site",
        receivedAt: new Date().toISOString(),
        payload: {
          name: String(data.name || ""),
          email: String(data.email || ""),
          phone: String(data.phone || ""),
          message: String(data.message || "")
        }
      })
    });

    if (!upstream.ok) {
      return makeResponse(502, { error: "Upstream forwarding failed" });
    }

    return makeResponse(200, { ok: true });
  } catch {
    return makeResponse(502, { error: "Could not reach upstream service" });
  }
};
