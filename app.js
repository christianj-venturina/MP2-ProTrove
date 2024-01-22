const ex = require("express");
const jbs = require("./jobs");
const cors = require("cors");

const app = ex();

app.use(ex.json());
app.use(cors());

const j = jbs.jobs;
const sj = jbs.saved_jobs;
const aj = jbs.applied_jobs;

//API

app.get("/api/jobs", (req, res) => {
  res.send(j);
});

app.put("/api/saved_jobs", (req, res) => {
  let saved_jobs = {
    id: req.body.id,
  };
  sj.push(saved_jobs);
  console.log(saved_jobs);
  res.send(saved_jobs);
});

app.delete("/api/saved_jobs/:id", (req, res) => {
  for (let i = 0; i < sj.length; i++) {
    if (sj[i].id == Number(req.params.id)) {
      saved_job = sj[i];
      break;
    }
  }
  if (saved_job) {
    let index = sj.indexOf(saved_job);
    console.log(saved_job);
    sj.splice(index, 1);
    res.send(saved_job);
  } else {
    let err = "Job not found!";
    res.status(404);
    res.send(err);
    console.log(err);
  }
});

app.get("/api/saved_jobs", (req, res) => {
  res.send(sj);
});

app.put("/api/applied_jobs", (req, res) => {
  let applied_jobs = {
    id: req.body.id,
  };
  aj.push(applied_jobs);
  console.log(applied_jobs);
  res.send(applied_jobs);
});

app.delete("/api/applied_jobs/:id", (req, res) => {
  for (let i = 0; i < aj.length; i++) {
    if (aj[i].id == Number(req.params.id)) {
      applied_job = aj[i];
      break;
    }
  }
  if (applied_job) {
    let index = aj.indexOf(applied_job);
    console.log(applied_job);
    aj.splice(index, 1);
    res.send(applied_job);
  } else {
    let err = "Job not found!";
    res.status(404);
    res.send(err);
    console.log(err);
  }
});

app.get("/api/applied_jobs", (req, res) => {
  res.send(aj);
});

//Server
let port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
