import { FullScreenLoader } from "@/components/full-screen-loader";
import { Header } from "@/components/header";

export default function CartLoadingScreen() {
	return (
		<>
			<Header />
			<FullScreenLoader />
		</>
	);
}
