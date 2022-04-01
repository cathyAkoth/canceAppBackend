const Shortlist = require("./models/ShortList");
exports.shortlist = async () => {
    const shortlists = await Shortlist.find().populate({
        path: "items.candidateId",
        select: "name price total"
    });;
    return shortlists[0];
};
exports.addItem = async candidate => {
    const newItem = await Shortlist.create(candidate);
    return newItem
}