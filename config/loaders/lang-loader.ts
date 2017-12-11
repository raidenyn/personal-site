import { getOptions } from 'loader-utils';

/**
 * this module finds all patterns for language definitions and removes all languages except current
 */
module.exports = function (content, map, meta) {
    const options = getOptions(this) as ILangLoaderOptions;

    if (!options) {
        throw new Error('Options for lang-loader is not defined');
    }

    const current = options.lang;

    if (typeof content === 'string') {
        // tslint:disable-next-line:no-parameter-reassignment
        content = content.replace(/<([\w-]+)\W+?lang="(\w+?)"[\s\S]*?>[\s\S]*?<\/\1>/g, (substring: string, tag, lang) => {
            if (lang !== current) {
                return '';
            }
            return substring;
        });
        // tslint:disable-next-line:no-parameter-reassignment
        content = content.replace(/\$lang-(\w+)\((.*?)\)/g, (substring: string, lang, value) => {
            if (lang !== current) {
                return '';
            }
            return value;
        });
    }

    this.callback(null, content, map, meta);
};

export interface ILangLoaderOptions {
    lang: string;
}
