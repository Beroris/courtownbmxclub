import Navigation from "./components/Navigation";
import Carousel from "./components/Carousel";
import Welcome from "./components/Welcome";

export default function Home() {
	return (
		<main>
			<Navigation />
			<Carousel />
			<Welcome />
		</main>
	);
}
