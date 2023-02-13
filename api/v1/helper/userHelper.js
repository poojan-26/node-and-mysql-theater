const promise = require('bluebird');
// const dateHelper = require('../../utils/dateHelper');
// const codeHelper = require('../../utils/codeHelper');
const { v4: uuidv4 } = require('uuid');//
const jwt = require('jsonwebtoken')//
const db = require('../../utils/db');
const util = require('util');
const connection = require('../../utils/config');
const { JsonWebTokenError } = require('jsonwebtoken');
const query = util.promisify(db.query).bind(db)
// const query = util.promisify(connection.query).bind(connection);


/**
 * This theaterHelper class contains all movies related API's logic and required database operations. This class' functions are called from userAuth controller.
 */

class theaterHelper {

    async getUser(body){
        try {
            let sql = `SELECT * FROM users`;
            console.log(sql);
            const user = await query(sql,[body])
            if (user.length == 0){
                throw 'BOOK_NOT_FOUND'
            }else{
                return user;// return user[0] if want to get only one data from movies table
            } 
        }catch (err){
            console.log(`there was an error ${err}`) 
        }
    }


    async getSingleuser(body){
        try{
        let sql = `SELECT user_id,name,username,password,status FROM users WHERE user_id = ?`;
        console.log(sql);
        const user = await query(sql,[body.user_id])
        if (user.length ==0){
            throw 'USER_NOT_FOUND'
        }else{
            return user[0];
        }
        }catch (err){
            console.log(`there was an error ${err}`)
        }
    }



    async deleteUser(body){
        try{
            let sql = `DELETE FROM users WHERE user_id = ?`;
            console.log(sql);
            const user = await query(sql, [body.user_id])
        }catch (err){
            console.log(`there was an error ${err}`)
        }
    }



    async insertUser(body){
        try{
            let sql =  `INSERT INTO users SET ?`;
            console.log(sql)
         let data = {
             user_id: body.user_id,
             name: body.name,
             username: body.username,
             password: body.password,
             status: body.status
         }
         let user = await query(sql, data)
         return user;
        }catch (err){
         console.log(`there was an error ${err}`)
        }
     }

     

     async updateUser(body){
         try{
             let sql = `UPDATE users SET ? WHERE user_id=${body.user_id}`
             console.log(sql)
             let user = await query(sql,[body])
             if (user.length == 0){
                 throw 'USER_NOT_FOUND'
             }else{
                 return user[0];
             }
         }catch (err){
             console.log(`there was an error ${err}`)
         }
     }


    //  async signin(body){
    //      try{
    //          let sql = `SELECT username, password FROM users`;
    //          console.log(sql);
    //          let data={
    //             username:body.username,
    //             password:body.password
    //          }
    //          const user = await query(sql, data)
    //          if (user.length == 0 ){
    //              throw 'USER_NOT_FOUND'
    //          }else{
    //              return data;
    //          }
    //      }catch(err){
    //         console.log(`there was an error ${err}`)
    //      }
    //  }


    async getToken(req,res, body){
        try{
            let sql = `SELECT * FROM users`;
            console.log(sql);
            const user = await query(sql,[body])
            jwt.verify(req.token, 'my_secret_key', function(err,data){
            })
        }catch(err){
            console.log(`there was an error ${err}`)
        }
    }




    //  async signin(body){
    //     try{    
    //         let sql = `SELECT username,password FROM users`;
    //         console.log(sql)
    //         let data ={
    //             username:body.username,
    //             password:body.password
    //         }
    //         let user = await query(sql,data)
    //         if (data.length<1){
    //             console.log("Auth failed")
    //         }else{
    //             return body;
    //         }
            
    //     }catch (err){
    //         console.log(`there was an error ${err}`)
    //     }
    //  }


