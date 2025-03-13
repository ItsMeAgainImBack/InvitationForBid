import '../App.css'


export const Navbar = () => {

	return (
		<nav className="navbar">
			<ul className="list-none flex flex-row">
				<li className="navitem text-[#F2F2F2] hover:text-black hover:bg-[#DDD]" ><a href="/">Home</a></li>
				<li className="navitem text-[#F2F2F2] hover:text-black hover:bg-[#DDD]" ><a href="/items">Items</a></li>
				<li className="navitem text-[#F2F2F2] hover:text-black hover:bg-[#DDD]" ><a href="/contractors">Contractors</a></li>
			</ul>
		</nav>
	)
}
