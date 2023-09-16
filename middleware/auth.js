import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    // verify token
    if (token.startsWith('Bearer '))
      token = token.slice(7, token.length);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // if (!id) return res.status(401).json({ error: 'Unauthorized' });

    req.user = verified;
    next();
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
}