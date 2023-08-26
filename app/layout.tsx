import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
// import { Analytics } from "./components/analytics";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
	title: {
		default: "suryaumapathy.in",
		template: "%s | suryaumapathy.in",
	},
	description:
		"Passionate Full Stack Web Developer from Chennai, crafting innovative digital solutions during the tranquility of the night",
	openGraph: {
		title: "suryaumapathy.in",
		description:
			"Passionate Full Stack Web Developer from Chennai, crafting innovative digital solutions during the tranquility of the night",
		url: "https://suryaumapathy.in",
		siteName: "suryaumapathy.in",
		images: [
			{
				url: "https://suryaumapathy.in/og.png",
				width: 1920,
				height: 1080,
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "suryaumapathy",
		card: "summary_large_image",
	},
	icons: {
		shortcut: "/android-chrome-512x512.png",
	},
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<head></head>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
