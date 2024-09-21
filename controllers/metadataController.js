const Metadata = require('../models/Metadata');

// Add Metadata
exports.addMetadata = async (req, res) => {
    const { title, value, type, description } = req.body.data;

    if (!title || !value || !type) {
        return res.status(400).json({ error: true, message: "Title, value, and type are required." });
    }

    try {
        const newMetadata = new Metadata({
            title,
            value,
            type,
            description,
            is_active: true // Default to true when creating
        });

        await newMetadata.save();
        res.status(201).json({ error: false, message: "Metadata added successfully", data: newMetadata });
    } catch (error) {
        console.error("Error while adding metadata:", error);
        res.status(500).json({ error: true, message: error.message });
    }
};

// Get all Metadata
exports.getAllMetadata = async (req, res) => {
    try {
        const metadataList = await Metadata.find({ is_active: true });
        res.status(200).json({ error: false, data: metadataList });
    } catch (error) {
        console.error("Error while fetching metadata list:", error);
        res.status(500).json({ error: true, message: error.message });
    }
};

exports.updateMetadata = async (req, res) => {
// Update Metadata (this will mark it as inactive)exports.updateMetadata = async (req, res) => {
    const { id } = req.body.data; // Extract the ID from the request body
    const updateData = req.body.data; // Get the entire data to be updated

    try {
         
        updateData.updated_on = Date.now();
        updateData.updated_by = updateData.updated_by || "0"; // Default to "0" if not provided

        const updatedMetadata = await Metadata.findByIdAndUpdate(
            id,
            { $set: updateData }, // Use $set to only update specific fields
            { new: true } // Return the newly updated document
        );

        if (!updatedMetadata) {
            return res.status(404).json({ error: true, message: "Metadata not found." });
        }

        res.status(200).json({ error: false, message: "Metadata updated successfully", data: updatedMetadata });
    } catch (error) {
        console.error("Error while updating metadata:", error);
        res.status(500).json({ error: true, message: error.message });
    }
};

// Get Metadata by ID
exports.getMetadataById = async (req, res) => {
    const { id } = req.body.data;

    try {
        const metadata = await Metadata.findById(id);
        if (!metadata ) {
            return res.status(404).json({ error: true, message: "Metadata not found ." });
        }
        res.status(200).json({ error: false, data: metadata });
    } catch (error) {
        console.error("Error while fetching metadata:", error);
        res.status(500).json({ error: true, message: error.message });
    }
};


exports.deleteMetadata = async (req, res) => {
    const { id } = req.body.data;

    try {
        const updatedMetadata = await Metadata.findByIdAndUpdate(
            id,
            { is_active: false, updated_on: Date.now(), updated_by: req.body.updated_by || "0" },
            { new: true }
        );

        if (!updatedMetadata) {
            return res.status(404).json({ error: true, message: "Metadata not found." });
        }

        res.status(200).json({ error: false, message: "Metadata deleted successfully" });
    } catch (error) {
        console.error("Error while updating metadata:", error);
        res.status(500).json({ error: true, message: error.message });
    }
};