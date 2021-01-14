import {renderFileToString} from 'https://deno.land/x/dejs/mod.ts';
import {select} from '../models/pg_model.ts';
import TSql from '../models/sql.ts';

const home = async({response}:{response : any}) => {
    const dataTable = await select(
        [
            {text : TSql['KtgFindAll']},
            {text : TSql['BlogInfoFindAll']}
        ]
    )
    const html = await renderFileToString("./views/home.ejs", {
        data : {
            nama : "Eko Heri",
            pemrograman : dataTable[0],
            blogInfo : dataTable[1],
            mahasiswa : [
                {nim : "01", "nama" : "Eko"},
                {nim : "02", "nama" : "Budi"},
                {nim : "03", "nama" : "Wati"}
            ]
        },
        subview : {
            namafile : "./views/blog-main.ejs",
            showjumbotron : true
        }
    });
    response.body = new TextEncoder().encode(html);
}

const signup = async({response}:{response : any}) => {
    const html = await renderFileToString("./views/home.ejs", {
        data : {
            pemrograman : await select({
                text : TSql["KtgFindInKode"],
                args : ["php", "ts", "js"]
            }),
            blogInfo : await select({
                text : TSql["BlogInfoFindAll"]
            })
        },
        subview : {
            namafile : "./views/signup.ejs",
            showjumbotron : false
        }
    });
    response.body = new TextEncoder().encode(html);
}

const saveuser = async({request, response}:{request : any, response : any}) => {
    const body = await request.body();
    const namalengkap = body.value.get("fullname");
    const namauser = body.value.get("username");
    const pwd = body.value.get("paswd");
    response.body = "data yang dipost : "+namalengkap+", "+namauser+", "+pwd;
}

const kategori = async({params, response} : {params : {id : string}, response : any}) => {
    response.body = "ID Parameter : "+params.id;
}

export {home, signup, saveuser, kategori};