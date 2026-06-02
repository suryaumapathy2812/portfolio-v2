import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const projects = [
	{
		title: "portainer-ce",
		subtitle: "Self-hosted container management setup",
		description:
			"A production-oriented VPS bootstrap for running Portainer Community Edition with Docker, reverse proxying, persistent volumes, log rotation, and repeatable server setup.",
		tags: ["Portainer", "Docker", "VPS", "Traefik", "DevOps"],
	},
];

export default function Work() {
	return (
		<main className="min-h-screen bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 text-zinc-100">
			<Navigation />
			<section className="container px-4 pt-32 pb-20 mx-auto md:pt-40">
				<div className="max-w-4xl">
					<p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
						Work
					</p>
					<h1 className="mt-4 text-4xl font-display md:text-6xl">
						Selected projects.
					</h1>
				</div>

				<div className="grid grid-cols-1 gap-6 mt-14 md:grid-cols-2">
					{projects.map((project) => (
						<Card key={project.title}>
							<article className="relative z-10 h-full p-6 md:p-8">
								<p className="text-sm text-zinc-500">{project.subtitle}</p>
								<h2 className="mt-3 text-2xl font-display text-zinc-100">
									{project.title}
								</h2>
								<p className="mt-4 text-sm leading-6 text-zinc-400">
									{project.description}
								</p>
								<div className="flex flex-wrap gap-2 mt-6">
									{project.tags.map((tag) => (
										<span
											key={tag}
											className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-500"
										>
											{tag}
										</span>
									))}
								</div>
							</article>
						</Card>
					))}
				</div>
			</section>
		</main>
	);
}
