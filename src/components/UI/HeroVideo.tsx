import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const HeroVideo = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isMuted, setIsMuted] = useState(true);
	const [isPlaying, setIsPlaying] = useState(true);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) {
			return;
		}

		const handleCanPlay = () => setIsReady(true);
		const handlePlay = () => setIsPlaying(true);
		const handlePause = () => setIsPlaying(false);

		video.addEventListener("canplay", handleCanPlay);
		video.addEventListener("play", handlePlay);
		video.addEventListener("pause", handlePause);

		// Try to start playback immediately; browsers require muted autoplay.
		const playPromise = video.play();
		if (playPromise && typeof playPromise.catch === "function") {
			playPromise.catch(() => setIsPlaying(false));
		}

		return () => {
			video.removeEventListener("canplay", handleCanPlay);
			video.removeEventListener("play", handlePlay);
			video.removeEventListener("pause", handlePause);
		};
	}, []);

	const toggleMute = () => {
		const video = videoRef.current;
		if (!video) {
			return;
		}

		video.muted = !isMuted;
		setIsMuted(video.muted);
	};

	const togglePlay = () => {
		const video = videoRef.current;
		if (!video) {
			return;
		}

		if (isPlaying) {
			video.pause();
			return;
		}

		const playPromise = video.play();
		if (playPromise && typeof playPromise.catch === "function") {
			playPromise.catch(() => setIsPlaying(false));
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			className="relative w-full max-w-5xl mx-auto"
		>
			<div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-cyan-500/20 bg-black shadow-[0_30px_120px_-40px_rgba(14,165,233,0.6)]">
				<video
					ref={videoRef}
					autoPlay
					loop
					muted
					playsInline
					preload="metadata"
					  poster="/images/placeholder.svg"
					className="h-full w-full object-cover"
				>
					<source src="/videos/hero-intro.webm" type="video/webm" />
					<source src="/videos/hero-intro.mp4" type="video/mp4" />
				</video>

				{/* Lightweight overlay to preserve readability on desktop */}
				<div
					className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-black/35"
					aria-hidden="true"
				></div>

				{/* Loading shimmer shown until the video can play */}
				{!isReady && (
					<div className="absolute inset-0 flex items-center justify-center bg-black/50">
						<motion.span
							className="h-16 w-16 rounded-full border-2 border-cyan-400/40 border-t-cyan-400"
							animate={{ rotate: 360 }}
							transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
						>
							<span className="sr-only">Loading hero video</span>
						</motion.span>
					</div>
				)}

				{/* Controls */}
				<div className="pointer-events-none absolute bottom-4 right-4 flex gap-3">
					<button
						type="button"
						onClick={toggleMute}
						className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-cyan-100 backdrop-blur-sm transition hover:bg-black/70"
						aria-pressed={!isMuted}
					>
						{isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
						<span className="sr-only">Toggle sound</span>
					</button>

					<button
						type="button"
						onClick={togglePlay}
						className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-cyan-100 backdrop-blur-sm transition hover:bg-black/70"
						aria-pressed={isPlaying}
					>
						{isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
						<span className="sr-only">Toggle playback</span>
					</button>
				</div>
			</div>

			{/* Guidance note for missing assets */}
					<p className="sr-only">
						Add hero-intro.mp4 and hero-intro.webm inside public/videos to enable the hero video.
					</p>
		</motion.div>
	);
};

export default HeroVideo;
