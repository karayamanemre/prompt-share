"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className='mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [allPosts, setAllPosts] = useState([]);

	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState([]);

	const fetchPosts = async () => {
		const response = await fetch("/api/prompt");
		const data = await response.json();

		setAllPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const filterPrompts = (searchtext) => {
		const regex = new RegExp(searchtext, "i");
		return allPosts.filter(
			(item) =>
				regex.test(item.creator.username) ||
				regex.test(item.tag) ||
				regex.test(item.prompt)
		);
	};

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterPrompts(e.target.value);
				setSearchedResults(searchResult);
			}, 500)
		);
	};

	const handleTagClick = (tagName) => {
		setSearchText(tagName);

		const searchResult = filterPrompts(tagName);
		setSearchedResults(searchResult);
	};

	return (
		<section className='mt-16 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2'>
			<form className='relative w-full flex justify-center items-center'>
				<input
					type='text'
					placeholder='Search for a tag or a username'
					value={searchText}
					onChange={handleSearchChange}
					required
					className='block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0 peer'
				/>
			</form>

			{/* All Prompts */}
			{searchText ? (
				<PromptCardList
					data={searchedResults}
					handleTagClick={handleTagClick}
				/>
			) : (
				<PromptCardList
					data={allPosts}
					handleTagClick={handleTagClick}
				/>
			)}
		</section>
	);
};

export default Feed;
