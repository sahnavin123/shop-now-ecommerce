export default function handler(req, res) {
  let pincodes = {
    '721302' : ["Kharagpur", 'West Bengal'],
    '110003' : ["Delhi", 'Delhi'],
    '562112' : ["Bangalore", 'Karnataka'],
  }
    res.status(200).json(pincodes)
  }
  