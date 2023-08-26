const { NotionToMarkdown } = require("notion-to-md");
const fs = require("fs");
const Notion = require("@notionhq/client");
require("dotenv").config();

const AUTH_SECRET_TOKEN = process.env.AUTH_SECRET_TOKEN;
const PAGE_ID = process.env.PAGE_ID;

const notionClient = new Notion.Client({ auth: AUTH_SECRET_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notionClient });

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

		const content = mdxHeader.concat(mdString.parent ?? "");

		const key = _slug.rich_text.reduce((acc, cur) => acc + cur.plain_text, "");

		const path = `./content/blogs/${key}.mdx`;

		fs.writeFile(path, content, function (err) {
			if (err) throw err;
			console.log(`${title}.mdx file is created successfully.`);
		});
	}
}

createMdFiles().catch(console.error);
