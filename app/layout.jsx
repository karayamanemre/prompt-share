import Navbar from "@components/Navbar";
import "@styles/globals.css";

export const metadata = {
	title: "Prompt Share",
	description: "Share your AI prompts with the world.",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className='bg-gray-200'>
				<main className='flex flex-col items-center'>
					<Navbar />
					{children}
				</main>
			</body>
		</html>
	);
}
