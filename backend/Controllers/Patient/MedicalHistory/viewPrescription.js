const database = require('../../../Database/Patient/MedicalHistory/viewPrescription');

const viewPrescription = async (req, res) => {
  try {
    const { patientId } = req.params;

    const prescriptions = await database.retrievePrescription(patientId);

    if (!prescriptions) {
      return res.status(404).json({ message: 'No prescriptions found' });
    }

    res.status(200).json({
      message: 'Prescriptions retrieved successfully',
      data: prescriptions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { viewPrescription };
