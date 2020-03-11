import mongoose from 'mongoose';

const { Schema } = mongoose;

var resumeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    mobile_number: {type: Number}, 
    skills: {type: String}, 
    college_name: {type: String}, 
    degree : {type: String}, 
    designation: {type: String}, 
    experience: {type: String}, 
    company_names: {type: String}, 
    no_of_pages: {type: String},
    total_experience: {type: String},
    raw_resume: {type: String}
});

module.exports =  mongoose.model('Resume', resumeSchema);