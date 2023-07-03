"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import logo from "@public/logo.png";
import placeholder from "@public/avatar-placeholder.jpeg";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
	const { data: session } = useSession();

	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const setupProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setupProviders();
	}, []);

	return (
		<nav className='flex items-center justify-between w-full py-2 mb-16 '>
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
			<div className='sm:flex justify-center items-center hidden'>
				{session?.user ? (
					<div className='flex gap-2 md:gap-4'>
						<Link href='/create-prompt'>
							<button className='rounded-full border border-black bg-transparent py-1.5 px-5 text-black transition-all hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center'>
								Create Prompt
							</button>
						</Link>
						<button
							className='rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-transparent hover:text-black text-center text-sm font-inter flex items-center justify-center'
							onClick={signOut}>
							Sign Out
							<FaSignOutAlt className='inline ml-2' />
						</button>

						<Link href='/user-profile'>
							<Image
								src={session?.user.image || placeholder}
								alt='Profile'
								className='rounded-full shadow'
								width={35}
								height={35}
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
									className='bg-emerald-100 p-2 border-2 flex items-center border-black rounded-full hover:bg-emerald-100 shadow'>
									Sign In
									<FaSignInAlt className='inline ml-2' />
								</button>
							))}
					</>
				)}
			</div>
			<div className='sm:hidden flex relative'>
				{session?.user ? (
					<div className='flex'>
						<Image
							src={session?.user.image || placeholder}
							alt='Profile'
							className='rounded-full shadow cursor-pointer'
							width={50}
							height={50}
							onClick={() => setToggleDropdown((prev) => !prev)}
						/>
						{toggleDropdown && (
							<div className='absolute top-[69px] w-[200px] right-0 bg-gray-100 shadow-lg border-black border-[1px] rounded-xl p-6 flex flex-col gap-2'>
								<Link
									href='/user-profile'
									onClick={() => setToggleDropdown(false)}
									className='hover:bg-emerald-100 p-2 rounded-lg text-sm'>
									MyProfile
								</Link>
								<Link
									href='/create-prompt'
									onClick={() => setToggleDropdown(false)}
									className='hover:bg-emerald-100 p-2 rounded-lg text-sm inline'>
									Create Prompt
								</Link>
								<button
									className='bg-black text-gray-200 hover:bg-emerald-100 shadow hover:text-black p-2 flex items-center rounded-lg text-sm'
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
									className='bg-emerald-100 p-2 border-2 flex items-center border-black rounded-full hover:bg-emerald-100 shadow'>
									Sign In
									<FaSignInAlt className='inline ml-2' />
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
