import serverAuth from "@/lib/serverAuth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(403).end();
  }

  try {
    const { currentUser } = await serverAuth(req);
    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(errer);
    return res.status(400).end();
  }
}
