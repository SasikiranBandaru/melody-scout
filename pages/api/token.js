import axios from "axios";
import qs from "qs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const clientId = "74f2f2fb31124bae932f4c83f5f3b337";
    const clientSecret = "def0fdf8776c4dcf9d63f4f1269b4801";
    const redirectUri = "https://melody-scout-web-final.vercel.app/";

    const code = req.body.code;
    const encodedCredentials = Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString("base64");

    try {
      const response = await axios.post(
        `https://accounts.spotify.com/api/token`,
        qs.stringify({
          grant_type: "authorization_code",
          code,
          redirect_uri: "https://melody-scout-web-final.vercel.app/",
        }),
        {
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
