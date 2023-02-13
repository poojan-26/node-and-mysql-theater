const promise = require('bluebird');
const dateHelper = require('../../utils/dateHelper');
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

    async getTheater(body){
        try {
            let sql = `SELECT * FROM theater`;
            console.log(sql);
            const theater = await query(sql,[body])
            if (theater.length == 0){
                throw 'BOOK_NOT_FOUND'
            }else{
                return theater;// return theater[0] if want to get only one data from movies table
            } 
        }catch (err){
            console.log(`there was an error ${err}`) 
        }
    }

    async getSingletheater(body){
        try{
        let sql = `SELECT theater_id,name,seat FROM theater WHERE theater_id =?`;
        console.log(sql);
        const movie = await query(sql,[body.theater_id])
        if (movie.length ==0){
            throw 'THEATER_NOT_FOUND'
        }else{
            return movie[0];
        }
        }catch (err){
            console.log(`there was an error ${err}`)
        }
    }


    async deleteTheater(body){
        try{
            let sql = `DELETE FROM theater WHERE theater_id = ?`;
            console.log(sql);
            const theater = await query(sql, [body.theater_id])
        }catch (err){
            console.log(`there was an error ${err}`)
        }
    }



    async insertTheater(body){
        try{
            let sql =  `INSERT INTO theater SET ?`;
            console.log(sql)
         let data = {
             theater_id: body.theater_id,
             name: body.name,
             seat: body.seat
         }
         let user = await query(sql, data)
         return user;
        }catch (err){
         console.log(`there was an error ${err}`)
        }
     }



     async updateTheater(body){
        try{
            let sql = `UPDATE theater SET ? WHERE theater_id=${body.theater_id}`;
            console.log(sql)
            let theater = await query(sql,[body])
            if (theater.length == 0){
                throw 'MOVIE_NOT_FOUND'
            }else{
                return theater[0];
            }
        }catch (err){
            console.log(`there was an error ${err}`)
        }
    }

/***** 
   async getalltheaterpage(body){
       try{
        let pagination
        let sql = `SELECT * FROM theater`;
        // console.log(sql)
        if (body.page_no){
            pagination = ` LIMIT ${Number(config.paginationCount)} OFFSET ${Number(config.paginationCount) * (Number(body.page_no) - 1)}`
            // let theaters = await query (sql,[body])
        }
        let subquery = `(` + sql + pagination`)`;
        let theater = await query(subquery,[body]),
            theatersCount = await query(sql,`COUNT(*)`,[body])
         for (let t = 0; t < theater.length; t++) {
                let currentDate = dateHelper.getFormattedDate();
                if (theater[t].subscription_validity != null && theater[t].subscription_validity >= currentDate) {
                    theater[t].has_any_active_plan = 1
                } else {
                    theater[t].has_any_active_plan = 0
                }
            }
            return { theater, theatersCount: theatersCount[0].count }
       }catch(err){
        console.log(`there was an error ${err}`)
       }
   }
*/



    // async insertTheater(body){
    //     try{
    //         let sql = `INSERT INTO theater VALUES(null,'"+ req.body.name +"', "+ req.body.seat +")`;
    //         console.log(sql);
    //         const theater = await query(sql,[body])
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