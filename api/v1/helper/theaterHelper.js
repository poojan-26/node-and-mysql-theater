const promise = require('bluebird');
const dateHelper = require('../../utils/dateHelper');
const config = require('../../utils/config');
// const codeHelper = require('../../utils/codeHelper');
const db = require('../../utils/db');
const util = require('util');
const connection = require('../../utils/config');
const { readSync } = require('fs');
const query = util.promisify(db.query).bind(db)
// const query = util.promisify(connection.query).bind(connection);


/**
 * This theaterHelper class contains all movies related API's logic and required database operations. This class' functions are called from userAuth controller.
 */

class theaterHelper {


    async getMovie(body){
        try {
            let sql = `SELECT * FROM movies`;
            console.log(sql);
            const movie = await query(sql,[body])
            if (movie.length == 0){
                throw 'MOVIE_NOT_FOUND'
            }else{
                return movie;// return movie[0] if want to get only one data from movies table
            } 
        }catch (err){
            console.log(`there was an error ${err}`) 
        }
    }

    

    // async getMoviebypage(req,res, body){
    //     try{
    //         const page = parseInt(req.page)
    //         const limit = parseInt(req.limit)
    //         const startIndex = (page - 1) * limit
    //         const endIndex  = page * limit
    //         const result = `SELECT * FROM movies`;
    //         return result;
    //     }catch (err){
    //         console.log(`there was an error ${err}`) 
    //     }
    // }

//    async getMoviebypage(req,res, body){
//        try{
//         // let start = parseInt(req.query.start);
//         // let limit = parseInt(req.query.limit);
//         let  start = req.body;
//         let limit = req.body;

//         let sql = `SELECT count(*) as TotalCount from movies`;
//         console.log(sql);
//         const movies = await query(sql,[body])
//         db.query(sql, function(err, rows){
//             if (err){
//                 return err;
//             }else{
//                 let totalCount = rows[0].totalCount

//                 if (req.body.start == '' || req.body.limit == ''){
//                     let startNum = 0;
//                     let LimitNum = 10;
//                 }else{
//                     let startNum = parseInt(req.body.start);
//                     let LimitNum = parseInt(req.body.limit);
//                 }
//             }

//             let sqli = `SELECT * FROM movies ORDER BY mov_id DESC limit ? OFFSET ?`;
//             console.log(sqli);
//             // const movie = await query(sqli,[body])
//             db.query(sqli,(err, rest)=>{
//                 if(err){
//                     return err;
//                 }else{
//                     return ({"Total Count": totalCount, "data": rest})
//                 }
//             })
//         })
//        }catch (err){
//             console.log(`there was an error ${err}`) 
//             }
//    }



    // async getMoviebypage(req,res, body){
    //     try{
    //         // let limit = (body.page-1) * body.pagesize;
    //         let sql = `SELECT * FROM movies limit 5 offset 1`;
    //         console.log(sql);
    //         const movie = await query(sql, [body])
    //         if (movie.length == 0){
    //             throw 'MOVIE_NOT_FOUND'
    //         }else{
    //             return movie;// return movie[0] if want to get only one data from movies table
    //         } 
    //     }catch (err){
    //         console.log(`there was an error ${err}`) 
    //     }
    // }


    
    // async getMoviebypage(body){
    //     try{
    //         // let limit = (body.page-1) * body.pagesize;
    //         // let sql = `SELECT * FROM movies LIMIT ${limit},${body.pagesize}`;
    //         let sql = `SELECT * FROM movies LIMIT 1,3`
    //         console.log(sql);
    //         db.query(sql, (error, results) =>{
    //             if (error){
    //                 console.log(error);
    //             }else{
    //                 db.query(`SELECT COUNT(mov_id) as total FROM movies`, function(err, totalResult){
    //                     if (err){
    //                         console.log(error);
    //                     }else{
    //                         return ({ data: results, total: totalResult.length > 0 ? totalResult[0].total : 0 })
                            
    //                     }
    //                 })
    //             }
    //         })
    //     }catch (err){
    //         console.log(`there was an error ${err}`) 
    //     }
    // }

