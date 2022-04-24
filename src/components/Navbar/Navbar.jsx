import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bar from '../../assets/fontawesome/bars-solid.svg';
import xmark from '../../assets/fontawesome/xmark-solid.svg';
import './navbar.scss';

const Navbar = () => {
	const [isVisible, setVisible] = useState(false);
	const [isExpanded, setExpand] = useState(false);
	const [filter, setFilter] = useState('filter-white');
	const [icon, setIcon] = useState(bar);

	const changeStyle = () => {
		if (isVisible === false) {
			setVisible(true);
			setExpand(true);
			setIcon(bar);
			setFilter('filter-white');
		}

		if (isVisible === true) {
			setVisible(false);
			setExpand(false);
			setIcon(xmark);
			setFilter('filter-white');
		}
	};

	return (
		<div>
			<header className='primary-header flex' id='primary-header'>
				<div className='logo'></div>

				<button
					className='mobile-nav-toggle'
					aria-controls='primary-navigation'
					onClick={changeStyle}
					aria-expanded={isExpanded}>
					<img src={icon} className={filter} alt='bar' />
					<span className='sr-only'></span>
				</button>

				<nav>
					<ul
						id='primary-navigation flex'
						data-visible={isVisible}
						className='primary-navigation flex'>
						<li className='active'>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/map'>Map</Link>
						</li>
						<li>
							<Link to='/trains'>Info</Link>
						</li>
						<li>
							<Link to='/tickets'>Tickets</Link>
						</li>
						<li>
							<Link to='/contacts'>Contacts</Link>
						</li>
					</ul>
				</nav>
			</header>
			<div className='hr-primary'></div>
		</div>
	);
};

export default Navbar;
