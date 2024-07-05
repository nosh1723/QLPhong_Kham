const express = require('express');
const { createMedicalReport, getMedicalReport, getMedicalReportByPatientId, deleteMedicalReport, getMedicalReportByAppId, createOrUpdateMedicalReport, getALLMedicalReport } = require('../controllers/medicalReportController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/save-or-edit', createOrUpdateMedicalReport);
router.get('/get-by-app-id/:id', getMedicalReportByAppId);
router.get('/', getALLMedicalReport)

router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteMedicalReport);

module.exports = router; 
