import * as path from 'path';

// Helper functions
const ROOT = path.resolve(__dirname, '..');

export function root(...args: string[]) {
    return path.join.apply(path, [ROOT].concat(args));
}
