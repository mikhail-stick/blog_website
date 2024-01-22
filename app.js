const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const PORT = process.env.PORT | 5000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "templates");

app.use(express.static("static"));
app.use("/blogs", express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const dbURI = "mongodb://localhost:27017/blogdb";
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server running on localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// app.get("/add-blog", (req, res) => {
//   const blog = Blog({
//     title: "new blog 2",
//     snippet: "amazing!",
//     body: "lorem ipsum.... ",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("65ae316bfb11d5b69aec4a44")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.use((req, res, next) => {
//   console.log();
//   console.log("New request made");
//   console.log("Host:", req.hostname);
//   console.log("Path:", req.path);
//   console.log("Method", req.method);
//   console.log();
//   next();
// });

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});
