import {Client} from 'https://deno.land/x/postgres/mod.ts';
import {QueryResult, QueryConfig} from 'https://deno.land/x/postgres/query.ts';

const client = new Client({
    hostname : "localhost",
    port : 5433,
    user : "postgres",
    password : "1234",
    database : "db_blog"
});

export async function select(qry : QueryConfig | QueryConfig[]){
    await client.connect();
    let tables : any = [];
    let hasil : QueryResult | QueryResult[];
    if(Array.isArray(qry)){
        hasil = await client.multiQuery(qry);
        hasil.forEach((obj)=>{
            tables.push(obj.rowsOfObjects());
        });
    }
    else{
        hasil = await client.query(qry);
        tables = hasil.rowsOfObjects();
    }
    await client.end();
    return tables;
}