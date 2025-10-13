const database = require('../../../Database/Patient/MedicalHistory/deletePrescription');

const deletePrescription = async (req, res) => {
  try {
    const { prescriptionId } = req.params;

    const result = await database.deletePrescription(prescriptionId);

    if (!result) {
      return res.status(404).json({ message: 'Prescription not found or already deleted' });
    }

    res.status(200).json({
      message: 'Prescription deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { deletePrescription };
