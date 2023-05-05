import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const requestByAdmin = await isAdminRequest(req, res);
  if (!requestByAdmin) {
    res.status(401).end();
  }

  res.status(200).json({ name: "John Doe" });
}
