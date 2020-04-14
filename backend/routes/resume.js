import express from 'express';
var router = express.Router();
import Resume from '../schema/resume';
import axios from 'axios';


const parserResume = async(url) => {
    console.log(url)
    const resp = await axios.post('http://localhost:5000/prediction', {
        "url": url
    })
    console.log(resp.data);
    return resp.data
}


router.post('/insert', async(req, res) => {
    console.log(req.body)
    let data = await parserResume(req.body.url);
    console.log('data is ')
    console.log(data)
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
        total_experience,
        resume} = data
    console.log(data.email)
    console.log(name)


    var myresume = new Resume({
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
        total_experience,
        resume
    })
    const result = await myresume.save()
    console.log('result is ')
    console.log(result)
    res.json(result)
})

router.get('/getAll', async(req, res) => {
    const data = await Resume.find({});
    console.log(data.length)
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
