import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
	return (
		<section className='w-full max-w-full flex justify-start items-start flex-col shadow-lg'>
			<h1 className='text-left mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl'>
				{type} Post
			</h1>
			<p className='text-left mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl'>
				{type} and share prompts.
			</p>

			<form
				onSubmit={handleSubmit}
				className='mt-8 w-full max-w-2xl flex flex-col gap-6 rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-5'>
				<label className='font-semibold text-gray-700 flex flex-col'>
					Your AI Prompt
					<textarea
						value={post.prompt}
						onChange={(e) => setPost({ ...post, prompt: e.target.value })}
						className='w-full shadow flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-500 outline-0 resize-none'
						required
						rows={6}></textarea>
				</label>

				<label className='font-semibold text-gray-700 flex flex-col'>
					Tag{" "}
					<span className='inline text-xs text-gray-600'>
						(#product, #marketing, #fiction, #webdevelopment, etc...)
					</span>
					<input
						value={post.tags}
						placeholder='tags, separated, by, commas'
						onChange={(e) => setPost({ ...post, tags: e.target.value })}
						className='w-full shadow flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0'
						required
					/>
				</label>
				<div className='flex items-center mx-3 mb-5 gap-3'>
					<Link
						href='/'
						className='text-gray-500 text-sm'>
						Cancel
					</Link>

					<button
						type='submit'
						disabled={submitting}
						className='text-sm rounded-full p-2 border-[1px] border-black shadow-lg hover:bg-emerald-100'>
						{submitting ? `${type}` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
