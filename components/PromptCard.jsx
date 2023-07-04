"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FaCheck, FaCopy, FaEdit, FaTrash, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();

	const [copied, setCopied] = useState("");

	const [liked, setLiked] = useState(post.likes.includes(session?.user.id));

	const [likes, setLikes] = useState(post.likes);

	const handleLike = async () => {
		try {
			const response = await fetch(`/api/prompt/${post._id}/like`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId: session?.user.id }),
			});

			if (response.ok) {
				setLiked(true);
				setLikes((prevLikes) => [...prevLikes, session?.user.id]);
				toast.success("Liked!");
			} else {
				toast.error("You need to be logged in to like a post!");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleUnlike = async () => {
		try {
			const response = await fetch(`/api/prompt/${post._id}/like`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId: session?.user.id }),
			});

			if (response.ok) {
				setLiked(false);
				const updatedPost = await response.json();
				setLikes(updatedPost.likes);
				toast.info("Unliked!");
			} else {
				toast.error("Error unliking post!");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleProfileClick = () => {
		if (post.creator._id === session?.user.id)
			return router.push("/user-profile");

		router.push(
			`/user-profile/${post.creator._id}?name=${post.creator.username}`
		);
	};

	const handleCopy = () => {
		setCopied(post.prompt);
		navigator.clipboard.writeText(post.prompt);
		toast.success("Copied to clipboard!");
		setTimeout(() => setCopied(false), 3000);
	};

	return (
		<div className='flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit'>
			<div className='flex justify-between items-start gap-2'>
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
			</div>

			<p className='my-4 text-sm text-gray-700'>{post.prompt}</p>
			<div className='flex gap-2'>
				{post.tags.map((tag, index) => (
					<p
						key={index}
						className='text-sm bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent cursor-pointer inline-block m-2 px-2 py-1 rounded'
						onClick={() => handleTagClick && handleTagClick(tag)}>
						#{tag}
					</p>
				))}
			</div>
			<div className='flex gap-2'>
				<div
					className='w-10 h-10 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer'
					onClick={handleCopy}>
					{copied === post.prompt ? (
						<FaCheck size={12} />
					) : (
						<FaCopy size={12} />
					)}
				</div>

				<div
					className='w-10 h-10 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer'
					onClick={liked ? handleUnlike : handleLike}>
					<FaHeart
						className={
							liked
								? "text-red-500 cursor-pointer"
								: "text-gray-500 cursor-pointer"
						}
					/>
					<span className='ml-1 text-sm'>{likes.length}</span>
				</div>
			</div>
			{session?.user.id === post.creator._id &&
				pathName === "/user-profile" && (
					<div className='mt-5 flex justify-center items-center gap-4 border-t border-gray-100 pt-3'>
						<FaEdit
							onClick={handleEdit}
							className='cursor-pointer'
						/>

						<FaTrash
							onClick={handleDelete}
							className='cursor-pointer'
						/>
					</div>
				)}
		</div>
	);
};

export default PromptCard;
