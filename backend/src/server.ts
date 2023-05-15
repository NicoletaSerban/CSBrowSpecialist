import express from "express";

// only for development
import cors from "cors";
import { sample_jobs, sample_tags } from "./data";

const app = express();

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.get("/api/jobs", (req, res) => {
    res.send(sample_jobs)
});

app.get("/api/jobs/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const jobs = sample_jobs.filter(job => job.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(jobs)

});

app.get("/api/jobs/tags", (req, res) => {
    res.send(sample_tags)
});

app.get("/api/jobs/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const jobs = sample_jobs.filter(job => job.tags?.includes(tagName));

    res.send(jobs)
});

app.get("/api/jobs/:jobId", (req, res) => {
    const jobId = req.params.jobId;
    const job = sample_jobs.find(job => job.id == jobId);
    res.send(job)
})

const port = 5000;
app.listen(port, () => {
    console.log(`Website is served on http://localhost:${port}`)
})