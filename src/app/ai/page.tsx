import { Header } from "@/components/header";
import { ChatInterface } from "./_components/chat-interface";

export default function Home() {
	return (
		<>
			<Header />
			<main className="flex h-[calc(100vh-65px)] flex-col items-center justify-between">
				<ChatInterface />
			</main>
		</>
	);
}
