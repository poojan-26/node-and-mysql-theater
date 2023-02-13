const express = require('express');
const router = express.Router();

const movieData = require('../api/v1/controllers/Theater.controllers');
const bookData = require('../api/v1/controllers/booking.controllers');
const userData = require('../api/v1/controllers/user.controllers');
const theaterData = require('../api/v1/controllers/movTheater.controllers');


// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null,'uploads/')
//     },
//     filename: function(req, file, cb){
//         cb(null, Date.now() + "--" +file.originalname)
//     } 
// })

// const upload = multer({storage: storage})


// const HeaderValidator = require("../api/utils/headersValidator");

//here we use all movie related API
//get all movie data
router.get('/gatmovies', movieData.getAllMovies);

//get all movie with pagination
router.get('/getMoviepagination', movieData.moviePagination);//

//get movie by id
router.get('/movieByID', movieData.getSingleMovie);
//create (insert) new movie data
// router.post('/insertMovie', movieData.addMovie);

//create (insert) new movie data
router.post('/insertMovie', movieData.addMovie);
//update movie
router.put('/updateMovie', movieData.editMovie);
//delete movie
router.delete('/deleteMovieByID', movieData.deleteMovie);


//here we use all booking related API
//get all booking data
router.get('/gatBooking', bookData.getAllBook);
// //get booking data by id
router.get('/bookByID', bookData.getSingleBook);
//create (insert) new booking data
router.post('/insertBooking', bookData.addBook);
//update booking data
router.put('/updateBooking', bookData.editBook);
//delete booking
router.delete('/deleteBookingByID', bookData.deleteBook);

//get all Booking with pagination
router.get('/getMoviepagination', bookData.bookPagination);//

//here we use all theater related API
//pagination theater
router.get('/getAllTheater',theaterData.getalltheaterpage);
//get all theater data
router.get('/gatTheaters', theaterData.getAllTheater);



//get booking theater by id
router.get('/theaterByID', theaterData.getSingletheater);
//create (insert) new theater data
router.post('/insertTheater', theaterData.addTheater);
//update theater data
router.put('/updateTheater', theaterData.editTheater);
//delete theater
router.delete('/deleteTheaterByID', theaterData.deleteTheater);

//get all Booking with pagination
router.get('/getTheaterpagination', theaterData.theaterPagination);//



//here we use all user related API
/**** 
//signin api
router.post('/signinUser', userData.AuthUser);
*/

//get all user data
router.get('/gatUsers', userData.getAllUser);
// //get user data by id
router.get('/userByID', userData.getSingleuser);
//create (insert) new user data
router.post('/insertUser', userData.addUser);


//get all user with pagination
router.get('/getUserpagination', userData.userPagination);//

//signup API insert data
router.post('/signup', userData.signup);//

//signin API generate token
router.post('/signin', userData.signin)//

//get data using token
router.get('/api/protected',ensureToken ,userData.Token)//



function ensureToken(req,res, next){
    try{
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        }else {
            res.sendStatus(403);
        }
    }catch(error){
        console.log(error)
        responseHelper.error(res, error, req.headers.language)
    }
   }


//update user data
router.put('/updateUser', userData.editUser);
//delete user data
router.delete('/deleteUserByID', userData.deleteUser);

module.exports = router;