    // async getMoviebypage(body){
    //     try{
    //         let limit = (body.page-1) * body.pagesize;
    //         let sql = `SELECT * FROM movies LIMIT = 1, 2`;
    //         console.log(sql);
    //         db.query(sql, (error, results)=>{
    //             if (error){
    //                 console.log(error);
    //             }else{
    //                 db.query(`SELECT COUNT(mov_id) as total FROM movies`, function(err, totalResult){
    //                     if (err){
    //                         console.log(error);
    //                     }else {
    //                         return ({ data: results, total: totalResult.length > 0 ? totalResult[0].total:0})
    //                     }
    //                 })
    //             }
    //         }) 
    //     }catch (err){
    //         console.log(`there was an error ${err}`)
    //     }
    // }

    
    // async getMoviebypage(body){
    //     try{
    //         let pagination 
    //         let sql = `SELECT * FROM movies`;
    //         if (body.page_no){
    //             pagination =  `LIMIT ${Number(config.paginationCount)} OFFSET ${Number(config.paginationCount) * (Number(body.page_no) - 1)}`
    //         }
    //         let subquery = `(SELECT * FROM movies ` + pagination + `) ORDER BY mov_id ASC`;
    //         let movies = await query(subquery, 'SELECT * FROM movies'),
    //             moviesCount = await query(sql , `COUNT(*)`)
    //             for (let m = 0; m < movies.length; m++) {
    //                 let currentDate = dateHelper.getFormattedDate();
    //                 if (movies[m].subscription_validity != null && movies[m].subscription_validity >= currentDate) {
    //                     movies[m].has_any_active_plan = 1
    //                 } else {
    //                     movies[m].has_any_active_plan = 0
    //                 }
    //             }
    //             return { movies, moviesCount: moviesCount[0].count }
    //     }catch(err){
    //         console.log(`there was an error ${err}`)   
    //     }
    // }

    async getSingleMovie(body){
        try{
        let sql = `SELECT mov_id,title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb FROM movies WHERE mov_id =?`;
        console.log(sql);
        const movie = await query(sql,[body.mov_id])
        if (movie.length ==0){
            throw 'MOVIE_NOT_FOUND'
        }else{
            return movie[0];
        }
        }catch (err){
            console.log(`there was an error ${err}`)
        }
    }


    async deleteMovie(body){
        try{
            let sql = `DELETE FROM movies WHERE mov_id = ?`;
            console.log(sql);
            const movie = await query(sql, [body.mov_id])
        }catch (err){
            console.log(`there was an error ${err}`)
        }
    }



    async insertMovie(body){
        try{
            let sql =  `INSERT INTO movies SET ?`;
            console.log(sql)
         let data = {
             
             mov_id: body.mov_id,
             title: body.title,
             Genere: body.Genere,
             type: body.type,
             cover_img: body.cover_img,
             description: body.description,
             ticket: body.ticket,
             duration: body.duration,
             rel_year: body.rel_year,
             trailer_yt_link: body.trailer_yt_link,
             Imdb: body.Imdb
         }
         let movie = await query(sql, data)
         return movie;
        }catch (err){
         console.log(`there was an error ${err}`)
        }
     }


        async updateMovie(body){
            try{
                let sql = `UPDATE movies SET ? WHERE mov_id=${body.mov_id}`
                console.log(sql)
                let movie = await query(sql,[body])
                if (movie.length == 0){
                    throw 'MOVIE_NOT_FOUND'
                }else{
                    return movie[0];
                }
            }catch (err){
                console.log(`there was an error ${err}`)
            }
        }



    //  async updateMovie(body){
    //      try{
    //          let sql =`UPDATE movies SET title=, Genere=?, type=?, cover_img=?, description=?, ticket=?, duration=?, rel_year=?, trailer_yt_link=?, Imdb=? WHERE mov_id=?`;
    //          console.log(sql)
    //          let data = {
    //             mov_id: body.mov_id,
    //             title: body.title,
    //             Genere: body.Genere,
    //             type: body.type,
    //             cover_img: body.cover_img,
    //             description: body.description,
    //             ticket: body.ticket,
    //             duration: body.duration,
    //             rel_year: body.rel_year,
    //             trailer_yt_link: body.trailer_yt_link,
    //             Imdb: body.Imdb
    //         }
    //         let movie = await query(sql, data)
    //         return movie;
    //      }catch{
    //         console.log(`there was an error ${err}`)
    //      }
    //  }




     //rest api to update record into mysql database
// app.put('/employees', function (req, res) {
//     connection.query('UPDATE `employee` SET `employee_name`=?,`employee_salary`=?,`employee_age`=? where `id`=?', [req.body.employee_name,req.body.employee_salary, req.body.employee_age, req.body.id], function (error, results, fields) {
//        if (error) throw error;
//        res.end(JSON.stringify(results));
//      });
//  });






//     async updateMovie(req,res){
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

    // async insertMovie(body){
    //     try{
    //         let sql = `INSERT INTO movies VALUES(null,'"+ req.body.title +"', '"+ req.body.Genere +"', '"+ req.body.type +"', '"+ req.body.cover_img +"', '"+ req.body.description +"', '"+ req.body.ticket +"', '"+ req.body.duration +"', '"+ req.body.rel_year +"', '"+ req.body.trailer_yt_link +"', "+ req.body.Imdb +")`;
    //         console.log(sql);
    //         const movie = await query(sql,[body])
    //     }catch (err){
    //         console.log(`there was an error ${err}`)
    //     }
    // }



