const express = require('express');
const router = express.Router();
const medicalHistoryController = require('../controllers/medicalHistoryController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/medical-history', authMiddleware, roleMiddleware(['doctor']), medicalHistoryController.createMedicalHistory);

router.get('/medical-history/:visit_id', authMiddleware,/* roleMiddleware(['doctor']),*/ medicalHistoryController.getMedicalHistory);

router.delete('/medical-history/:id', authMiddleware, roleMiddleware(['doctor']), medicalHistoryController.deleteMedicalHistory);

module.exports = router;
