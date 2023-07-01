import Feed from "@components/Feed";

const Home = () => {
	return (
		<section className='w-full flex-center flex-col'>
			<h1 className='text-center font-semibold text-3xl'>Discover & Share</h1>
			<h4 className='text-xl text-center'>AI-Powered Prompts</h4>
			<p className='text-center text-lg mt-2 mx-10'>
				Welcome to Prompt Share, a place to discover and share creative AI
				prompts.
			</p>

			<Feed />
		</section>
	);
};

export default Home;
