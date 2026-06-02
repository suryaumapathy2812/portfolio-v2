import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
	{ name: "Work", href: "/work" },
	{ name: "Posts", href: "/posts" },
	{ name: "Contact", href: "/contact" },
];

const highlights = [
	"Founding Engineer at Forever Learning",
	"Building Intervoo.ai for English speaking and interview readiness",
	"Voice AI agents, evaluations, learner diagnostics, and product infrastructure",
];

export default function Home() {
	return (
		<div className="relative flex flex-col items-center justify-center w-screen min-h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black px-6">
			<nav className="my-12 animate-fade-in md:my-16">
				<ul className="flex items-center justify-center gap-4">
					{navigation.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
						>
							{item.name}
						</Link>
					))}
				</ul>
			</nav>
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>
			<h1 className="flex flex-wrap z-10 text-6xl text-transparent text-center duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-7xl lg:text-9xl md:whitespace-nowrap bg-clip-text">
				Surya Umapathy
			</h1>

			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<section className="max-w-3xl my-12 text-center animate-fade-in md:my-16">
				<p className="text-base leading-7 text-zinc-300 md:text-xl md:leading-8">
					Founding Engineer at Forever Learning, building{" "}
					<Link
						href="https://www.intervoo.ai/"
						className="text-zinc-100 underline underline-offset-4 hover:text-white"
					>
						Intervoo.ai
					</Link>
					: voice AI for English speaking practice and interview readiness
					for learners across Bharat.
				</p>
				<div className="flex flex-wrap justify-center gap-3 mt-8">
					{highlights.map((highlight) => (
						<span
							key={highlight}
							className="rounded-full border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-xs text-zinc-400 md:text-sm"
						>
							{highlight}
						</span>
					))}
				</div>
				<p className="mt-8 text-sm leading-6 text-zinc-500 md:text-base">
					Previously at Freshworks/FSSA, with a track record across web
					applications, technical infrastructure, developer tools, and AI/ML
					experiments.
				</p>
			</section>
		</div>
	);
}
