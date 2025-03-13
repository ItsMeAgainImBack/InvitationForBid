import useSWR from 'swr'
import React, { useState } from 'react'
import { fetcher2 } from '../utils/defaults'
import { mutation } from '../utils/mutation'


const query = `{
  allItemGroups {
    id
    name
  }
}
`

export const GroupManagement = () => {
    const [selected, setSelected] = useState(0);
    const { data: itemGroups, error, isValidating, mutate } = useSWR(query, fetcher2)

    const deleteGroup = () => {
        mutation(`deleteItemGroup(id: ${parseInt(selected)})`)
        .then( (response) => {
            mutate() // atualiza as opções do dropdown
        })
        .catch((error) => console.error(error))
    }

    const createGroup = () => {
        mutation(`createItemGroup(name: "um novo grupo") { name }`)
        .then( (response) => {
            mutate() // atualiza as opções do dropdown
        })
        .catch((error) => console.error(error))
    }

	return (
    <>
        <div className="flex flex-row items-center">
            <p className="mr-2.5">Categoria: </p>
            <select className="mr-2.5" onChange={(e) => setSelected(e.target.value)} >{
                itemGroups ?
                itemGroups.data.allItemGroups.map( (group) => <option value={group.id} key={group.id} >{group.name}</option> ) :
                <option value={0} key={0} >No item group found</option>
            }
            </select>
            <button className="hover:bg-gray-300 hover:rounded-[50%] bg-transparent border-0 w-7 h-7" style={{'backgroundImage': 'url("icons/circle_minus.svg")'}} onClick={deleteGroup} />
            <button className="hover:bg-gray-300 hover:rounded-[50%] bg-transparent border-0 w-7 h-7" style={{'backgroundImage': 'url("icons/circle_plus.svg")'}} onClick={createGroup} />
        </div>
    </>
	)
}
