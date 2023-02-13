const db = require('../../utils/db');
// const promise = require('bluebird');
const joi = require('joi');
const joiValidator = require('../../utils/joiValidator');

/**
 * This VehiclesValidator class contains all vehicle related API's validation. This class' functions are called from vehicles controller.
 */

class theaterValidator {

    async validateGetAllMoviesForm(body) {
        try {
            let schema = joi.object().keys({
                mov_id: joi.required(),
                page_no: joi.number().integer()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (err) {
            console.log(`there was an error ${err}`)
        }
    }

    async validatePagination(body){
        try{
            let schema = joi.object().keys({
                page: joi.number().optional(),
                pagesize: joi.number().optional()
            })
            await joiValidator.validateJoiSchema(body, schema);
        }catch (err) {
        console.log(`there was an error ${err}`)
        }
    }

    async validateGetSingleMovieForm(body) {
        try {
            let schema = joi.object().keys({
                mov_id: joi.required(),
                title: joi.string().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (err) {
            console.log(`there was an error ${err}`)
        }
    }


    async validateAddTheaterForm(body) {
        try {
            let schema = joi.object().keys({
                mov_id: joi.required(),
                title: joi.required(),
                Genere: joi.string().required(),
                type: joi.string().required(),
                cover_img: joi.required(),
                description: joi.string().required(),
                ticket: joi.required(),
                duration: joi.required(),
                rel_year: joi.required(),
                trailer_yt_link: joi.string().required(),
                Imdb: joi.required()
            })                
            await joiValidator.validateJoiSchema(body, schema);
        } catch (err) {
            console.log(`there was an error ${err}`)
        }
    }

    // async isMovieExist(body, throw_error_for_exists) {
    //     try {
    //         let sql = `SELECT * FROM movies WHERE title = '${body.title}' AND is_deleted = 0`,
    //         // where = `vehicle_number='${body.vehicle_number}' AND is_deleted = 0`,
    //         movie = await query(sql, [body.title])
    //         if (throw_error_for_exists) {
    //             if (movie.length > 0) {
    //                 throw 'MOVIE_ALREADY_EXISTS'
    //             } else {
    //                 return true
    //             }
    //         } else {
    //             if (movie.length > 0) {
    //                 if (movie[0].is_active) {
    //                     return movie[0]
    //                 } else {
    //                     throw 'MOVIE_BLOCKED'
    //                 }
    //             } else {
    //                 throw 'MOVIE_NOT_FOUND'
    //             }
    //         }
    //     } catch (error) {
    //        console.log(`there was an error ${err}`)
    //     }
    // } 

    // async isMovieExist(body, throw_error_for_exists) {
    //     try {
    //         let selectParams = '*',
    //             where = `vehicle_number='${body.vehicle_number}' AND is_deleted = 0`,
    //             vehicle = await db.select('customer_vehicle_relation', selectParams, where)
    //         if (throw_error_for_exists) {
    //             if (vehicle.length > 0) {
    //                 throw 'VEHICLE_ALREADY_EXISTS'
    //             } else {
    //                 return true
    //             }
    //         } else {
    //             if (vehicle.length > 0) {
    //                 if (vehicle[0].is_active) {
    //                     return vehicle[0]
    //                 } else {
    //                     throw 'VEHICLE_BLOCKED'
    //                 }
    //             } else {
    //                 throw 'VEHICLE_NOT_FOUND'
    //             }
    //         }
    //     } catch (error) {
    //         return promise.reject(error)
    //     }
    // } 


    async validateEditMovieForm(body) {
        try {
            let schema = joi.object().keys({
                mov_id: joi.required(),
                title: joi.string().required(),
                Genere: joi.string().required(),
                type: joi.string().required(),
                cover_img: joi.required(),
                description: joi.string().required(),
                ticket: joi.required(),
                duration: joi.required(),
                rel_year: joi.required(),
                trailer_yt_link: joi.string().required(),
                Imdb: joi.required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }


    async validateDeleteMovieRelationForm(body) {
        try {
            let schema = joi.object().keys({
                mov_id: joi.required(),
                title: joi.string().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }    
    



}

module.exports = new theaterValidator()