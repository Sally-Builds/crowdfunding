import { Schema, model } from "mongoose";
import Donation from '@/resources/donation/donation.interface'
import ProjectModel from "@/resources/project/project.model";

const donationSchema = new Schema<Donation>({
    amount: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    vetoStatus: {
        type: Boolean,
        default: false,
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

donationSchema.statics.aggreateDonations = async function (projectId:string):Promise <void> {
    const stats = await this.aggregate([
        {
            $match: {
              project: projectId,
            },
        },
        {
            $group: {
                _id: 'total',
                amount: {$sum: '$amount'}
            }
        }
    ])

    if(stats.length > 0) {
        await ProjectModel.findByIdAndUpdate(projectId, {
            totalAmount: stats[0].amount
        })
    }else {
        await ProjectModel.findByIdAndUpdate(projectId, {
            totalAmount: 0
        })
    }
    
}

donationSchema.post('save', async function (): Promise<void> {
    (this as any).constructor.aggreateDonations(this.project)
})

donationSchema.pre(/^findOneAnd/, async function (next:any): Promise<void> {
    (this as any).r = await (this as any).findOne();
    next();
  });

donationSchema.post(/^findOneAnd/, async (docs) => {
    if (docs) await docs.constructor.aggreateDonations(docs.project);
  });

export default model<Donation>('Donation', donationSchema)