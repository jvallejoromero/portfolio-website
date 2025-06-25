/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL,
    generateRobotsTxt: true,

    changefreq: 'monthly',
    priority: 1.0,
    sitemapSize: 5000,
    exclude: ['/api/*', '/_next/*', '/404', '/secret/*'],

    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            { userAgent: '*', disallow: ['/api', '/_next', '/404'] },
        ],
        additionalSitemaps: [],
    },

    transform: async (config, path) => {
        let priority = 0.5;
        let changefreq = 'monthly';

        if (path === '/') {
            priority = 1.0;
        }

        return {
            loc: path,
            changefreq,
            priority,
            lastmod: new Date().toISOString().split('T')[0],
        };
    },
};
