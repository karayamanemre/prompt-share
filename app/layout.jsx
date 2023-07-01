import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
	title: "Prompt Share",
	description: "Share your AI prompts with the world.",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className='bg-gradient-radial from-gray-100 from-10% via-sky-100 via-50% to-emerald-100 to-90% bg-no-repeat bg-cover min-h-screen'>
				<Provider>
					<main className='flex flex-col items-center'>
						<Navbar />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
}
