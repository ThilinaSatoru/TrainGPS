import React from 'react';

function Orders() {
	let value = localStorage.getItem('name');

	return (
		<div>
			<h1>{value}</h1>
		</div>
	);
}

export default Orders;
