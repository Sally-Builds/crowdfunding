import DonationModel from "./donation.model";
import Donation from "./donation.interface";

class DonationService {
    private donation = DonationModel

    /**
     * Create a Donation
     */

    public async create (amount: number, user: string, project: string): Promise<Donation | void> {
        try {   
            const donation = await this.donation.create({amount, user, project})
            return donation
        }catch(error:any) {
            throw new Error(error.message);
            
        }
    }
}

export default DonationService