const db = require('../../utils/db');
const promise = require('bluebird');
const joi = require('joi');
const joiValidator = require('../../utils/joiValidator');

/**
 * This VehiclesValidator class contains all vehicle related API's validation. This class' functions are called from vehicles controller.
 */

class theaterValidator {


    async validateGetSingleBookForm(body) {
        try {
            let schema = joi.object().keys({
                book_id: joi.required(),
                mov_id: joi.string().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }


    async validateAddBookForm(body) {
        try {
            let schema = joi.object().keys({
                book_id: joi.required(),
                mov_id: joi.required(),
                lastname: joi.string().required(),
                firstname: joi.string().required(),
                contact_no: joi.required(),
                qty: joi.required(),
                date: joi.required(),
                time: joi.required()
            })                
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }


    async validateEditBookForm(body) {
        try {
            let schema = joi.object().keys({
                book_id: joi.required(),
                mov_id: joi.required(),
                lastname: joi.string().required(),
                firstname: joi.string().required(),
                contact_no: joi.required(),
                qty: joi.required(),
                date: joi.required(),
                time: joi.required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }


    async validateDeleteMovieRelationForm(body) {
        try {
            let schema = joi.object().keys({
                book_id: joi.required(),
                mov_id: joi.required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }    
    



}

module.exports = new theaterValidator()