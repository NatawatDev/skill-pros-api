
//login
/**
 * @swagger
 * /api/admin/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin - Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */


//logout
/**
 * @swagger
 * /api/admin/auth/logout:
 *   post:
 *     summary: Logout the current admin
 *     tags: [Admin - Auth]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Logout successfully.
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */


//refresh token
/**
 * @swagger
 * /api/admin/auth/refresh-token:
 *   post:
 *     summary: Refresh access token using refresh token
 *     tags: [Admin - Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token issued
 *       401:
 *         description: Invalid or expired refresh token
 */