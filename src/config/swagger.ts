const swaggerJSDoc = require('swagger-jsdoc')

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SkillPros API',
      version: '1.0.0',
      description: 'API documentation for SkillPros admin system',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['src/modules/**/*.ts'],
}

export const createSwaggerSpec = () => swaggerJSDoc(swaggerOptions)
