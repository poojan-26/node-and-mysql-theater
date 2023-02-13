const promise = require('bluebird');
// const dateHelper = require('../../utils/dateHelper');
// const codeHelper = require('../../utils/codeHelper');
const db = require('../../utils/db');
const util = require('util');
const connection = require('../../utils/config')
const query = util.promisify(db.query).bind(db)
// const query = util.promisify(connection.query).bind(connection);


/**
 * This theaterHelper class contains all movies related API's logic and required database operations. This class' functions are called from userAuth controller.
 */

class theaterHelper {

    async getBook(body){
        try {
            let sql = `SELECT * FROM books`;
            console.log(sql);
            const book = await query(sql,[body])
            if (book.length == 0){
                throw 'BOOK_NOT_FOUND'
            }else{
                return book;// return book[0] if want to get only one data from movies table
            } 
        }catch (err){
            console.log(`there was an error ${err}`) 
        }
    }



    async getSingleBook(body){
        try{
        let sql = `SELECT book_id,mov_id,lastname,firstname,contact_no,qty,date,time FROM books WHERE book_id =?`;
        console.log(sql);
        const movie = await query(sql,[body.book_id])
        if (movie.length ==0){
            throw 'BOOKING_NOT_FOUND'
        }else{
            return movie[0];
        }
        }catch (err){
            console.log(`there was an error ${err}`)
        }
    }


    async deleteBook(body){
        try{
            let sql = `DELETE FROM books WHERE book_id = ?`;
            console.log(sql);
            const book = await query(sql, [body.book_id])
        }catch (err){
            console.log(`there was an error ${err}`)
        }
    }

    async insertBook(body){
        try{
            let sql =  `INSERT INTO books SET ?`;
            console.log(sql)
         let data = {
             book_id: body.book_id,
             mov_id: body.mov_id,
             lastname: body.lastname,
             firstname: body.firstname,
             contact_no: body.contact_no,
             qty: body.qty,
             date: body.date,
             time: body.time

         }
         let user = await query(sql, data)
         return user;
        }catch (err){
         console.log(`there was an error ${err}`)
        }
     }

     async updateBook(body){
        try{
            let sql = `UPDATE books SET ? WHERE book_id=${body.book_id}`;
            console.log(sql)
            let book = await query(sql,[body])
            if (book.length == 0){
                throw 'BOOKING_NOT_FOUND'
            }else{
                return movie[0];
            }
        }catch (err){
            console.log(`there was an error ${err}`)
        }
    }


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


// async updateMovie(req,res){
//     const { id } = req.params
//     const {title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb} = req.body
//     try{
//         let sql = `UPDATE movies SET title = ${connection.escape(title)},Genere = ${connection.escape(Genere)},type = ${connection.escape(type)},cover_img = ${connection.escape(cover_img)},description = ${connection.escape(description)},ticket = ${connection.escape(ticket)},duration = ${connection.escape(duration)},rel_year = ${connection.escape(rel_year)},trailer_yt_link = ${connection.escape(trailer_yt_link)},Imdb = ${connection.escape(Imdb)} WHERE mov_id = ${connection.escape(id)}`
//         const rows = await query(sql)
//         res.json({message:'movie updated.........!'})
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