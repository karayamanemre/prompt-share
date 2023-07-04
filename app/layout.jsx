import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
	title: "Prompt Share",
	description: "Share your AI prompts with the world.",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className='bg-gradient-radial from-gray-100 from-10% via-sky-100 via-50% to-emerald-100 to-90% bg-no-repeat bg-cover min-h-screen'>
				<Provider>
					<main className='relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6'>
						<Navbar />
						{children}
					</main>
					<ToastContainer autoClose={3000} />
				</Provider>
			</body>
		</html>
	);
}
