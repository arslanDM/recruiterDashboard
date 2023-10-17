const fs = require("fs");

const envVariables = {
  PORT_NO: 3333,
  DATABASE_URL: "your_database_url_here",
  JWT_SECRET: "your_jwt_secret",
};

const envContent = Object.entries(envVariables)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n");

fs.writeFileSync(".env", envContent);

console.log(".env file has been generated and populated with variables.");
