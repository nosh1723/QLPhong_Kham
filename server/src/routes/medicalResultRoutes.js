const express = require('express');
const { createMedicalResult, getMedicalResult, deleteMedicalResult } = require('../controllers/medicalResultController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['admin', 'doctor']), createMedicalResult);
router.get('/:id', authMiddleware, roleMiddleware(['admin', 'doctor']), getMedicalResult);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteMedicalResult);

module.exports = router;
