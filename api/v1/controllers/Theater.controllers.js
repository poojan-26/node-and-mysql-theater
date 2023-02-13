const config = require('../../utils/config');
// const multer = require('multer');
// const path = require('path');
const S3helper = require('../../utils/S3helper');
// const util = require('util');

const db = require('../../utils/db');//
// const util = require('util');//
const responseHelper = require('../../utils/responseHelper');
// const codeHelper = require('../../utils/codeHelper');
const theaterHelper = require('../helper/theaterHelper');
const theaterValidator = require('../validater/theaterValidator');
// const movieModels = require('../validater/movievalidater');
//  const query = util.promisify(db.query).bind(db)





class Theater {
    
    async getAllMovies(req, res) {
        try {
            let movie = await theaterHelper.getMovie(req.body)
            responseHelper.success(res, 'GET_MOVIE_SUCCESS', req.headers.language, movie)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

        async moviePagination(req,res){
            try{
                // console.log("length :::", req.body);
                await theaterValidator.validatePagination(req.body);
                let movie = await theaterHelper.getMoviebypage(req.body);
                responseHelper.success(res,"GET_MOVIE_SUCCESS",req.headers.language, movie);
            }catch(error){
                console.log(error)
                responseHelper.error(res, error, req.headers.language);
            }
        }

    // async moviePagination(req, res){
    //     try{
    //         const { page=1, limit = 10 } = req.query;
    //         const movies = await find()
    //         .limit(limit * 1)
    //         .skip((page - 1) * limit);
    //         responseHelper.success(res,"GET_MOVIE_SUCCESS",req.headers.language, movies);
    //     }catch (err){
    //         console.log(`there was an error ${err}`) 
    //     }
    // }


    async moviePagination(req, res, body){
        try{
            const limit = 5
            const page = req.query.page
            const offset = (page - 1) * limit
            let sql = "select * from movies limit "+limit+" OFFSET "+offset;
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
                responseHelper.success(res, 'GET_MOVIE_SUCCESS', req.headers.language, { total: results.length, page_no:page, movies:results })
            })
        }catch (err){
            console.log(`there was an error ${err}`) 
                }
    }



    /**************************this is the code for pagination using MYSQL************************************************
     async getMoviebypage(req,res, body){
        try{
            const limit = 5
            const page = req.query.page
            const offset = (page - 1) * limit
            let sql = "select * from movies limit "+limit+" OFFSET "+offset;
            console.log(sql);
            // const movie = await query(sql,[body])
            db.query(sql, function(error, results, fields){
                if (error)
                    throw error;
                   var jsonResult = {
                    'Movie_page_count':results.length,
                    'Page_number':page,
                    'Movies':results
                   }
                var myJsonString = JSON.parse(JSON.stringify(jsonResult));
                res.statusMessage = "Movie for page"+page;
                res.statusCode = 200;
                res.json(myJsonString);
                res.end();
                })
        }catch (err){
            console.log(`there was an error ${err}`) 
        }
    }

     */
    
    
    
    
    // async moviePagination(req,res){
    //     try{
    //         // console.log("length :::", req.body);
    //         await theaterValidator.validatePagination(req.body);
    //         let movie = await theaterHelper.getMoviebypage(req.body);
    //         responseHelper.success(res,"GET_MOVIE_SUCCESS",req.headers.language, movie);
    //     }catch(error){
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language);
    //     }
    // }


    // async moviePagination(req,res){
    //     try{
    //         let page = parseInt(req.query.page);
    //         let limit = parseInt(req.query.limit);

    //         const offset = page ? page * limit : 0;
    //         findAndCountAll({ limit: limit, offset:offset })
    //         .then(data => {
    //             const totalPages = Math.ceil(data.count / limit);
    //             const response = {
    //                 message : " pagination is completed ...query parameters: page = " + page + ", limit = " +limit,
    //                 data:{
    //                     "totalItems": data.count,
    //                     "totalPages": totalPages,
    //                     "limit": limit,
    //                     "currentPageNumber": page + 1,
    //                     "currentPageSize": data.rows.length,
    //                     "customers": data.rows
    //                 }
    //             };
    //             res.send(response); 
    //         });
    //     }catch (error) {
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }


//    async moviePagination(req, res){
//        try{
//         await theaterValidator.validatePagination(req.body)
//         let movies = await theaterHelper.getMoviebypage(req.body) 
//         responseHelper.success(res, 'GET_ALL_VEHICLES_SUCCESS', req.headers.language, { total: Number(movies.moviesCount), total_page: Math.ceil(movies.moviesCount / config.paginationCount), movies: movies.movies })
//             console.log(error)
//             responseHelper.error(res, error, req.headers.language)
//        }catch{

