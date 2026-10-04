import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const root = 'public/mzilikazi imgs/mzilikazi-img';
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir,e.name)) : /\.jpeg$/i.test(e.name) ? [path.join(dir,e.name)] : []))).flat();
}
const files = await walk(root);
await mkdir('.qa', { recursive: true });
await writeFile('.qa/assets-index.json',JSON.stringify(files,null,2));
const tiles = await Promise.all(files.map(async (file,i) => ({ input: await sharp(file).resize(190,130,{fit:'contain',background:'#ffffff'}).extend({bottom:30,background:'#ffffff'}).composite([{input:Buffer.from(`<svg width="190" height="160"><text x="5" y="149" font-size="13">${i}: ${path.basename(path.dirname(file))}</text></svg>`)}]).jpeg().toBuffer(),left:i%5*200,top:Math.floor(i/5)*170 })));
await sharp({create:{width:1000,height:Math.ceil(files.length/5)*170,channels:3,background:'#ffffff'}}).composite(tiles).jpeg().toFile('.qa/assets.jpg');
console.log(files.length + ' photos previewed');
