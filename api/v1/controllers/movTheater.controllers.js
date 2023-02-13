const config = require('../../utils/config');
// const util = require('util');
const responseHelper = require('../../utils/responseHelper');
// const codeHelper = require('../../utils/codeHelper');
const theatermovHelper = require('../helper/theatermovHelper');
const theatermovValidator = require('../validater/theatermovValidator');
const db = require('../../utils/db');
// const movieModels = require('../validater/movievalidater');
// const query = util.promisify(connection.query).bind(connection)




class Theater {
    
    async getAllTheater(req, res) {
        try {
            let theater = await theatermovHelper.getTheater(req.body)
            responseHelper.success(res, 'GET_THEATER_SUCCESS', req.headers.language, theater)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async getSingletheater(req, res) {
        try {
            // await theaterValidator.validateGetSingleMovieForm(req.body)
            let theater = await theatermovHelper.getSingletheater(req.body)
            responseHelper.success(res, 'GET_SINGLE_THEATER_SUCCESS', req.headers.language, theater)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }


    async theaterPagination(req, res, body){
        try{
            const limit = 5
            const page = req.query.page
            const offset = (page - 1) * limit
            let sql = "select * from theater limit "+limit+" OFFSET "+offset;
            console.log(sql);
            db.query(sql, function(error, results, fields){
                if (error)
                    throw error;
                // var jsonResult = {
                //     'Movie_page_count':results.length,
                //     'Page_number':page,
                //     'Movies':results
                // }
                // var myJsonString = JSON.parse(JSON.stringify(jsonResult));
                // res.statusMessage = "Products for page "+page;
                // res.statusCode = 200;
                // res.json(myJsonString);
                // res.end();
                // responseHelper.success(res,"GET_MOVIE_SUCCESS",req.headers.language, {'Movie_page_count':results.length, 'Page_number':page,'Movies':results});
                responseHelper.success(res, 'GET_THEATER_SUCCESS', req.headers.language, { total: results.length, page_no:page, movies:results })
            })
        }catch (err){
            console.log(`there was an error ${err}`) 
                }
    }


    async deleteTheater(req, res){
        try{
            let theater = await theatermovHelper.deleteTheater(req.body)
            responseHelper.success(res, 'DELETE_THEATER_SUCCESS', req.headers.language, theater)
        }catch (error){
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async addTheater(req, res){
        try{
            await theatermovValidator.validateAddtheatermovForm(req.body)
            // await userValidator.isUserExist(req.body, true)
            let user = await theatermovHelper.insertTheater(req.body)
            responseHelper.success(res, 'ADD_THEATER_SUCCESS', req.headers.language, user)
        }catch (error){
            console.log(error)
            responseHelper.error(res, error,req.header.language)
        }
    }


    async editTheater(req, res){
        try{
            // req.body.mov_id = req.mov_id
            await theatermovValidator.validateEditUserForm(req.body)
            // await userValidator.isUserExist(req.body, true)
            let theater = await theatermovHelper.updateTheater(req.body)
            responseHelper.success(res, 'EDIT_THEATER_SUCCESS', req.headers.language, theater)
        }catch (error){
            console.log(error)
            responseHelper.error(res, error,req.header.language)
        }
    }

    async getalltheaterpage(req,res){
        try {
            let theater = await theatermovHelper.getTheater(req.body)
            responseHelper.success(res, 'GET_THEATER_SUCCESS', req.headers.language, theater)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }


    /***** 
    async getalltheaterpage(req, res) {
        try {
            // await vehiclesValidator.validateGetAllVehiclesForm(req.body)
            let theater = await theatermovHelper.getalltheaterpage(req.body, req.theater_id, req.headers.language)
            responseHelper.success(res, 'GET_ALL_VEHICLES_SUCCESS', req.headers.language, { total: Number(theater.theatersCount), total_page: Math.ceil(theater.theatersCount / config.paginationCount), theater: theater.theater })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }  
*/




    // async addTheater(req, res){
    //         try{
    //             await theatermovValidator.validateAddtheatermovForm(req.body)
    //             // await userValidator.isUserExist(req.body, true)
    //             let theater = await theatermovHelper.insertTheater(req.body)
    //             responseHelper.success(res, 'ADD_THEATER_SUCCESS', req.headers.language, theater)
    //         }catch (error){
    //             console.log(error)
    //             responseHelper.error(res, error,req.header.language)
    //         }
    //     }


    // async getSingleMovie(req, res) {
    //     try {
    //         // await theaterValidator.validateGetSingleMovieForm(req.body)
    //         let movie = await theaterHelper.getSingleMovie(req.body.id)
    //         responseHelper.success(res, 'GET_SINGLE_MOVIE_SUCCESS', req.headers.language, movie)
    //     } catch (error) {
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }




    // async addMovie(req, res) {
    //     try {
    //         console.log("===========", req.body)
    //         req.body.mov_id = req.mov_id
    //         await theaterValidator.validateAddMovieForm(req.body) 
    //         await theaterValidator.isMovieExist(req.body, true)
    //         if (req.file) {
    //             req.body.cover_img = await S3helper.uploadImageOnS3("theater_db/movies/", req.file)
    //         }
    //         await theaterHelper.InsertMovie(req.body)
    //         responseHelper.success(res, 'ADD_VEHICLE_SUCCESS', req.headers.language)
    //     } catch (error) {
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }


    // async editMovie(req, res) {
    //     try {
    //         req.body.mov_id = req.mov_id
    //         await theaterValidator.validateEditMovieForm(req.body)
    //         let movie = await theaterHelper.getMovie(req.body.id)
    //         if (req.file) {
    //             req.body.cover_img = await S3helper.uploadImageOnS3("theater_db/movies/", req.file)
    //             if (movie.cover_img != null || movie.profile_picture != '') {
    //                 S3helper.deleteImageFromS3(movie.profile_picture)
    //             }
    //         }
    //         movie = await theaterHelper.updateMovie(req.body, movie)
    //         responseHelper.success(res, 'EDIT_MOVIE_SUCCESS', req.headers.language, movie)
    //     } catch (error) {
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }

    // async deleteMovie(req, res) {
    //     try {
    //         await theaterValidator.validateDeleteMovieRelationForm(req.body)
    //         await theaterHelper.deleteMovie(req.body)
    //         responseHelper.success(res, 'DELETE_MOVIE_SUCCESS', req.headers.language)
    //     } catch (error) {
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }




}


module.exports = new Theater()







// async function getAllMovies(req,res){
//     // console.log('here all movies list');
//     // movieModels.getAllMovies((data,error)=>{
//         // res.json({message: "here we get all movie data"})
//         try{
//             let sql = `SELECT * FROM movies`
//             const rows = await query(sql)
//             res.json(rows)
//         }catch(err) {
//             console.log(`there was an error ${err}`)
//         }
//     }

// async function getMovieByID(req,res){
//     const { id } = req.params
//     console.log(`mov id:${id}`)
//     try{
//         let sql = `SELECT * FROM movies WHERE mov_id= ${connection.escape(id)}`
//         const rows = await query(sql)
//         res.json(rows)
//     }catch(err){
//         console.log(`there was an error ${err}`)
//     }
// }

// async function createNewMovie(req,res){
//     const {title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb} = req.body
//     try{
//         let sql = `INSERT INTO movies (title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb) values (${connection.escape(title)},${connection.escape(Genere)},${connection.escape(type)},${connection.escape(cover_img)},${connection.escape(description)},${connection.escape(ticket)},${connection.escape(duration)},${connection.escape(rel_year)},${connection.escape(trailer_yt_link)},${connection.escape(Imdb)})`
//         const rows = await query(sql)
//         res.json({message:'movie inserted....!'})
//     }catch(err){
//         console.log(`there was an error ${err}`)
//     }
// }

// async function updateMovie(req,res){
//     const { id } = req.params
//     const {title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb} = req.body
//     try{
//         let sql = `UPDATE movies SET title = ${connection.escape(title)},Genere = ${connection.escape(Genere)},type = ${connection.escape(type)},cover_img = ${connection.escape(cover_img)},description = ${connection.escape(description)},ticket = ${connection.escape(ticket)},duration = ${connection.escape(duration)},rel_year = ${connection.escape(rel_year)},trailer_yt_link = ${connection.escape(trailer_yt_link)},Imdb = ${connection.escape(Imdb)} WHERE mov_id = ${connection.escape(id)}`
//         const rows = await query(sql)
//         res.json({message:'movie updated.........!'})
//     }catch(err){
//         console.log(`there was an error ${err}`)
//     }
// }

// async function removeMovie(req,res){
//     const { id } = req.params
//     try{
//         let sql = `DELETE FROM movies WHERE mov_id = ${connection.escape(id)}`
//         const rows = await query (sql)
//         res.json({message:'movie Deleted.......!'})
//     }catch(err){
//         console.log(`there was an error ${err}`)
//     }
// }

// // function getMovieByID(req,res) {
// //     console.log("mov_id",req.params)
// //     const { id } = req.params
// //     movieModels.getMovieByID(id,(data,error)=>{
// //         res.json(data)
// //     })
// // }

// // function createNewMovie(req,res) {
// //     const {title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb} = req.body
// //     console.log(`Movies : ${title}, ${Genere}, ${type}, ${cover_img}, ${description}, ${ticket}, ${duration}, ${rel_year}, ${trailer_yt_link}, ${Imdb},`);
// //     movieModels.createNewMovie({title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb}, (data,error)=>{
// //         res.json(data)
// //     })
// // }

// // function updateMovie(req,res) {
// //     const { mov_id } = req.params
// //     const { title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb } = req.body
// //     movieModels.updateMovie({mov_id,title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb}, (data,error)=>{
// //         res.json(data) 
// //     })
// // }

// // function removeMovie(req,res) {

// //     const {id} = req.params
// //     movieModels.removeMovie(id, (data,error)=>{
// //         res.json(data)
// //     })
// // }

// module.exports = {
//     getAllMovies,
//     getMovieByID,
//     createNewMovie,
//     updateMovie,
//     removeMovie
// }
