
//invite admin
/**
 * @swagger
 * /api/admin/admins/invite:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *     responses:
 *       200:
 *         description: invite successful
 *       401:
 *         description: Invalid credentials
 */


//setup password
/**
 * @swagger
 * /api/admin/admins/setup-password:
 *   post:
 *     summary: Setup password for invited admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               inviteToken:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account setup successful
 *       401:
 *         description: Invalid or expired token
 */

//verify token
/**
 * @swagger
 * /api/admin/admins/verify-token:
 *   post:
 *     summary: Verify Token (Invite / Reset)
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - type
 *             properties:
 *               token:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [invite, reset]
 *                 description: Type of token (invite or reset)
 *     responses:
 *       200:
 *         description: Verify token successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *       401:
 *         description: Invalid or expired token
 */


//forget password
/**
 * @swagger
 * /api/admin/admins/forget-password:
 *   post:
 *     summary: forget password
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Send forget password email successfully
 *       401:
 *         description: Invalid or expired token
 */


//reset password
/**
 * @swagger
 * /api/admin/admins/reset-password:
 *   post:
 *     summary: Reset password for admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetPasswordToken:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       401:
 *         description: Invalid or expired token
 */


//find all admins
/**
 * @swagger
 * /api/admin/admins:
 *   get:
 *     summary: Get all admins with optional search and pagination
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number 
 *         default: 1
 *       - in: query
 *         name: limitPerPage
 *         schema:
 *           type: integer
 *         description: Items per page 
 *         default: 10
 *       - in: query
 *         name: all
 *         schema:
 *           type: boolean
 *         description: If true, return all items without pagination
 *       - in: query
 *         name: searchText
 *         schema:
 *           type: string
 *         description: Search by first name, last name or email  
 *     responses:
 *       200:
 *         description: List of admins
 */


//active admin status
/**
 * @swagger
 * /api/admin/admins/active/{id}:
 *   patch:
 *     summary: Update admin status to active
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Status updated successfully
 */


//active admin status
/**
 * @swagger
 * /api/admin/admins/suspend/{id}:
 *   patch:
 *     summary: Update admin status to suspend
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Status updated successfully
 */


//profile admin
/**
 * @swagger
 * /api/admin/admins/profile:
 *   get:
 *     summary: Find admin
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Status updated successfully
 */