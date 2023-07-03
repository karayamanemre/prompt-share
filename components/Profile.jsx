"use client";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
	return (
		<section className='w-full'>
			<h1 className='text-left mt-5 text-4xl font-extrabold leading-[1.15] text-black sm:text-5xl'>
				{name} Profile
			</h1>
			<p className='mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl'>{desc}</p>
			<div className='mt-12 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
				{data.map((post) => (
					<PromptCard
						key={post._id}
						post={post}
						handleEdit={() => handleEdit && handleEdit(post)}
						handleDelete={() => handleDelete && handleDelete(post)}
					/>
				))}
			</div>
		</section>
	);
};

export default Profile;
