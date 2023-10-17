require("../global-packages");

require("dotenv").config();
require("../helper/error.helper");
require("../constants/messages");
require("../config/connect-database");

app.get("/", (req, res, next) => {
  res.status(200).send("<h1>Node JS Starter</h1>");
});

//express middleware
app.use(
  express.json({
    limit: "1MB",
  })
);
app.use(cors());
app.use(morgan("tiny"));

app.use(require("../middlewares/jwt.middleware").authenticate);
require("../routes");

app.use(function (err, req, res, next) {
  res.status(err.statusCode || 500).send({
    status: err.statusCode || 500,
    message: err.message || "",
    data: err.errPayload || {},
  });
});

server.listen(process.env.PORT_NO || 3333, () => {
  console.log(`Server is Running On Port ${process.env.PORT_NO || 3333}`);
});
