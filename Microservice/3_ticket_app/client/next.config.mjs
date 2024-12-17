/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.watchOptions.poll = 300;
		return config;
	},
};

export default nextConfig;