    // async signin(body){
    //     try{
    //         let sql = `SELECT username,password FROM users WHERE username=${body.username} AND password=${body.password}`;
    //         // userModel.find({username:username})
    //         console.log(sql)
    //         let user = await query(sql,[body])
    //         if (user.length == 0){
    //             throw 'MOVIE_NOT_FOUND'
    //         }else{
    //             return user[0];
    //         }
    //     }catch (err){
    //         console.log(`there was an error ${err}`)
    //     }
    // }


    // async insertUser(req,res, body){
    //     const {name,username,password,status} = req.body
    //     try{
    //         let sql = `INSERT INTO users (name,username,password,status) values (${connection.escape(name)},${connection.escape(username)},${connection.escape(password)},${connection.escape(status)})`
    //         console.log(sql);
    //         const user = await query(sql,[body])
    //     }catch(err){
    //         console.log(`there was an error ${err}`)
    //     }
    // }

    // async insertUser(req, res, body){
    //     try{
    //         let sql = "INSERT INTO users(name,username,password,status) VALUES ('"+ req.body.name +"', '"+ req.body.username +"', '"+ req.body.password +"', '"+ req.body.status +"')";
    //         // let sql = "Insert into users(name,username,password,status) VALUES ('"+req.body.name+"','"+req.body.username+"','"+req.body.password+"','"+req.body.status+"')";
    //         console.log(sql);
    //         const user = await query(sql,[body])
    //     }catch (err){
    //         console.log(`there was an error ${err}`)
    //     }
    // }

    // async getMovie(id) {
    //     try {
    //         let selectParams = `mov_id,title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb`,
    //              where = `mov_id = ${id}`
    //         let movie = await db.select('movies', selectParams, where)
    //         if (movie.length == 0) {
    //             throw 'USER_NOT_FOUND'
    //         } else {
    //             return movie[0]
    //         }
    //     } catch (error) {
    //         return promise.reject(error)
    //     }
    // }


// async getMovie(req,res) {
//     try {
//         let sql = `SELECT * FROM movies`;
//         console.log(sql);
//         const rows = await query(sql)
//         //res.json(rows);
//         console.log(rows)
//     } catch (err) {
//         return promise.reject(err)
//     }
// }




    // async getSingleMovie(body,id){
    //     return new promise((resolve,reject)=>{
    //         var sql = `SELECT * FROM movies WHERE mov_id= ${connection.escape(id)}`;
    //         console.log(sql);
    //         db.query(sql,[body.id],(error,results)=>{
    //             if (error){
    //                 console.log(error);
    //                 reject('DB_ERROR');
    //             }else{
    //                 resolve(results);
    //             }
    //         })
    //     })
    // }



// async getSingleMovie(req,res){
//         const { id } = req.params
//         console.log(`mov id:${id}`)
//         try{
//             let sql = `SELECT * FROM movies WHERE mov_id = ${connection.escape(id)}`;
//             console.log(sql);
//             const rows = await query(sql)
//             res.json(rows)
//         }catch(err){
//             return promise.reject(err)
//         }
//     }

// async InsertMovie(req,res){
//     const {title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb} = req.body
//     try{
//         let sql = `INSERT INTO movies (title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb) values (${connection.escape(title)},${connection.escape(Genere)},${connection.escape(type)},${connection.escape(cover_img)},${connection.escape(description)},${connection.escape(ticket)},${connection.escape(duration)},${connection.escape(rel_year)},${connection.escape(trailer_yt_link)},${connection.escape(Imdb)})`
//         const rows = await query(sql)
//         res.json({message:'movie inserted....!'})
//     }catch(err){
//         return promise.reject(err)
//     }
// }




// async deleteMovie(req,res){
//     const { id } = req.params
//     try{
//         let sql = `DELETE FROM movies WHERE mov_id = ${connection.escape(id)}`
//         const rows = await query (sql)
//         res.json({message:'movie Deleted.......!'})
//     }catch(err){
//         return promise.reject(err)
//     }
// }





}

module.exports = new theaterHelper()