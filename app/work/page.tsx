import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const currentWork = [
	{
		title: "Intervoo.ai",
		subtitle: "Voice AI for English speaking and interview readiness",
		description:
			"Building the core Forever Learning product surface: AI voice practice, CEFR-oriented speaking assessment, interview preparation, and detailed learner reports for individuals and institutes.",
		tags: ["Next.js", "TypeScript", "Tailwind", "Prisma", "LiveKit"],
	},
	{
		title: "Intervoo Diagnostics",
		subtitle: "Speaking assessment and learner reports",
		description:
			"Diagnostic workflows that capture sessions, transcripts, evaluation reports, and feedback loops so learners and teams can understand speaking readiness and progress.",
		tags: ["Diagnostics", "Reports", "Evaluation", "Streamlit", "Prisma"],
	},
	{
		title: "Intervoo Agents",
		subtitle: "LiveKit voice agents for practice and interviews",
		description:
			"Voice-agent systems across pre-screen, diagnostic, interview, and job-readiness flows, with work on long-running session stability and reusable agent templates.",
		tags: ["LiveKit", "Voice agents", "Prompting", "Python", "Runtime systems"],
	},
	{
		title: "Project Benchmark Dashboard",
		subtitle: "Evaluation and session tracking for voice AI quality",
		description:
			"A dashboard for evaluations, webhooks, and session tracking to make product and agent quality measurable instead of anecdotal.",
		tags: ["Next.js", "OpenAI", "Prisma", "Testing", "Evaluation"],
	},
];

const experiments = [
	{
		title: "VoxLM",
		description:
			"Modular ASR research direction: combine audio encoders and LLMs for context-aware transcription with word-level timestamps and confidence scoring.",
	},
	{
		title: "Aether / Core AI",
		description:
			"Multi-tenant voice-agent platform experiments with dashboard, orchestrator control plane, and per-user runtime agents.",
	},
	{
		title: "autoresearch",
		description:
			"Prompt-iteration harness adapted for voice AI tutoring: generate prompt variants, evaluate across models, save transcripts and scores, and select stronger prompts.",
	},
	{
		title: "Portainer VPS bootstrap",
		description:
			"Production-oriented VPS setup scripts for Docker Swarm, Traefik, Portainer, Dozzle, log rotation, overlay networks, persistent volumes, and node joins.",
	},
];

const earlierProjects = [
	"PageTrail Chrome extension",
	"Code-Chat VS Code extension",
	"Zord Slack bot",
	"Topic Tagging and ESLint Scoring GitHub Actions",
	"CSS/Flexbox playground tools",
	"Notify JS, PDF Generator, and Doc-Con AI document reader",
];

export default function Work() {
	return (
		<main className="min-h-screen bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 text-zinc-100">
			<Navigation />
			<section className="container px-4 pt-32 pb-20 mx-auto md:pt-40">
				<div className="max-w-4xl">
					<p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
						Current work
					</p>
					<h1 className="mt-4 text-4xl font-display md:text-6xl">
						Building voice AI products for Bharat.
					</h1>
					<p className="mt-6 text-lg leading-8 text-zinc-400">
						I am a Founding Engineer at{" "}
						<Link
							href="https://www.foreverlearning.in/"
							className="text-zinc-200 underline underline-offset-4 hover:text-white"
						>
							Forever Learning
						</Link>
						, building{" "}
						<Link
							href="https://www.intervoo.ai/"
							className="text-zinc-200 underline underline-offset-4 hover:text-white"
						>
							Intervoo.ai
						</Link>
						: AI-powered English speaking practice and interview preparation.
						My recent work spans web product engineering, LiveKit voice agents,
						diagnostics, evaluation dashboards, prompt iteration, and deployment
						infrastructure.
					</p>
					<p className="mt-4 text-base leading-7 text-zinc-500">
						Freshworks and FSSA remain an important part of my work history; this
						portfolio now leads with the Forever Learning / Intervoo work that is
						most current.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 mt-14 md:grid-cols-2">
					{currentWork.map((project) => (
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

				<section className="mt-20">
					<h2 className="text-3xl font-display">Related experiments</h2>
					<div className="grid grid-cols-1 gap-5 mt-8 md:grid-cols-2">
						{experiments.map((project) => (
							<div
								key={project.title}
								className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-6"
							>
								<h3 className="text-xl font-display text-zinc-200">
									{project.title}
								</h3>
								<p className="mt-3 text-sm leading-6 text-zinc-500">
									{project.description}
								</p>
							</div>
						))}
					</div>
				</section>

				<section className="mt-20">
					<h2 className="text-3xl font-display">Earlier projects</h2>
					<p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-500">
						Older portfolio projects are still part of the story, but I now keep
						them compact so the current voice-AI work is easier to find.
					</p>
					<ul className="grid grid-cols-1 gap-3 mt-6 text-sm text-zinc-400 md:grid-cols-2">
						{earlierProjects.map((project) => (
							<li key={project} className="rounded-lg border border-zinc-800 p-4">
								{project}
							</li>
						))}
					</ul>
				</section>
			</section>
		</main>
	);
}
