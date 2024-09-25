const withPWA = require('@ducanh2912/next-pwa').default({
	dest: 'public',
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	swcMinify: true,
	disable: process.env.NODE_ENV === 'development',
	workboxOptions: {
		disableDevLogs: true
	}
})

/** @type {import('next').NextConfig} */
const config = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '**'
			}
		]
	},
	experimental: {
		typedRoutes: true
	}
}
module.exports = withPWA(config)
