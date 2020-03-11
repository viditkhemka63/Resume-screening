import express from 'express';
var router = express.Router();
import Resume from '../schema/resume';
import axios from 'axios';


router.post('/insert', async(req, res) => {
    console.log(req.body);
    
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
        total_experience} = req.body

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
    
    res.json(result)
})

router.post('/getPost', async(req, res) => {
    var url = req.body.url;

    const resp = await axios.post('http://localhost:5000/prediction', {
        url
    })
    console.log(resp.data);
    res.json(resp.data)
})

module.exports = router;