    // async insertMovie(body){
    //    try{
    //        let sql =  `INSERT INTO movies (mov_id,title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb) VALUES ?`;
    //     let data = {
    //         mov_id: body.mov_id,
    //         title: body.title,
    //         Genere: body.Genere,
    //         type: body.type,
    //         description: body.description,
    //         ticket: body.ticket,
    //         duration: body.duration,
    //         rel_year: body.rel_year,
    //         trailer_yt_link: body.trailer_yt_link,
    //         Imdb: body.Imdb
    //     }
    //     if (body.cover_img){
    //         data.cover_img = body.cover_img
    //     }
    //     let movie = await query(sql,data)
    //     return movie;
    //    }catch (err){
    //     console.log(`there was an error ${err}`)
    //    }
    // }



    // async InsertMovie(req, res, body){
    //     try{
    //         const {title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb} = req.body 
    //         let sql = `INSERT INTO movies (title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb) values (${connection.escape(title)},${connection.escape(Genere)},${connection.escape(type)},${connection.escape(cover_img)},${connection.escape(description)},${connection.escape(ticket)},${connection.escape(duration)},${connection.escape(rel_year)},${connection.escape(trailer_yt_link)},${connection.escape(Imdb)})`
    //         console.log(sql);
    //         const movie = await query(sql,[body.title][body.Genere][body.type][body.cover_img][body.description][body.ticket][body.duration][body.rel_year][body.trailer_yt_link][body.Imdb])
    //         if (movie.length ==0){
    //             throw 'MOVIE_NOT_FOUND'
    //         }else{
    //             return movie[0];
    //         }
    //     }catch (err){
    //         console.log(`there was an error ${err}`)
    //     }
    // }


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



    // async getSingleMovie(req,res){
    //     const { id } = req.params
    //     console.log(`mov id:${id}`)
    //     try{
    //         let sql = `SELECT * FROM movies WHERE mov_id = ${connection.escape(id)}`;
    //         console.log(sql);
    //         const rows = await query(sql)
    //         res.json(rows)
    //     }catch(err){
    //         return promise.reject(err)
    //     }
    // }



    // async getSingleMovie(body,id){
    //         return new promise((resolve,reject)=>{
    //             var sql = `SELECT * FROM movies WHERE mov_id= ${connection.escape(id)}`;
    //             console.log(sql);
    //             db.query(sql,[body.id],(error,results)=>{
    //                 if (error){
    //                     console.log(error);
    //                     reject('DB_ERROR');
    //                 }else{
    //                     resolve(results);
    //                 }
    //             })
    //         })
    //     }



    

    // async getMovie(body){
    //         try {
    //            let pagination
    //            if (body.page_no){
    //             pagination = ` LIMIT ${Number(config.paginationCount)} OFFSET ${Number(config.paginationCount) * (Number(body.page_no) - 1)}`
    //         } 
    //         let sql = `(SELECT ` * ` FROM movies` + pagination + `)`
    //         let movies = await query(sql, '*')
    //         moviesCount =await query(sql, `COUNT(*)`)
    //         for (let m = 0; m < movies.length; m++) {
    //             let currentDate = dateHelper.getFormattedDate();
    //             if (movies[m].subscription_validity != null && movies[m].subscription_validity >= currentDate) {
    //                 movies[m].has_any_active_plan = 1
    //             } else {
    //                 movies[m].has_any_active_plan = 0
    //             }
    //         }
    //         return {movies, moviesCount: moviesCount[0].count}
    //         }catch (err){
    //             console.log(`there was an error ${err}`) 
    //         }
    //     }
    



    // async getMovie(body){
    //     return new promise((resolve,reject)=>{
    //         var sql =`SELECT mov_id,title,Genere,type,cover_img,description,ticket,duration,rel_year,trailer_yt_link,Imdb FROM movies`;
    //         console.log(sql);
    //         db.query(sql,[body],(error,results)=>{
    //             if(error){
    //                 console.log(error);
    //                 reject('DB_ERROR');
    //             }else{
    //                 resolve(results);
    //             }
    //         })
    //     })
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


   

// async getMovie(body) {
//     try {
//         let sql = `SELECT * FROM movies`;
//         console.log(sql);
//         const rows = await query(sql,[body])
//         // res.json(rows);
//         console.log(rows)
//     } catch (err) {
//         console.log(`there was an error ${err}`)
//     }
// }




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