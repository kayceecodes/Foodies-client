import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    // Fetch the token from the external API
    const response = await axios.post("http://localhost:5156/api/auth/login", {
      email,
      password,
    });

    const token = response.data.token;

    // Set the token as a cookie
    res.setHeader(
      "Set-Cookie",
      serialize("authToken", token, {
        httpOnly: true, // Cookie is only accessible by the server
        secure: process.env.NODE_ENV === "development", // Use secure cookie in production
        maxAge: 60 * 60 * 24 * 30, // Expires in 1 day * 30
        path: "/", // Available across the entire application
      })
    );

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
}
