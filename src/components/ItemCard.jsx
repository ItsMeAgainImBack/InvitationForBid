import '../App.css'
import React from 'react'


export const ItemCard = ({ item, index, parentRef }) => {

	const onClick = (e) => {
		parentRef.handleClick(index)
	}

	return (
		<div className="w-96 h-52 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} onClick={onClick} >
			<fieldset className="flex flex-col justify-center">
				<h2 className="textfield font-bold text-2xl">{item.name}</h2>
				<p className="textfield font-bold text-xl">Preço Médio: R$ {item.avgPrice}</p>
				<p className="textfield">{item.description}</p>
			</fieldset>
		</div>
	)
}
