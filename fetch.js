const { NotionToMarkdown } = require("notion-to-md");
const fs = require("fs");
const Notion = require("@notionhq/client");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const AUTH_SECRET_TOKEN = process.env.AUTH_SECRET_TOKEN;
const PAGE_ID = process.env.PAGE_ID;

const notionClient = new Notion.Client({ auth: AUTH_SECRET_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notionClient });


cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadImageToCloudinary({ imageUrl, fileName }) {
	// Upload image to Cloudinary
	const uploadResult = await cloudinary.uploader.upload(imageUrl, {
		access_mode: 'public',

		use_filename: true,
		filename_override: fileName,
		overwrite: true, // Overwrite if file with the same name exists

		folder: "portfolio-v2", // Optional: Organize images in folders
		resource_type: "image" // Explicitly specify resource type
	});

	return uploadResult.secure_url; // Get the secure Cloudinary URL
}

async function urlConverter(code) {
	const startMarker = "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/";
	const endMarker = "&x-id=GetObject"; // Adjust this for different image formats
	const imageUrls = [];

	let currentIndex = 0;

	while (currentIndex < code.length) {
		const startIndex = code.indexOf(startMarker, currentIndex);
		if (startIndex === -1) {
			break; // No more URLs found
		}

		const endIndex = code.indexOf(endMarker, startIndex);
		if (endIndex === -1) {
			break; // Invalid URL format
		}

		const imageUrl = code.substring(startIndex, endIndex + endMarker.length);
		imageUrls.push(imageUrl);

		currentIndex = endIndex + endMarker.length;
	}

	console.log(imageUrls)

	const imageIds = imageUrls.map(url => {

		const parts = url.split('/');
		const imageId = parts[parts.length - 2];

		// Extract the file type from the URL
		const imageUrlRegex = /https:\/\/s3\.us-west-2\.amazonaws\.com\/secure\.notion-static\.com\/.*?\/(.*?\.(?:png|jpg|jpeg|gif|...))/g;
		const imageUrls = url.match(imageUrlRegex)[0];

		const fileType = imageUrls.substr(imageUrls.lastIndexOf('.') + 1);
		return { imageId, fileType, imageUrl: url };
	});

	console.log(imageIds);

	let i = 0;
	// Upload images to Cloudinary and replace URLs
	for (const { imageId, fileType, imageUrl } of imageIds) {
		const fileName = `${imageId}.${fileType}`;
		const cloudinaryUrl = await uploadImageToCloudinary({ imageUrl, fileName });
		code = code.replace(imageUrl, cloudinaryUrl);
	}

	return code;

}




async function getPages() {
	const pages = [];
	let cursor = undefined;

	while (true) {
		const response = await notionClient.databases.query({
			database_id: PAGE_ID,
			start_cursor: cursor,
		});

		pages.push(...response.results);
		cursor = response.next_cursor;

		if (!cursor) {
			break;
		}
	}

	// pages.sort((a, b) => a.properties.order.number - b.properties.order.number);
	return pages;
}

async function createMdFiles() {
	const pages = await getPages();

	for (let page of pages) {
		if (page.properties.public.checkbox === false) {
			continue;
		}

		const {
			title: _title,
			description: _description,
			slug: _slug,
			created_at: _created_at,
		} = page.properties;

		const title = _title.title[0].plain_text;
		const desc = _description.rich_text.reduce(
			(acc, cur) => acc + cur.plain_text,
			"",
		);
		const date = _created_at.date.start;

		const mdblocks = await n2m.pageToMarkdown(page.id);
		const mdString = n2m.toMarkdownString(mdblocks);

		const mdxHeader = `---
title: ${title}
description: ${desc}
date: ${date}
---
`;

		const actualContent = mdxHeader.concat(mdString.parent ?? "");

		const content = await urlConverter(actualContent);

		const key = _slug.rich_text.reduce((acc, cur) => acc + cur.plain_text, "");
		const path = `./content/blogs/${key}.mdx`;

		fs.writeFile(path, content, function (err) {
			if (err) throw err;
			console.log(`${title}.mdx file is created successfully.`);
		});
	}
}

createMdFiles().catch(console.error);
