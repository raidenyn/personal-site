export function modules(chunks: string[]): RegExp {
    const parts = chunks.map(chunk => `(node_modules[\\\\/]${chunk})`);

    return new RegExp(parts.join('|'));
}
