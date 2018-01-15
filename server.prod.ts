import { server, createRenderer } from './server.base';
import { error, promisify } from 'util';
import { Request, Response } from 'express';
import express = require('express');

import * as fs from 'fs';
import * as path from 'path';

const readFile = promisify(fs.readFile);

const port = 80;

async function createExecution(lang: string) {
    return {
        renderer: await createRenderer(lang),
        spaFallback: await readFile(`dist/spa-index-${lang}.html`, { encoding: 'utf-8' }),
    };
}

server.use('/data', express.static('dist/data', { etag: true }));
server.use('/sw.js', express.static('dist/sw.js', { etag: true }));
server.use(express.static('dist', { maxAge: '30d' }));
(async () => {
    const langs = {
        ru: await createExecution('ru'),
        en: await createExecution('en'),
    };

    server.get('*', async (req: Request, res: Response) => {
        const lang = req.cookies.lang || 'en';

        const exec = langs[lang];
        
        exec.renderer.renderToString(req, (err, html) => {
            if (err) {
                res.write(exec.spaFallback);
                res.end(`<!--SSR Error:\n${err ? err.stack : 'unknown error'}-->`);
            } else {
                if (req.route.statusCode) {
                    res.status(req.route.statusCode);
                }
                res.end(html);
            }
        });
    });
    
    server.listen(port);
})();
