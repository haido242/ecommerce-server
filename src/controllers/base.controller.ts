import {request, response} from 'express';
import BaseService from 'services/base.service';

export default class BaseController {
    protected service: BaseService;
    
    constructor(service: BaseService) {
        this.service = service;
    }
    
    public create = async (req: any, res: any) => {
        try {
        const data = req.body;
        const result = await this.service.create(data);
        res.status(201).json(result);
        } catch (error) {
        res.status(500).json({error: error.message});
        }
    }
    
    public get = async (req: any, res: any) => {
        try {
        const result = await this.service.get();
        res.status(200).json(result);
        } catch (error) {
        res.status(500).json({error: error.message});
        }
    }
    
    public getById = async (req: any, res: any) => {
        try {
        const {id} = req.params;
        const result = await this.service.getById(id);
        if (!result) {
            res.status(404).json({error: 'Not found'});
        } else {
            res.status(200).json(result);
        }
        } catch (error) {
        res.status(500).json({error: error.message});
        }
    }
    
    public update = async (req: any, res: any) => {
        try {
        const {id} = req.params;
        const data = req.body;
        const result = await this.service.update(id, data);
        if (!result) {
            res.status(404).json({error: 'Not found'});
        } else {
            res.status(200).json(result);
        }
        } catch (error) {
        res.status(500).json({error: error.message});
        }
    }
    
    public delete = async (req: any, res: any) => {
        try {
        const {id} = req.params;
        const result = await this.service.delete(id);
        if (!result) {
            res.status(404).json({error: 'Not found'});
        } else {
            res.status(200).json(result);
        }
        } catch (error) {
        res.status(500).json({error: error.message});
        }
    }
    }
