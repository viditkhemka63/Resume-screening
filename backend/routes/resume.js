import express from 'express';
var router = express.Router();
import Resume from '../schema/resume';
import axios from 'axios';


const parserResume = async(url) => {
    const resp = await axios.post('http://localhost:5000/prediction', {
        url
    })
    console.log(resp.data);
    return resp.data
}


router.post('/insert', async(req, res) => {
    console.log(req.body);

    let data = await parserResume(req.body.url);
    
    const { name, 
        email, 
        mobile_number, 
        skills, 
        college_name, 
        degree, 
        designation, 
        experience, 
        no_of_pages, 
        company_names, 
        total_experience} = data

    var resume = new Resume({
        name,
        email,
        mobile_number,
        skills,
        college_name,
        degree,
        designation,
        experience,
        no_of_pages,
        company_names,
        total_experience
    })
    const result = await resume.save()
    console.log(result)
    res.json(result)
})

router.post('/getAll', async(req, res) => {
    const data = await Resume.find({});
    console.log(data)
    res.json(data)
})


router.post('/query', async(req, res) => {
    console.log(req.body)
    const {query, value} = req.body;
  
    
    const data = await Resume.find({[query]: value});
    console.log(data)
    res.json(data)
})


module.exports = router;
