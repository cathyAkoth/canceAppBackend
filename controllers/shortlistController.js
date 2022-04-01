const shortlistRepository = require('../shortlistrepository')
    const candidateRepository = require('../repository');
    
    exports.addItemToShortlist = async (req, res) => {
        const {
            candidateId
        } = req.body;
        const quantity = Number.parseInt(req.body.quantity);
        try {
            let shortlist = await shortlistRepository.shortlist();
            let candidateDetails = await candidateRepository.candidateById(candidateId);
                 if (!candidateDetails) {
                return res.status(500).json({
                    type: "Not Found",
                    msg: "Invalid request"
                })
            }
            //--If shortlist Exists ----
            if (shortlist) {
                //---- check if index exists ----
                const indexFound = shortlist.items.findIndex(item => item.candidateId.id == candidateId);
                //------this removes an item from the the shortlist if the quantity is set to zero,We can use this method to remove an item from the list  -------
                if (indexFound !== -1 && quantity <= 0) {
                    shortlist.items.splice(indexFound, 1);
                    if (shortlist.items.length == 0) {
                        shortlist.subTotal = 0;
                    } else {
                        shortlist.subTotal = shortlist.items.map(item => item.total).reduce((acc, next) => acc + next);
                    }
                }
                //----------check if candidate exist,just add the previous quantity with the new quantity and update the total price-------
                else if (indexFound !== -1) {
                    shortlist.items[indexFound].quantity = shortlist.items[indexFound].quantity + quantity;
                    shortlist.items[indexFound].total = shortlist.items[indexFound].quantity * candidateDetails.price;
                    shortlist.items[indexFound].price = candidateDetails.price
                    shortlist.subTotal = shortlist.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----Check if Quantity is Greater than 0 then add item to items Array ----
                else if (quantity > 0) {
                    shortlist.items.push({
                        candidateId: candidateId,
                        quantity: quantity,
                        price: candidateDetails.price,
                        total: parseInt(candidateDetails.price * quantity)
                    })
                    shortlist.subTotal = shortlist.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----if quantity of price is 0 throw the error -------
                else {
                    return res.status(400).json({
                        type: "Invalid",
                        msg: "Invalid request"
                    })
                }
                let data = await shortlist.save();
                res.status(200).json({
                    type: "success",
                    mgs: "Process Successful",
                    data: data
                })
            }
            //------------ if there is no user with a shortlist...it creates a new shortlist and then adds the item to the shortlist that has been created------------
            else {
                const shortlistData = {
                    items: [{
                        candidateId: candidateId,
                        quantity: quantity,
                        total: parseInt(candidateDetails.price * quantity),
                        price: candidateDetails.price
                    }],
                    subTotal: parseInt(candidateDetails.price * quantity)
                }
                shortlist = await shortlistRepository.addItem(shortlistData)
                // let data = await shortlist.save();
                res.json(shortlist);
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something Went Wrong",
                err: err
            })
        }
    }
    exports.getShortlist = async (req, res) => {
        try {
            let shortlist = await shortlistRepository.shortlist()
            if (!shortlist) {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Shortlist Not Found",
                })
            }
            res.status(200).json({
                status: true,
                data: shortlist
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something Went Wrong",
                err: err
            })
        }
    }
    
    exports.emptyShortlist = async (req, res) => {
        try {
            let shortlist = await shortlistRepository.shortlist();
            shortlist.items = [];
            shortlist.subTotal = 0
            let data = await shortlist.save();
            res.status(200).json({
                type: "success",
                mgs: "shortlist Has been emptied",
                data: data
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something Went Wrong",
                err: err
            })
        }
    }