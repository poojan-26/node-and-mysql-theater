const db = require('../../utils/db');
const promise = require('bluebird');
const joi = require('joi');
const joiValidator = require('../../utils/joiValidator');

/**
 * This VehiclesValidator class contains all vehicle related API's validation. This class' functions are called from vehicles controller.
 */

class theaterValidator {


    async validateGetSingletheatermovForm(body) {
        try {
            let schema = joi.object().keys({
                theater_id: joi.required(),
                name: joi.string().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }


    async validateAddtheatermovForm(body) {
        try {
            let schema = joi.object().keys({
                theater_id: joi.required(),
                name: joi.string().required(),
                seat: joi.string().required()
            })                
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }


    async validateEditUserForm(body) {
        try {
            let schema = joi.object().keys({
                theater_id: joi.required(),
                name: joi.required(),
                seat: joi.required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }

    // async isUserExist(body, throw_error_for_exists) {
    //     try {
    //         let sql = `SELECT * FROM users WHERE username = '${body.username}' AND is_deleted = 0`,
    //         // where = `vehicle_number='${body.vehicle_number}' AND is_deleted = 0`,
    //         user = await query(sql, [body.username])
    //         if (throw_error_for_exists) {
    //             if (user.length > 0) {
    //                 throw 'USER_ALREADY_EXISTS'
    //             } else {
    //                 return true
    //             }
    //         } else {
    //             if (user.length > 0) {
    //                 if (user[0].is_active) {
    //                     return user[0]
    //                 } else {
    //                     throw 'USER_BLOCKED'
    //                 }
    //             } else {
    //                 throw 'USER_NOT_FOUND'
    //             }
    //         }
    //     } catch (error) {
    //        console.log(`there was an error ${err}`)
    //     }
    // } 






    async validateDeleteUserRelationForm(body) {
        try {
            let schema = joi.object().keys({
                user_id: joi.required(),
                name: joi.string().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }    
    



}

module.exports = new theaterValidator()