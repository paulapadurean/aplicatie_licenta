
const express = require("express");
const router = express.Router();
const { collection, addDoc, getDocs } = require("firebase/firestore");
const db = require("../firebase");


router.post("/companii", async (req, res) => {
    try {
        const { name, environmental, social, governance } = req.body;
        const esgScore = Math.round((environmental + social + governance) / 3);

        const docRef = await addDoc(collection(db, "companies"), {
            name,
            environmental,
            social,
            governance,
            esgScore,
            createdAt: new Date()
        });

        res.status(201).json({ id: docRef.id, message: "Companie adăugată cu succes" });
    } catch (error) {
        console.error("Eroare la adăugare:", error);
        res.status(500).json({ error: "Eroare la adăugarea companiei" });
    }
});


router.get("/companii", async (req, res) => {
    try {
        const snapshot = await getDocs(collection(db, "companies"));
        const companies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(companies);
    } catch (error) {
        console.error("Eroare la citire:", error);
        res.status(500).json({ error: "Eroare la citirea companiilor" });
    }
});

module.exports = router;
