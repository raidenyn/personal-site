// tslint:disable:no-duplicate-imports
import express = require('express');
import * as vueSR from 'vue-server-renderer';
import { root } from './helpers';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
const readFile = promisify(fs.readFile);
import './src/types/meta-info';
import * as cookieParser from 'cookie-parser';

const server = express();

server.use(cookieParser());

export async function createRenderer(lang: string) {
    const layout = await readFile(`./dist/ssr-layout-${lang}.html`, { encoding: 'utf-8' });

    const clientManifest = await readFile(`./dist/vue-ssr-client-manifest-${lang}.json`, { encoding: 'utf-8' });

    return vueSR.createBundleRenderer(root(`./dist/vue-ssr-server-bundle-${lang}.json`), {
        runInNewContext: false,
        template: layout,
        clientManifest: JSON.parse(clientManifest),
    });
}

server.get('/vue-ssr-*.json', (req, res, next) => { res.sendStatus(404); });

export { server };
