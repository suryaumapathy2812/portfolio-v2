import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		appDir: true,
		mdxRs: true,
	},
	images: {
		domains: ["https://s3.us-west-2.amazonaws.com"],
	},
};

export default withContentlayer(nextConfig);
