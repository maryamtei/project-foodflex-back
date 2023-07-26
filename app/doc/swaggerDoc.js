const swagger = require("express-jsdoc-swagger");

const options = {
    definition: {
        openapi: '3.0.0',
        info:{
            title: "Project Foodflex",
            version: "1.0.0",
            description: "API for create a custom recipe schedule"
        },
        servers: [
            {
                url: "http://localhost:3210"
            }
        ]
    },
    apis: ["../routers/*.js"]
}