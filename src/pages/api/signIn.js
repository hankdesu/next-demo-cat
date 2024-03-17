import { v4 as uuidV4 } from 'uuid';
import { serialize } from 'cookie';

export const users = new Map()

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { body } = req;
    const { username, password } = body;

    const userId = uuidV4();
    users.set(userId, { username, password });

    const cookie = serialize('user_id', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 15,
      path: '/',
    })
    res.setHeader('Set-Cookie', cookie)

    res.status(200).json({ id: userId, username });
  }
}
