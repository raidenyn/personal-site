import { IMatchContext, MatchCallback } from 'workbox-sw';

export interface IMatchExtensionsOptions {
    exclude?: string[];
}

export function matchExtensions(extensions: string[], options: IMatchExtensionsOptions = {}) : MatchCallback {
    const regexs = {
        include: extensions.map(extension => new RegExp('\.' + extension + '$')),
        exclude: undefined as any,
    };

    if (options.exclude) {
        regexs.exclude = options.exclude.map(extension => new RegExp('\.' + extension + '$'));
    }

    return (context: IMatchContext) => {
        if (regexs.exclude) {
            for (const regex of regexs.exclude) {
                const result = regex.exec(context.url.pathname);
                if (result) {
                    return null;
                }
            }
        }

        for (const regex of regexs.include) {
            const result = regex.exec(context.url.pathname);
            if (result) {
                return result;
            }
        }
        return null;
    };
}
