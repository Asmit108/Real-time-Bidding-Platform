const itemService = require('../services/item.service');
const { ValidationError, AuthenticationError, AuthorizationError, NotFoundError } = require('../errors');

const getItems = async (req, res) => {
    try {
        const { search, status, page, limit } = req.query;
        const result = await itemService.getAllItems({ search, status, page, limit });
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ error: error.message });
        } else if (error instanceof AuthenticationError) {

            return res.status(401).json({ error: error.message });
        } else if (error instanceof AuthorizationError) {

            return res.status(403).json({ error: error.message });
        } else if (error instanceof NotFoundError) {

            return res.status(404).json({ error: error.message });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
};

const getItemById = async (req, res) => {
    try {
        const item = await itemService.getItemById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        return res.status(200).json(item);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ error: error.message });
        } else if (error instanceof AuthenticationError) {

            return res.status(401).json({ error: error.message });
        } else if (error instanceof AuthorizationError) {

            return res.status(403).json({ error: error.message });
        } else if (error instanceof NotFoundError) {

            return res.status(404).json({ error: error.message });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
};

const createItem = async (req, res) => {
    try {
        const item = await itemService.createItem(req.body);
        return res.status(201).json(item);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ error: error.message });
        } else if (error instanceof AuthenticationError) {

            return res.status(401).json({ error: error.message });
        } else if (error instanceof AuthorizationError) {

            return res.status(403).json({ error: error.message });
        } else if (error instanceof NotFoundError) {

            return res.status(404).json({ error: error.message });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
};

const updateItem = async (req, res) => {
    try {
        const item = await itemService.updateItem(req.params.id, req.body);
        return res.status(200).json(item);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ error: error.message });
        } else if (error instanceof AuthenticationError) {

            return res.status(401).json({ error: error.message });
        } else if (error instanceof AuthorizationError) {

            return res.status(403).json({ error: error.message });
        } else if (error instanceof NotFoundError) {

            return res.status(404).json({ error: error.message });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
};

const deleteItem = async (req, res) => {
    try {
        await itemService.deleteItem(req.params.id);
        return res.status(204).json();
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ error: error.message });
        } else if (error instanceof AuthenticationError) {

            return res.status(401).json({ error: error.message });
        } else if (error instanceof AuthorizationError) {

            return res.status(403).json({ error: error.message });
        } else if (error instanceof NotFoundError) {

            return res.status(404).json({ error: error.message });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = { getItems, getItemById, createItem, updateItem, deleteItem };
