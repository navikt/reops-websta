/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Outputs a Single-Page Application (SPA).
    distDir: './dist', // Changes the build output directory to `./dist/`.
    basePath: '', // Sets the base path to `/some-base-path`.
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        esmExternals: true
    },
    transpilePackages: ['@fluentui/react-charting', 'd3-scale'],
}


export default nextConfig