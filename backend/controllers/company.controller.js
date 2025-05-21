import {Company} from "../models/company.model.js"

export const registerCompany = async(req,res) =>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                success:false,
                message:"Company name is required"
            });
        }
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"You can't register for same company"
            })
        }
        company  = await Company.create({
            name:companyName,
            userId : req.id
        });
        return res.status(201).json({
            success:true,
            company,
            message:"Company registered successfully"
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async (req,res)=>{
    try {
        const userId = req.id;//logined user id it means we are getting he iser id of that  company only
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success:false
            })
        } 
        return res.status(200).json({
            success:true,
            companies,
            message:"Successfully got"
        })

    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById = async ( req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                success:false,
                message:"Company not found"
            })
        }

        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async (req,res)=>{
    try {
        const{name,description,website ,location} = req.body;
        // const file = req.file;
        // cloudnary 

        const updateData = {name,description,website ,location};
        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});
        if(!company){
            return res.status(404).json({
                success:false,
                message:"Company not found for Updation"
            })
        }
        return res.status(200).json({
            success:true,
            updateData,
            message:"company info updated"

        })
    } catch (error) {
        console.log(error);
    }
}