//        }
//    }


    async getSingleMovie(req, res) {
        try {
            // await theaterValidator.validateGetSingleMovieForm(req.body)
            let movie = await theaterHelper.getSingleMovie(req.body)
            responseHelper.success(res, 'GET_SINGLE_MOVIE_SUCCESS', req.headers.language, movie)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async deleteMovie(req, res){
        try{
            let movie = await theaterHelper.deleteMovie(req.body)
            responseHelper.success(res, 'DELETE_MOVIE_SUCCESS', req.headers.language, movie)
        }catch (error){
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }


     async addMovie(req, res){
        try{
            await theaterValidator.validateAddTheaterForm(req.body)
            let movie = await theaterHelper.insertMovie(req.body)
            responseHelper.success(res, 'ADD_MOVIE_SUCCESS', req.headers.language, movie)  
        }catch (error){
            console.log(error)
            responseHelper.error(res, error,req.header.language)
        }
    }

    async editMovie(req, res){
        try{
            // req.body.mov_id = req.mov_id
            await theaterValidator.validateEditMovieForm(req.body)
            // await userValidator.isUserExist(req.body, true)
            let movie = await theaterHelper.updateMovie(req.body)
            responseHelper.success(res, 'EDIT_MOVIE_SUCCESS', req.headers.language, movie)
        }catch (error){
            console.log(error)
            responseHelper.error(res, error,req.header.language)
        }
    }



    // async editMovie(req, res) {
    //         try {
    //             req.body.mov_id = req.mov_id
    //             await theaterValidator.validateEditMovieForm(req.body)
    //             let movie = await theaterHelper.getMovie(req.body.id)
    //             if (req.file) {
    //                 req.body.cover_img = await S3helper.uploadImageOnS3("theater_db/movies/", req.file)
    //                 if (movie.cover_img != null || movie.profile_picture != '') {
    //                     S3helper.deleteImageFromS3(movie.profile_picture)
    //                 }
    //             }
    //             movie = await theaterHelper.updateMovie(req.body, movie)
    //             responseHelper.success(res, 'EDIT_MOVIE_SUCCESS', req.headers.language, movie)
    //         } catch (error) {
    //             console.log(error)
    //             responseHelper.error(res, error, req.headers.language)
    //         }
    //     }
    




    // async addMovie(req, res) {
    //     try {
    //         console.log("===========", req.body)
    //         // req.body.mov_id = req.mov_id
    //         await theaterValidator.validateAddMovieForm(req.body)
    //         // await theaterValidator.isMovieExist(req.body, true)
    //         // if (req.file) {
    //         //     req.body.cover_img = await upload.single("theater_db/movies/", req.file)
    //         // }
    //         await theaterHelper.insertMovie(req.body)
    //         responseHelper.success(res, 'ADD_MOVIE_SUCCESS', req.headers.language)
    //     } catch (error) {
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }






    // async addMovie(req, res){
    //     try{
    //         let movie = await theaterHelper.InsertMovie(req.body)
    //         responseHelper.success(res, 'ADD_MOVIE_SUCCESS', req.headers.language, movie)
    //     }catch (error){
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }


    // async addMovie(req, res) {
    //     try {
    //         let movie = await theaterHelper.InsertMovie(req.body)
    //         responseHelper.success(res, 'ADD_MOVIE_SUCCESS', req.headers.language, movie)
    //         // console.log("===========", req.body)
    //         // req.body.mov_id = req.mov_id
    //         // await theaterValidator.validateAddMovieForm(req.body) 
    //         // await theaterValidator.isMovieExist(req.body, true)
    //         // if (req.file) {
    //         //     req.body.cover_img = await S3helper.upload("theater_db/movies/", req.file)
    //         // }
           
    //     } catch (error) {
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }



    // async getAllMovies(req, res) {
    //     try {
    //         // await theaterValidator.validateGetAllMoviesForm(req.body)
    //         let movies = await theaterHelper.getMovie(req.body, req.mov_id, req.headers.language)
    //         responseHelper.success(res, 'GET_MOVIE_SUCCESS', req.headers.language, { total: Number(movies.moviesCount), total_page: Math.ceil(movies.moviesCount / config.paginationCount), movies: movies.movies })
    //     } catch (error) {
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }

   


   

    // 
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
