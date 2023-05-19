import { Schema, model } from "mongoose";

export interface Job{
    id: string;
    name: string;
    price: number;
    stars: number;
    imageUrl: string;
    jobTime: string;
    favorite: boolean;
    tags: string[];
}

export const JobSchema = new Schema<Job>(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        tags: {
            type: [String],
        },
        favorite: {
            type: Boolean,
            default: false
        },
        stars: {
            type: Number,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        
        jobTime: {
            type: String,
            required: true
        },
    }, {
    toJSON: {
        // to have an id and use as id and not _id
        virtuals: true
    }, toObject: {
        virtuals: true
    },
    timestamps: true
}
);

export const JobModel = model<Job>('job', JobSchema)