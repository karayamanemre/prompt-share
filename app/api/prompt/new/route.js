import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const POST = async (request) => {
	const { userId, prompt, tags } = await request.json();
	try {
		await connectToDatabase();
		const tagArray = tags.split(",").map((tag) => tag.trim());
		const newPrompt = new Prompt({ creator: userId, prompt, tags: tagArray });
		await newPrompt.save();
		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		return new Response("Failed to create a new prompt", { status: 500 });
	}
};
