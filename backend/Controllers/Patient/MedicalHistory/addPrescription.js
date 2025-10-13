const database = require('../../../Database/Patient/MedicalHistory/addPrescription');

const addPrescription = async (req, res) => {
  try {
    const { patientId, medicationData } = req.body;

    const result = await database.addPrescription(patientId, medicationData);

    if (!result) {
      return res.status(400).json({ message: 'Failed to add prescription' });
    }

    res.status(201).json({
      message: 'Prescription added successfully',
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addPrescription };
