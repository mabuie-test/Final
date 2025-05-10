 const express = require('express');
 const router = express.Router();
 const authController = require('../controllers/authController');
-const auth = require('../middleware/authMiddleware');
-const onlyAdmin = require('../middleware/roleMiddleware');
+// const auth = require('../middleware/authMiddleware');
// const onlyAdmin = require('../middleware/roleMiddleware');

 // Login e registro
 router.post('/login', authController.login);
-router.post('/register', auth, onlyAdmin('admin'), authController.register);
+// Rota de registro livre, sem autenticação
+router.post('/register', authController.register);

 module.exports = router;
