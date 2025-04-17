

//find all labs
/**
 * @swagger
 * /api/admin/labs:
 *   get:
 *     summary: Get all labs
 *     tags: [Admin - Labs]
 *     responses:
 *       200:
 *         description: A list of labs
 */


//find one lab
/**
 * @swagger
 * /api/admin/labs/{id}:
 *   get:
 *     summary: Get lab by ID
 *     tags: [Admin - Labs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lab fetched successfully
 */


//create labs
/**
 * @swagger
 * /api/admin/labs:
 *   post:
 *     summary: Create a new lab
 *     tags: [Admin - Labs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Network Fundamentals"
 *               description:
 *                 type: string
 *                 example: "Basic networking concepts"
 *               attachmentPath:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                     format: uri
 *                     example: "https://example.com/lab.pdf"
 *                   type:
 *                     type: string
 *                     enum: [pdf, image, video]
 *                     example: pdf
 *     responses:
 *       201:
 *         description: Lab created successfully
 */


//update lab
/**
 * @swagger
 * /api/admin/labs/{id}:
 *   patch:
 *     summary: Update a lab
 *     tags: [Admin - Labs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               attachmentPath:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                     format: uri
 *                     example: "https://example.com/lab.pdf"
 *                   type:
 *                     type: string
 *                     enum: [pdf, image, video]
 *                     example: pdf
 *     responses:
 *       200:
 *         description: Lab updated successfully
 */


//delete lab
/**
 * @swagger
 * /api/admin/labs/{id}:
 *   delete:
 *     summary: Delete a lab
 *     tags: [Admin - Labs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lab deleted successfully
 */


//publish lab status
/**
 * @swagger
 * /api/admin/labs/publish/{id}:
 *   patch:
 *     summary: Update lab status to published
 *     tags: [Admin - Labs]
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


//unpublish lab status
/**
 * @swagger
 * /api/admin/labs/unpublish/{id}:
 *   patch:
 *     summary: Update lab status to unpublished
 *     tags: [Admin - Labs]
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