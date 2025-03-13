import ReactDom from 'react-dom'
import React, { useState } from 'react'
import { mutation } from '../utils/mutation'
import ItemForm from '../components/ItemForm'


export const ItemSelect = ({inventory, parentRef}) => {
    const [selected, setSelected] = useState(0);

    const createItem = () => {
        const root = ReactDom.createRoot(document.getElementById('panel'));

        const itemForm = React.createElement(ItemForm, { id: null, parentRef: parentRef }, null);
        root.render(itemForm);
    }

    const deleteItem = () => {
        // const message = 'Deseja realmente excluir o item ?';

        mutation(`deleteItem`, { id: parseInt(selected) })
        .then( (response) => {
            parentRef.mutate() // atualiza o componente pai
            if (inventory)  {
                const firstItem = inventory.data.allItems[0]
                setSelected(firstItem.id)
                parentRef.setCurrentItem(firstItem.id)
            }
        })
        .catch((error) => console.error(error))
    }

	return (
    <>
        <div className="flex flex-row items-center">
            <p className="mr-2.5">Serviços: </p>
            <select onChange={(e) => setSelected(e.target.value)} >{
                inventory ?
                inventory.data.allItems.map( (item) => <option value={item.id} key={item.id} >{item.name}</option> ) :
                <option value={0} key={0} >No items found</option>
            }
            </select>
            <button className="hover:bg-gray-300 hover:rounded-[50%] bg-transparent border-0 w-7 h-7" style={{'backgroundImage': 'url("icons/circle_minus.svg")'}} onClick={deleteItem} />
            <button className="hover:bg-gray-300 hover:rounded-[50%] bg-transparent border-0 w-7 h-7" style={{'backgroundImage': 'url("icons/circle_plus.svg")'}} onClick={createItem} />
        </div>
    </>
    )
}
