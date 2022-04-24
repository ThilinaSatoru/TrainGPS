import React from 'react';
import './header.scss';

const Header = () => {
	return (
		<div className='header'>
			<h1 className='tracking-in-contract'>Sri Lanka Railways</h1>
			<div className='box'>
				<h2>Live </h2>
				<h2 id='subH2'>GPS trains</h2>
				<p>
					Watch your Transport Live. And dont miss your train and dont
					waste your time.
				</p>
			</div>
		</div>
	);
};

export default Header;
