
//upload file
/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload file to S3
 *     tags: [Core - Upload]
 *     parameters:
 *       - in: query
 *         name: dir
 *         required: false
 *         schema:
 *           type: string
 *         description: Target folder in S3 (e.g., 'lab-assets', 'videos', etc.)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Upload successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: https://your-bucket.s3.amazonaws.com/lab-assets/filename.jpg
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Internal server error
 */