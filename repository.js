const Candidate = require("./models/Candidate");
exports.candidates = async () => {
    const candidates = await Candidate.find();
    return candidates;
};
exports.candidateById = async id => {
    const candidate = await Candidate.findById(id);
    return candidate;
}
exports.createCandidate = async candidate => {
    const newCandidate = await Candidate.create(candidate);
    return newCandidate
}
exports.removeCandidate = async id => {
    const candidate = await Candidate.findByIdAndRemove(id);
    return candidate
}