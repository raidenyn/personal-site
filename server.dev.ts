import { server, createRenderer } from './server.base';
import { Request, Response } from 'express';
import express = require('express');
const opn = require('opn');
const port = 8080;


server.use(express.static('dist'));
server.get('*', async (req: Request, res: Response) => {
    try {
        const lang = req.cookies.lang || 'ru';

        const renderer = await createRenderer(lang);
        
        renderer.renderToString(req, (err, html) => {
            if (err) {
                res.status(500).end(err.stack);
                return;
            }
            if (req.route.statusCode) {
                res.status(req.route.statusCode);
            }
            res.end(html);
        });
    } catch (error) {
        res.status(200)
           .end(`<html>
                   <body>
                     <p>Preparing to open the page. Wait a few seconds...</p>
                     <pre>${error.stack}</pre>
                   </body>
                   <script>setTimeout(()=>window.location.reload(), 1000);</script>
                 </html>`);
    }
});

server.listen(port);

opn(`http://localhost:${port}`);
