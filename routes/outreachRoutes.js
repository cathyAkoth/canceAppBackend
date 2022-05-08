const router  = require('express').Router()
const OutreachController = require('../controllers/outreach.controller')




router.get('', async(req, res) => {
    let outreachs = await OutreachController.fetchOutreachs();
    res.json({
        data: outreachs
    })
})



router.post('/add', async (req, res) => {
    let data = req.body;
    let outreach = await OutreachController.addOutreach(data)
    
    return res.status(201).json({
        message: outreach
    })
})


router.get('/:id', async (req, res) => {
    let { id } = req.params;

    let data =  await OutreachController.getOutreach(id);

    if(!data) {
        return res.status(404).json({
            message: "details not found"
        })
    }
    return res.json({
        data
    })
})



router.put('/update/id', async(req, res) => {
    
    let {id} = req.params
    let outreach = await OutreachController.getOutreach(id);
    if(!outreach) {
        return res.status(404).json({
            message: "Outreach  not found"
        }) 
    }
    await OutreachController(id);
    return res.json({
        message: "outreach  updated successfully"
    })
})


router.delete('/delete/:id', async (req, res)=> {
    let { id } = req.params;

    let outreachDetails = await OutreachController.deleteOutreach(id);
    return res.json({
        outreachDetails
    })
})



module.exports = router;