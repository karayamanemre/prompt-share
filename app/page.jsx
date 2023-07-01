import Feed from "@components/Feed";

const Home = () => {
	return (
		<section className='w-full flex-center flex-col'>
			<h1 className='text-center font-bold text-3xl'>Discover & Share</h1>
			<h4 className='text-xl font-semibold text-center'>AI-Powered Prompts</h4>
			<p className='text-center text-gray-700 text-lg mt-2 mx-10'>
				Welcome to Prompt Share, a place to discover and share creative AI
				prompts.
			</p>

			<Feed />
		</section>
	);
};

export default Home;
