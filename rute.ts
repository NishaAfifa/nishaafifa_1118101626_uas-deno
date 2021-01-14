import {Router} from 'https://deno.land/x/oak/mod.ts';
import {home, signup, saveuser, kategori} from './controllers/blog.ts';

const router = new Router;

router
.get("/", home)
.get("/daftar", signup)
.post("/simpanuser", saveuser)
.get("/kategori/:id", kategori)
.get("/about", (ctx)=>{
    ctx.response.body = "ini halaman about";
});

export default router;