"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FaCheck, FaCopy } from "react-icons/fa";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();

	const [copied, setCopied] = useState("");

	const handleProfileClick = () => {
		console.log(post);

		if (post.creator._id === session?.user.id) return router.push("/profile");

		router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
	};

	const handleCopy = () => {
		setCopied(post.prompt);
		navigator.clipboard.writeText(post.prompt);
		setTimeout(() => setCopied(false), 3000);
	};

	return (
		<div className='flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit'>
			<div className='flex justify-between items-start gap-5'>
				<div
					className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
					onClick={handleProfileClick}>
					<Image
						src={post.creator?.image}
						alt='user_image'
						width={40}
						height={40}
						className='rounded-full'
					/>

					<div className='flex flex-col'>
						<h3 className='font-semibold text-gray-900'>
							{post.creator.username}
						</h3>
						<p className='text-sm text-gray-500'>{post.creator.email}</p>
					</div>
				</div>

				<div
					className='w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer'
					onClick={handleCopy}>
					{copied === post.prompt ? (
						<FaCheck size={12} />
					) : (
						<FaCopy size={12} />
					)}
				</div>
			</div>

			<p className='my-4 text-sm text-gray-700'>{post.prompt}</p>
			<div className='flex gap-2'>
				{post.tags.map((tag, index) => (
					<p
						key={index}
						className='text-sm bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent cursor-pointer'
						onClick={() => handleTagClick && handleTagClick(tag)}>
						#{tag}
					</p>
				))}
			</div>

			{session?.user.id === post.creator._id && pathName === "/profile" && (
				<div className='mt-5 flex justify-center items-center gap-4 border-t border-gray-100 pt-3'>
					<p
						className='text-sm bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent cursor-pointer'
						onClick={handleEdit}>
						Edit
					</p>
					<p
						className='text-sm bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent cursor-pointer'
						onClick={handleDelete}>
						Delete
					</p>
				</div>
			)}
		</div>
	);
};

export default PromptCard;
