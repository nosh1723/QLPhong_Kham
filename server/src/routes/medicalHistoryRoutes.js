const express = require('express');
const { createMedicalHistory, getMedicalHistory, getMedicalHistoryByPatientId, deleteMedicalHistory } = require('../controllers/medicalHistoryController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['doctor', 'admin']), createMedicalHistory);
router.get('/visit/:visit_id', authMiddleware, getMedicalHistory);
router.get('/patient/:patient_id', authMiddleware, getMedicalHistoryByPatientId);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteMedicalHistory);

module.exports = router;
