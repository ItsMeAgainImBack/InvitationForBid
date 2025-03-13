import useSWR from 'swr'
import React, { useState } from 'react'
import { fetcher2 } from '../utils/defaults'
import { mutation } from '../utils/mutation'


const query = `{
  allContractors {
    id
    companyName
  }
}
`

export const ContractorSelect = ({parentRef}) => {
    const [selected, setSelected] = useState(0);
    const { data: companies, error, isValidating, mutate } = useSWR(query, fetcher2)

    const deleteContractor = () => {
        // const message = 'Deseja realmente excluir a empresa ?';

        mutation(`deleteContractor`, { id: parseInt(selected) })
        .then( (response) => {
            mutate() // atualiza as opções do dropdown
            parentRef.mutate() // atualiza o componente pai
        })
        .catch((error) => console.error(error))
    }

	return (
        <>
            <select onChange={(e) => setSelected(e.target.value)} >{
                companies ?
                companies.data.allContractors.map( (opt) => <option value={opt.id}>{opt.companyName}</option> ) :
                <option value={0} key={0} >No contractors found</option>
            }
            </select>
            <button onClick={deleteContractor} >Retirar do Site</button>
        </>
    )
}
