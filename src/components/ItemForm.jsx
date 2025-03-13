import { request } from '../utils/request'
import { mutation } from '../utils/mutation'
import { notification} from '../utils/defaults'
import { useState, useEffect } from 'react'
import { Button, Dialog } from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'


export default function ItemForm({id, parentRef}) {
const [open, setOpen] = useState(true);

const close = () => {
    setOpen(false);
}

const [item, setItem] = useState({
  "name": "",
  "description": "",
  "avgPrice": 0.01,     // faz a coerção do tipo, API GraphQL fortemente tipada
  "unitOfMeasurement": ""
})

const onChange = (e) => {
  if (e.target.type === 'number') {
    // fixa em 2 casas decimais o valor do campo, API GraphQL fortemente tipada
    setItem({...item, [e.target.name]: parseFloat(e.target.value) + 0.01, })
    return;
  }

  setItem({...item, [e.target.name]: e.target.value, })
}

const handleSubmit = async (e) => {
    e.preventDefault();

    if (item.name === "" || item.description === "" || item.avgPrice === "") {
      toast.error('Alguns campos obrigatórios não foram preenchidos!', notification.options);
      return;
    }

    let operation = `createItem`
    let variables = item
    if (Number.isInteger(id)) {
      operation = `updateItem`
      variables = {...item, id: parseInt(id)}
    }
    mutation(operation, variables)
    .then( (response) => {
      parentRef.mutate() // atualiza o componente pai
      close()
    })
    .catch((error) => toast.error(error.message, notification.options))
}

return (
<>
    <Toaster />

    <Dialog open={open} onClose={close} >
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
					<label htmlFor="name" className="block text-gray-700 text-sm font-bold md-2">
						Serviço
					</label>
					<input type="text"
						name="name"
						value={item.name}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="description" className="block text-gray-700 text-sm font-bold md-2">
						Descrição
					</label>
					<input type="text"
						name="description"
						value={item.description}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="avgPrice" className="block text-gray-700 text-sm font-bold md-2">
						Preço médio
					</label>
					<input type="number" step={100}
						name="avgPrice"
						value={item.avgPrice}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>
				<button type="submit" className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white font-bold">
					Salvar
				</button>
    </form>
    </Dialog>
</>
)
}
