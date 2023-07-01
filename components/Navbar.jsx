"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import logo from "@public/logo.png";
import placeholder from "@public/avatar-placeholder.jpeg";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
	const isLoggedIn = true;

	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const setProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setProviders();
	}, []);

	return (
		<nav className='flex items-center justify-between w-full px-4 mb-16 shadow-xl border-b-4'>
			<Link
				href='/'
				className='flex items-center justify-center'>
				<Image
					src={logo}
					alt='Prompt Share Logo'
					className='object-contain'
				/>
				<p className='hidden sm:block text-xl font-semibold'>Prompt Share</p>
			</Link>
			<div className='sm:flex hidden'>
				{isLoggedIn ? (
					<div className='flex gap-2 md:gap-4'>
						<Link href='/create-prompt'>
							<button className='bg-orange-200 p-3 border-2 border-black rounded-full hover:bg-orange-300 shadow'>
								Create Prompt
							</button>
						</Link>
						<button
							className='bg-orange-200 p-3 border-2 flex items-center border-black rounded-full hover:bg-orange-300 shadow'
							onClick={signOut}>
							Sign Out
							<FaSignOutAlt className='inline ml-2' />
						</button>

						<Link href='/profile'>
							<Image
								src={placeholder}
								alt='Profile'
								className='rounded-full shadow'
								width={50}
								height={50}
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className='bg-orange-200 p-3 border-2 flex items-center border-black rounded-full hover:bg-orange-300 shadow'>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
			<div className='sm:hidden flex relative'>
				{isLoggedIn ? (
					<div className='flex'>
						<Image
							src={placeholder}
							alt='Profile'
							className='rounded-full shadow cursor-pointer'
							width={50}
							height={50}
							onClick={() => setToggleDropdown((prev) => !prev)}
						/>
						{toggleDropdown && (
							<div className='absolute top-[69px] w-[200px] right-0 bg-gray-100 shadow-lg border-black border-[1px] rounded-xl p-6 flex flex-col gap-2'>
								<Link
									href='/profile'
									onClick={() => setToggleDropdown(false)}
									className='hover:bg-gray-200 p-2 rounded-lg text-sm'>
									MyProfile
								</Link>
								<Link
									href='/create-prompt'
									onClick={() => setToggleDropdown(false)}
									className='hover:bg-gray-200 p-2 rounded-lg text-sm inline'>
									Create Prompt
								</Link>
								<button
									className='bg-black text-gray-200 hover:bg-gray-200 shadow hover:text-black p-2 flex items-center rounded-lg text-sm'
									onClick={() => {
										signOut();
										setToggleDropdown(false);
									}}>
									Sign Out
									<FaSignOutAlt className='inline ml-2' />
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className='bg-orange-200 p-3 border-2 flex items-center border-black rounded-full hover:bg-orange-300 shadow'>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
