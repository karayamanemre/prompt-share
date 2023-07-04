import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const POST = async (request, { params }) => {
	try {
		await connectToDatabase();

		const { userId } = await request.json();

		const prompt = await Prompt.findById(params.id);

		if (!prompt) {
			return new Response("Prompt not found", { status: 404 });
		}

		if (prompt.likes.includes(userId)) {
			return new Response("You have already liked this prompt", {
				status: 400,
			});
		}

		prompt.likes.push(userId);

		await prompt.save();

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		return new Response("Failed to like the prompt", { status: 500 });
	}
};

export const PATCH = async (request, { params }) => {
	try {
		await connectToDatabase();

		const { userId } = await request.json();

		const prompt = await Prompt.findById(params.id);

		if (!prompt) {
			return new Response("Prompt not found", { status: 404 });
		}

		prompt.likes = prompt.likes.filter(
			(id) => id.toString() !== userId.toString()
		);

		await prompt.save();

		return new Response(JSON.stringify({ likes: prompt.likes }), {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return new Response("Failed to unlike the prompt", { status: 500 });
	}
};
