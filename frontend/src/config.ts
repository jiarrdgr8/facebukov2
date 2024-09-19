const ENV = "prod";

const common = {
  FOOTER_TEXT: "©2024 Facebuko. All rights reserved.",
};

const dev = {
  API_URL: "http://localhost:3001/api/v1/",
};

const prod = {
  API_URL: "https://facebukov2.onrender.com/api/v1/",
};

const config =
  process.env.NODE_ENV === "dev"
    ? { ...common, ...dev }
    : { ...common, ...prod };

if (process.env.NODE_ENV === "dev") {
  console.log("ENV", process.env.NODE_ENV);
  console.log("config", config);
}

export default config;
