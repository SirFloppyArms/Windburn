exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      ok: true,
      service: "windburn-site",
      timestamp: new Date().toISOString()
    })
  };
};
