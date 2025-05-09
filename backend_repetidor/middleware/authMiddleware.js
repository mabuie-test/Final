const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token não fornecido' });

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Acesso negado' });
      }
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token inválido' });
    }
  };
};

module.exports = authMiddleware;
