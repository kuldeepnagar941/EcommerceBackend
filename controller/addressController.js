const Address = require('../model/addressModel');


exports.createAddress = async (req, res) => {
    try {
        // console.log(req.body)
        const address = new Address({ ...req.body });
        await address.save();
        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAddresses = async (req, res) => {
    try {
        // console.log(req.params.id)
        const addresses = await Address.find(  { userId: req.params.id });                      
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address  == req.userId) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Address
exports.updateAddress = async (req, res) => {
    try {
        let address = await Address.findById(req.params.id);
        if (!address  == req.userId) {
            return res.status(404).json({ message: 'Address not found' });
        }
        address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Address
exports.deleteAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address == req.userId) {
            return res.status(404).json({ message: 'Address not found' });
        }
        await address.deleteOne();
        res.status(200).json({ message: 'Address deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
