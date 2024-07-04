const express = require('express');
const { createMedicalReport, getMedicalReport, getMedicalReportByPatientId, deleteMedicalReport } = require('../controllers/medicalReportController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['doctor', 'admin']), createMedicalReport);
router.get('/:id', authMiddleware, getMedicalReport);

router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteMedicalReport);

module.exports = router; 
