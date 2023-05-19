import { Router } from "express";
import { sample_jobs, sample_tags } from "../data";
import asyncHandler from 'express-async-handler';
import { JobModel } from "../models/job.model";

const router = Router();

router.get("/seed", asyncHandler(
    // puts the data into the DB
    async (req, res) => {
        const jobsCount = await JobModel.countDocuments()
        if (jobsCount > 0) {
            res.send('Seed is already done!');
            return
        }
   
        // if the jobs dosent exist into the DB
        await JobModel.create(sample_jobs)
        res.send('Seed Is Done!')
}
));

router.get("/", asyncHandler(
    async(req, res) => {
    const jobs = await JobModel.find()
    res.send(jobs)
    }
))

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
    // to make case insensitive
    const searchRegex = new RegExp(req.params.searchTerm, 'i')
   const jobs = await JobModel.find({name:{$regex:searchRegex}})
    res.send(jobs)

    }
));

router.get("/tags", asyncHandler(
    
    async (req, res) => {
        const tags = await JobModel.aggregate([
            {
                // 
                $unwind:'$tags'
            },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({ count: -1 })
        
        const all = {
            name: 'All',
            count: await JobModel.countDocuments()
        }

        tags.unshift(all)
    res.send(tags)
    }
));

router.get("/tag/:tagName", asyncHandler(
    async (req, res) => {
   const jobs = await JobModel.find({tags: req.params.tagName})
    res.send(jobs)
    }
));

router.get("/:jobId", asyncHandler(
    async (req, res) => {
        const jobs = await JobModel.findById(req.params.jobId)
        res.send(jobs)
    }
));

export default router;