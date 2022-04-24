import React from 'react';
import './footer.scss';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='col span_1_of_2' id='foot-col-left'>
				<h4>
					Company &nbsp;
					<ul>
						<li>
							<a href='#'>About Us</a>
						</li>
						<li>&#124;</li>
						<li>
							<a href='#'>Careers</a>
						</li>
						<li>&#124;</li>
						<li>
							<a href='#'>Press Room</a>
						</li>
						<li>&#124;</li>
						<li>
							<a href='../PAGES/contact.php'>Contact Us</a>
						</li>
					</ul>
				</h4>

				<h4>
					Shop &nbsp;
					<ul>
						<li>
							<a href='#'>Location</a>
						</li>
						<li>&#124;</li>
						<li>
							<a href='../PAGES/products.php'>Products</a>
						</li>
						<li>&#124;</li>
						<li>
							<a href='#'>Exclusives</a>
						</li>
						<li>&#124;</li>
						<li>
							<a href='#'>Newsletter</a>
						</li>
					</ul>
				</h4>

				<h4>
					Razor.com &nbsp;
					<ul>
						<li>
							Copyright © 2021 Razer Inc. All rights reserved. &nbsp;
						</li>
						<li>
							<a href='#'>Legal Terms</a>
						</li>
					</ul>
				</h4>
			</div>

			<div className='col span_1_of_2' id='foot-col-right'>
				<ul id='green'>
					<li>SAFETY & PUNCTUAL™ &nbsp; </li>
					<li>
						<a href='https://twitter.com'>
							<ion-icon id='twitter' name='logo-twitter'></ion-icon>
						</a>
					</li>
					<li>
						<a href='https://www.youtube.com'></a>
					</li>
					<li>
						<a href='https://www.facebook.com'></a>
					</li>
					<li>
						<a href='https://www.twitch.tv'>
							<ion-icon id='twitch' name='logo-twitch'></ion-icon>
						</a>
					</li>
				</ul>
				&nbsp;
				<div className='row'>
					<ul>
						<h4>Srilanka</h4>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
