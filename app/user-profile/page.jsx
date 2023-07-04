"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import ConfirmDialog from "@components/Confirm";

const MyProfile = () => {
	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);
	const [confirmDialog, setConfirmDialog] = useState(null);

	const router = useRouter();

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();

			setPosts(data);
		};

		if (session?.user.id) fetchPosts();
	}, []);

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		setConfirmDialog({
			title: "Delete Prompt",
			message: "Are you sure you want to delete your prompt?",
			onConfirm: async () => {
				try {
					await fetch(`/api/prompt/${post._id.toString()}`, {
						method: "DELETE",
					});

					const filteredPosts = posts.filter((p) => p._id !== post._id);

					setPosts(filteredPosts);
				} catch (error) {
					console.error(error);
				}
				setConfirmDialog(null);
			},
			onCancel: () => setConfirmDialog(null),
		});
	};

	return (
		<>
			<Profile
				name='My'
				desc='Your personalized profile page'
				data={posts}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
			{confirmDialog && (
				<ConfirmDialog
					title={confirmDialog.title}
					message={confirmDialog.message}
					onConfirm={confirmDialog.onConfirm}
					onCancel={confirmDialog.onCancel}
				/>
			)}
		</>
	);
};

export default MyProfile;
