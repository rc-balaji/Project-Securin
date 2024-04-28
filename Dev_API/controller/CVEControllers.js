const CVE = require("../models/CVE");

exports.getTotalCount = async (req, res) => {
  try {
    const count = await CVE.countDocuments();
    res.json({ total: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getDataByIndexAndCount = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const count = parseInt(req.query.count) || 10; // Default to 10 if count is not provided

    const data = await CVE.find({}, { 
      id: 1, 
      sourceIdentifier: 1, 
      published: 1, 
      lastModified: 1, 
      vulnStatus: 1 
    }).skip(startIndex).limit(count);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getDataById = async (req, res) => {
    try {
      const keyId = req.params.id;
  
      const data = await CVE.findOne({ id: keyId });
      if (!data) {
        return res.status(404).json({ message: "Data not found" });
      }
  
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  