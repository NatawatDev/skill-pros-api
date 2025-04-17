

//find all lessons
/**
 * @swagger
 * /api/admin/labs/{labId}/lessons:
 *   get:
 *     summary: Get all lessons under a lab
 *     tags: [Admin - Lessons]
 *     parameters:
 *       - in: path
 *         name: labId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: List of lessons
 */



//find one lesson
/**
 * @swagger
 * /api/admin/labs/{labId}/lessons/{id}:
 *   get:
 *     summary: Get single lesson
 *     tags: [Admin - Lessons]
 *     parameters:
 *       - in: path
 *         name: labId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson found
 */


//create lessons
/**
 * @swagger
 * /api/admin/labs/{labId}/lessons:
 *   post:
 *     summary: Create Lessons for a lab
 *     tags: [Admin - Lessons]
 *     parameters:
 *       - in: path
 *         name: labId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required: [title]
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 attachmentPath:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       format: uri
 *                     type:
 *                       type: string
 *                       enum: [pdf, image, video]
 *                 order:
 *                   type: number
 *     responses:
 *       201:
 *         description: Lessons created successfully.
 */


//update lessons
/**
 * @swagger
 * /api/admin/labs/{labId}/lessons:
 *   put:
 *     summary: Update Lessons for a lab (replace all)
 *     tags: [Admin - Lessons]
 *     parameters:
 *       - in: path
 *         name: labId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required: [id, title]
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 attachmentPath:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       format: uri
 *                     type:
 *                       type: string
 *                       enum: [pdf, image, video]
 *                 order:
 *                   type: number
 *     responses:
 *       200:
 *         description: Lessons updated successfully.
 */


//delete lesson
/**
 * @swagger
 * /api/admin/labs/{labId}/lessons/{id}:
 *   delete:
 *     summary: Delete a lesson
 *     tags: [Admin - Lessons]
 *     parameters:
 *       - in: path
 *         name: labId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */


//publish lesson status
/**
 * @swagger
 * /api/admin/labs/lessons/publish/:id:
 *   patch:
 *     summary: Update lessons status to published
 *     tags: [Admin - Lessons]
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


//unpublish lesson status
/**
 * @swagger
 * /api/admin/labs/lessons/unpublish/:id:
 *   patch:
 *     summary: Update lessons status to unpublished
 *     tags: [Admin - Lessons]
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