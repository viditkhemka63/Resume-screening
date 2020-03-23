import mongoose from 'mongoose';

const { Schema } = mongoose;

var resumeSchema = new Schema({
    name: { type: String },
    email: { type: String },
    mobile_number: {type: String}, 
    skills: {type: String}, 
    college_name: {type: String}, 
    degree : {type: String}, 
    designation: {type: String}, 
    experience: {type: String}, 
    company_names: {type: String}, 
    no_of_pages: {type: String},
    total_experience: {type: String},
    resume: {type: String}
});

module.exports =  mongoose.model('Resume', resumeSchema);