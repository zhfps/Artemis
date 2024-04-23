import Config from '../config/Config'
//
const knex = require('knex')({
   client: 'sqlite3', // or 'better-sqlite3'
   connection: {
     filename: Config.DB_PATH
   },
   useNullAsDefault: true
 })

 /**
  * 数据
  */
export default class LocalDataBase{

   static insert<T>(name: string, data: T){
     return knex(name).insert(data)
   }
   
   static price(data:{id: string, price: number, UpDate: number}){
    return knex('product').where('ID', '=', data.id)
    .update({
      CurrentPrice: data.price || 0,
      UpDate: data.UpDate
    })  
  }
    static product(id:string){
    return knex('product').where('id', id)
  }

  static count(){
    return knex('product').count('ID')
  }

  static upCount(){
    return knex('product').count('ID')
  }

  static productList(page:number,pageSize:number){
    return knex.select('*').from('product').limit(pageSize)
    .offset(pageSize * (page - 1))
  }

  static productUpList(page:number,pageSize:number){
    return knex.select('*').from('product').limit(pageSize)
    .offset(pageSize * (page - 1))
  }
}