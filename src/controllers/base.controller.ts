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
        res.status(201).json({
            message: 'success',
            data: result
        
        });
        } catch (error) {
        res.status(500).json({error: error.message});
        }
    }
    
    public get = async (req: any, res: any) => {
        const {page, limit, sort, order} = req.query;
        //default value
        const p = page ? parseInt(page) : 1;
        const l = limit ? parseInt(limit) : 10;
        const s = sort ? sort : '_id';
        const o = order ? parseInt(order) : 1;
        try {
            const result = await this.service.get(p, l, s, o)
            res.status(200).json({
                message: 'success',
                data: result.data,
                total: result.total,
                page: p,
                limit: l
            });
        } catch (error) {
            res.status(500).json({message : 'error' ,error: error.message});
        }
    }
    
    public getById = async (req: any, res: any) => {
        try {
        const {id} = req.params;
        const result = await this.service.getById(id);
        if (!result) {
            res.status(404).json({message : 'error' ,error: 'Not found'});
        } else {
            res.status(200).json({
                message: 'success',
                data: result
            
            });
        }
        } catch (error) {
        res.status(500).json({message : 'error' ,error: error.message});
        }
    }

    public getByArrayIds = async (req: any, res: any) => {
        try {
        const {ids} = req.body;
        const result = await this.service.getByArrayIds(ids);
        if (!result) {
            res.status(404).json({message : 'error' ,error: 'Not found'});
        } else {
            res.status(200).json({
                message: 'success',
                data: result
            
            });
        }
        } catch (error) {
        res.status(500).json({message : 'error' ,error: error.message});
        }
    }
    
    public update = async (req: any, res: any) => {
        try {
        const {id} = req.params;
        const data = req.body;
        const result = await this.service.update(id, data);
        if (!result) {
            res.status(404).json({message : 'error' ,error: 'Not found'});
        } else {
            res.status(200).json({
                message: 'success',
                data: result
            
            });
        }
        } catch (error) {
        res.status(500).json({message : 'error' ,error: error.message});
        }
    }
    
    public delete = async (req: any, res: any) => {
        try {
        const {id} = req.params;
        const result = await this.service.delete(id);
        if (!result) {
            res.status(404).json({message : 'error' ,error: 'Not found'});
        } else {
            res.status(200).json({
                message: 'success',
                data: result
            
            });
        }
        } catch (error) {
        res.status(500).json({message : 'error' ,error: error.message});
        }
    }
    }
