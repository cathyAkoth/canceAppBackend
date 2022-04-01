const candidateRepository = require('../repository')
const multer = require('multer')



exports.createCandidate = async (req, res) => {
    try {
        let candidate = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            // image: req.body.image,
            nationality: req.body.nationality,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,

            price: req.body.price,
            image: req.file.path,
            fil: req.file.path,
            
        }
        let candidates = await candidateRepository.createCandidate({
            ...candidate
        });
        res.status(200).json({
            status: true,
            data: candidates,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getCandidates = async (req, res) => {
    try {
        let candidates = await candidateRepository.candidates();
        res.status(200).json({
            status: true,
            data: candidates,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}

exports.getCandidateById = async (req, res) => {
    try {
        
        let id = req.params.id
        let candidateDetails = await candidateRepository.candidateById(id);
        res.status(200).json({
            status: true,
            data: candidateDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}

exports.updateCandidateById = async(req, res) => {
    
    let {id} = req.params
    let candidateDetails = await candidateRepository.candidateById(id);
    if(!candidateDetails) {
        return res.status(404).json({
            message: "verification not found"
        }) 
    }
    await candidateRepository(id);
    return res.json({
        message: "candidate verification  updated successfully"
    })
}

exports.removeCandidate = async (req, res) => {
    try {
        let id = req.params.id
        let candidateDetails = await candidateRepository.removeCandidate(id)
        res.status(200).json({
            status: true,
            data: candidateDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}