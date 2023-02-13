const db = require('../../utils/db');
const promise = require('bluebird');
const joi = require('joi');
const util = require('util');//
const query = util.promisify(db.query).bind(db)//
const joiValidator = require('../../utils/joiValidator');

/**
 * This VehiclesValidator class contains all vehicle related API's validation. This class' functions are called from vehicles controller.
 */

class theaterValidator {


    async validateGetSingleUserForm(body) {
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


    async validateAddUserForm(body) {
        try {
            let schema = joi.object().keys({
                user_id: joi.required(),
                name: joi.string().required(),
                username: joi.string().required(),
                // password: joi.string().required(),
                // password: joi.string().min(3).max(15).required(),
                // password:joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
                password: joi.string().regex(/^[a-zA-Z0-9!@#$%&*]{3,25}$/).required(),
                status: joi.required()
            })                
            await joiValidator.validateJoiSchema(body, schema);
        } catch (err) {
            console.log(`there was an error ${err}`)
        }
    }


    async validateEditUserForm(body) {
        try {
            let schema = joi.object().keys({
                 user_id: joi.required(),
                name: joi.required(),
                username: joi.required(),
                password: joi.required(),
                status: joi.required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (err) {
            console.log(`there was an error ${err}`)
        }
    }

    async validateSignupForm(body) {
        try {
            let schema = joi.object().keys({
                name: joi.required(),
                username: joi.required(),
                password: joi.required(),
                status: joi.required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (err) {
            console.log(`there was an error ${err}`)
        }
    }



    async isUserWithUsernameExist(body, throw_error_for_exists) {
        try {
                let sql = `SELECT * FROM users WHERE username = ?`;
                console.log(sql);
               const user = await query(sql, [body.username])
            if (throw_error_for_exists) {
                if (user.length > 0) {
                    throw 'USER_WITH_USERNAME_ALREADY_EXISTS'
                } else {
                    return true
                }
            }
        } catch (err) {
            console.log(`there was an error ${err}`)
        }
    }





    async validateSigninForm(body) {
        try {
            let schema = joi.object().keys({
                username: joi.required(),
                password: joi.required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (err) {
            console.log(`there was an error ${err}`)
        }
    }

    /*********here is signup */
    async validateSignupForm(body) {
        try {
            let schema = joi.object().keys({
                name: joi.required(),
                username: joi.required(),
                password: joi.required(),
                status: joi.string().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }

    // async isUserExist(username, throw_error_for_exists){
    //     try{
    //         let sql = `SELECT * FROM users WHERE username=?`;
    //         let data = {
    //             username = body.username,
    //         }
    //         console.log(sql);
    //         user = await query(sql,data)
    //         if (throw_error_for_exists) {
    //             if (user.length > 0) {
    //                 throw 'USER_WITH_USERNAME_ALREADY_EXISTS'
    //             } else {
    //                 return true
    //             }
    //         } else {
    //             if (user.length > 0) {
    //                 return user[0]
    //             } else {
    //                 throw 'USER_WITH_USERNAME_NOT_FOUND'
    //             }
    //         }
    //     } catch (error) {
    //         return promise.reject(error)
    //     }
    // }

    // async isUserExist(body, throw_error_for_exists) {
    //     try {
    //         let sql = `SELECT * FROM users WHERE username = '${body.username}' AND password='${body.password}'`;
    //         console.log(sql)
    //         // where = `vehicle_number='${body.vehicle_number}' AND is_deleted = 0`,
    //         user = await query(sql, [body])
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
    //        console.log(`there was an error ${error}`)
    //     }
    // } 


    async validatePassword(db_password, body_password) {
        try {
            if (db_password != body_password) {
                throw 'INCORRECT_PASSWORD'
            }
            return true
        } catch (error) {
            console.log(`there was an error ${error}`)
        }
    }

//    async  validateGetTokenForm(body){
//        try{

//        }
//    }



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