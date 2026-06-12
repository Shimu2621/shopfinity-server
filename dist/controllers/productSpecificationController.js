"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductSpecification = exports.updateProductSpecification = exports.getProductSpecification = exports.getSpecificationsByProductId = exports.getProductSpecifications = exports.createProductSpecificationsBulk = exports.createProductSpecification = void 0;
const productSpecificationModel_1 = require("../models/productSpecificationModel");
const productSpecification_validation_1 = require("../validations/productSpecification.validation");
const productSpecification_validation_2 = require("../validations/productSpecification.validation");
const mongoose_1 = require("mongoose");
// Create a product specification
const createProductSpecification = async (req, res) => {
    try {
        const validatedData = productSpecification_validation_1.productSpecificationSchema.parse(req.body);
        const newSpec = await productSpecificationModel_1.ProductSpecificationModel.create(validatedData);
        res.status(201).json(newSpec);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createProductSpecification = createProductSpecification;
const createProductSpecificationsBulk = async (req, res) => {
    try {
        const validatedData = productSpecification_validation_2.productSpecificationBulkSchema.parse(req.body);
        const specifications = await productSpecificationModel_1.ProductSpecificationModel.insertMany(validatedData);
        res.status(201).json({
            success: true,
            message: "Product specifications created successfully",
            data: specifications,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createProductSpecificationsBulk = createProductSpecificationsBulk;
// Get all product specifications
const getProductSpecifications = async (req, res) => {
    try {
        const specs = await productSpecificationModel_1.ProductSpecificationModel.find();
        res.status(200).json(specs);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getProductSpecifications = getProductSpecifications;
// Get product specification by productID
const getSpecificationsByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }
        const specs = await productSpecificationModel_1.ProductSpecificationModel.find({
            productId,
        });
        res.status(200).json(specs);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getSpecificationsByProductId = getSpecificationsByProductId;
// Get a single product specification by ID
const getProductSpecification = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(id))
            return res.status(400).json({ error: "Invalid ID" });
        const spec = await productSpecificationModel_1.ProductSpecificationModel.findById(id);
        if (!spec)
            return res.status(404).json({ error: "Specification not found" });
        res.status(200).json(spec);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getProductSpecification = getProductSpecification;
// Update a product specification
const updateProductSpecification = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(id))
            return res.status(400).json({ error: "Invalid ID" });
        const validatedData = productSpecification_validation_1.productSpecificationSchema.parse(req.body);
        const updatedSpec = await productSpecificationModel_1.ProductSpecificationModel.findByIdAndUpdate(id, validatedData, { new: true });
        if (!updatedSpec)
            return res.status(404).json({ error: "Specification not found" });
        res.status(200).json(updatedSpec);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateProductSpecification = updateProductSpecification;
// Delete a product specification
const deleteProductSpecification = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(id))
            return res.status(400).json({ error: "Invalid ID" });
        const deletedSpec = await productSpecificationModel_1.ProductSpecificationModel.findByIdAndDelete(id);
        if (!deletedSpec)
            return res.status(404).json({ error: "Specification not found" });
        res.status(200).json({ message: "Specification deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteProductSpecification = deleteProductSpecification;
//# sourceMappingURL=productSpecificationController.js.map