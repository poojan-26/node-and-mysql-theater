// const config = require('../../utils/config');//we use this for signup
const bcrypt = require('bcrypt');//use for encrypt password
const saltRounds = 10;//
const { v4: uuidv4 } = require('uuid');//
const jwt = require('jsonwebtoken')//
// const util = require('util');
const responseHelper = require('../../utils/responseHelper');
const codeHelper = require('../../utils/codeHelper');//
const userHelper = require('../helper/userHelper');
const userValidator = require('../validater/userValidator');
// const { query } = require('../../utils/db');
const db = require('../../utils/db');
const { query } = require('../../utils/db');
// const movieModels = require('../validater/movievalidater');
// const query = util.promisify(connection.query).bind(connection)




class Theater {
    
    async getAllUser(req, res) {
        try {
            let user = await userHelper.getUser(req.body)
            responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, user)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async getSingleuser(req, res) {
        try {
            await userValidator.validateGetSingleUserForm(req.body)
            let user = await userHelper.getSingleuser(req.body)
            responseHelper.success(res, 'GET_SINGLE_USER_SUCCESS', req.headers.language, user)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    async userPagination(req, res, body){
        try{
            const limit = 5
            const page = req.query.page
            const offset = (page - 1) * limit
            let sql = "select * from users limit "+limit+" OFFSET "+offset;
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
                responseHelper.success(res, 'GET_USER_SUCCESS', req.headers.language, { total: results.length, page_no:page, movies:results })
            })
        }catch (err){
            console.log(`there was an error ${err}`) 
                }
    }


    async deleteUser(req, res){
        try{
            let user = await userHelper.deleteUser(req.body)
            responseHelper.success(res, 'DELETE_USER_SUCCESS', req.headers.language, user)
        }catch (error){
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }



    async addUser(req, res){
        try{
            await userValidator.validateAddUserForm(req.body)
            // await userValidator.isUserExist(req.body, true)
            let user = await userHelper.insertUser(req.body)
            responseHelper.success(res, 'ADD_USER_SUCCESS', req.headers.language, user)
        }catch (error){
            console.log(error)
            responseHelper.error(res, error,req.header.language)
        }
    }

    async editUser(req, res){
        try{
            // req.body.mov_id = req.mov_id
            await userValidator.validateEditUserForm(req.body)
            // await userValidator.isUserExist(req.body, true)
            let user = await userHelper.updateUser(req.body)
            responseHelper.success(res, 'EDIT_USER_SUCCESS', req.headers.language, user)
        }catch (error){
            console.log(error)
            responseHelper.error(res, error,req.header.language)
        }
    }


    /************here is signup */

    // async signup(req, res) {
    //     try {            
    //         console.log("SignUp Req ::: ", req.body);
    //         await userValidator.validateSignupForm(req.body)                                   
    //         responseHelper.success(res, 'SIGNUP_SUCCESS', req.headers.language, { code: 1, message: 'Success', data: req.body })
    //     } catch (error) {
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }

    async signup(req, res){
        try {            
            // console.log("SignUp Req ::: ", req.body);
            // console.log("SignUp Req ::: ");

            await userValidator.validateSignupForm(req.body)
            // if(req.body.username){
            //     await userValidator.isUserWithUsernameExist(req.body, true)
            // }
            await bcrypt.hash(req.body.password, saltRounds,(err,hash)=>{
                req.body.password = hash;
                // req.body.user_id = uuidv4();
                // DB.insert("users", req.body)
                db.query(`INSERT INTO users SET ?`, req.body)
            })
            responseHelper.success(res, 'SIGNUP_SUCCESS', req.headers.language, req.body)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
/**************************here is the signin API with Token ************************************ */

    // async signin(req,res){
    //     try {
    //         await userValidator.validateSigninForm(req.body)
    //         let token,
    //             user = await userValidator.isUserExist(req.body.username, false)
    //         await userValidator.validatePassword(user.password, req.body.password)
    //         console.log("user signin ::: ", user);
    //         token = await codeHelper.getJwtToken(user.user_id, true)
    //         // await adminAuthHelper.insertToken(user.id, token)
    //         delete user.password
    //         responseHelper.success(res, 'SIGNIN_SUCCESS', req.headers.language, { user: user, auth_token: token })
    //     } catch (error) {
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }

    async signin(req,res){
        try{
            const { username,password } = req.body;
            // await userValidator.validateSigninForm(req.body)
            if ( !username || !password ){
                console.log("please provide username and password")
            }
            db.query(`SELECT * FROM users WHERE username = ? AND password =? `, [username,password], async (error, results)=>{
                console.log(results);
                // if ( !results || (await bcrypt.compare(password, results[0].password)) ) {
                //     console.log("username or password is incorrect")
                // }
                if ( results ==0 ){
                    console.log("INCORECT_PASSWORD_OR_USERNAME")
                    // throw "INCORECT_PASSWORD_OR_USERNAME"
                }
                else{
                    const id = results[0].id;
                    const token = jwt.sign({ id: id }, "my_secret_key",{
                        expiresIn:"25s"//this token is available for only 20 secound
                    });
                    // console.log("the token is:" + token);
                    responseHelper.success(res, 'USER_LOGIN', req.headers.language, token)
                }
            })
        }catch(error){
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }

    // async Token(req,res){
    //     try{
    //         // await userValidator.validateGetTokenForm(req.body)
    //         let user = await userHelper.getToken(req.body)
    //         responseHelper.success(res, 'USER_LOGIN', req.headers.language, user)
    //     }catch(error){
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }



   async Token(req,res){
       try{
    //    await userValidator.validateGetTokenForm(req.body)
       db.query(`SELECT * FROM users`, req.body)
       jwt.verify(req.token, 'my_secret_key', function (err,data){
           if (err){
               res.sendStatus(403);
           }
           responseHelper.success(res, 'USER_LOGIN', req.headers.language, data)
       })
       }catch(error){
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
       }
   }




    /************here we have signin API *************************** */

    // async signin(req, res) {
    //     try {
    //         await userValidator.validateSigninForm(req.body)
    //         let token,
    //             user = await userValidator.isUserExist(req.body, false)
    //         await userValidator.validatePassword(user.password, req.body.password)
    //         if (user.is_verified) {
    //             token = await codeHelper.getJwtToken(user.user_id, config.user_status)
    //         } 
    //         // else {
    //         //     let otp = await codeHelper.getOTP()
    //         //     otp = '1234'   // this is only for testing purpose
    //         //     await userAuthHelper.updateOTP(user.customer_id, otp)
    //         //     let phone_number = req.body.country_code.substring(1) + req.body.phone_number
    //         //     smsHelper.sendSMS(phone_number, messages[req.headers.language]['VERIFICATION_OTP'].replace('@@OTP@@', otp))
    //         // }
    //         // delete user.password
    //         // delete user.otp
    //         // await userAuthHelper.addOrUpdateUserDeviceRelation(user, req.headers)
    //         responseHelper.success(res, 'SIGNIN_SUCCESS', req.headers.language, user, { auth_token: token })
    //     } catch (error) {
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }


    

    // async signin(req,res){
    //     try{
    //         await userValidater.validateSigninForm(req.body)
    //         let token,
    //         user = await userValidater.validatepassword(user.password, req.body.password)
    //         if (user.is_verified){
    //             token = await 
    //         }

    //     }catch{

    //     }
    // }

    // async AuthUser(req,res){
    //     try{
    //     await userValidator.validateSigninForm(req.body)
    //     let user =await userHelper.signin(req.body)
    //     responseHelper.success(res, 'SIGNIN_SUCCESS', req.headers.language, user)
    // }catch (error){
    //     console.log(error)
    //         responseHelper.error(res, error,req.header.language)
    // }
    
    // }




    // async addUser(req, res) {
    //     try {
    //         console.log("===========", req.body)
    //         // req.body.mov_id = req.mov_id
    //         // await userValidator.validateAddUserForm(req.body)
    //         // await userValidator.isUserExist(req.body, true)
    //         // if (req.file) {
    //         //     req.body.cover_img = await upload.single("theater_db/movies/", req.file)
    //         // }
    //         await userHelper.insertUser(req.body)
    //         responseHelper.success(res, 'ADD_USER_SUCCESS', req.headers.language)
    //     } catch (error) {
    //         console.log(error)
    //         responseHelper.error(res, error, req.headers.language)
    //     }
    // }



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
