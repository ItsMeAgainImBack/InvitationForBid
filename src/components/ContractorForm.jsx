import { useState, useEffect } from 'react'
import { Dialog } from '@mui/material'
import Draggable from 'react-draggable'
import toast, { Toaster } from 'react-hot-toast'
import { request } from '../utils/request'
import { mutation } from '../utils/mutation'
import { fetcher2, notification } from '../utils/defaults'


export default function ContractorForm({id, parentRef}) {
	const [open, setOpen] = useState(true);

	const close = () => {
		setOpen(false);
	}

	const [contractor, setContractor] = useState({
        "companyName": "",
        "email": "",
        "contactPerson": "",
        "logoImage": "",
        "imgFormat": ""
	})

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (contractor.companyName === "" || contractor.email === "" || contractor.contactPerson === "") {
			toast.error('Alguns campos obrigatórios não foram preenchidos!', notification.options);
			return;
		}

		try {
			if (id === undefined) {
                mutation(`createContractor`, contractor)
			} else {
                mutation(`updateContractor`, {...contractor, id: parseInt(id)})
			}
		} catch (error) {
			toast.error(error.message, notification.options);
			return;
		}

		toast.success('Registro salvo com sucesso', notification.options);
		parentRef.getContractors();  // Refresh da lista de Contractors
		console.log(parentRef.getContractors);
		close();
	}

	const onChange = (e) => {
		if (e.target.type === 'file') {
			const file = e.target.files[0];
			// Reads the file using the FileReader API
			const reader = new FileReader();
			reader.onloadend = () => {
				const fileData = reader.result.split(';base64,');
				let fileFormat = fileData[0].replace('data:', '') + ';base64'
				let fileContents = fileData[1];
				setContractor({...contractor,'imgFormat': fileFormat, 'logoImage': fileContents, })
			}
			reader.readAsDataURL(file);
		}

		setContractor({...contractor, [e.target.name]: e.target.value, })
	}

	useEffect(() => {
		if (id) {
			// const url = '/api/graphql'
			const query = `getContractor(id: ${parseInt(id)}) {
				companyName
				email
				contactPerson
				logoImage
				imgFormat
			}`
			request(query)
			.then((response) => setContractor(response.data.data.getContractor))
			.catch((error) => toast.error(error, notification.options))
		}
	}, []);

	return (
	<>
		<Toaster />

		<Draggable>
		<Dialog open={open} onClose={close} BackdropProps={{ style: { backgroundColor: "transparent" } }} >
			<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<div className="mb-4">
					<label htmlFor="companyName" className="block text-gray-700 text-sm font-bold md-2">
						Company Name
					</label>
					<input type="text"
						name="companyName"
						value={contractor.companyName}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="email" className="block text-gray-700 text-sm font-bold md-2">
						E-mail
					</label>
					<input type="text"
						name="email"
						value={contractor.email}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="contactPerson" className="block text-gray-700 text-sm font-bold md-2">
						Contact Person
					</label>
					<input type="text"
						name="contactPerson"
						value={contractor.contactPerson}
						className="shadow appearance  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={onChange}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="logoImage" className="block text-gray-700 text-sm font-bold md-2">
						Company Logo
					</label>
					<div className="bg-gray-400 flex flex-col w-48">
						<input type="file" name="logoImage" accept=".gif,.jpg,.jpeg,.png" onChange={onChange} />
						<img className="w-full" src={"data:" + contractor.imgFormat + ", " + contractor.logoImage} alt={contractor.nome}></img>
					</div>
				</div>
				<input type="hidden" name="imgFormat" value={contractor.imgFormat} onChange={onChange} />

				<button type="submit" className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white font-bold">
					Salvar
				</button>
			</form>
		</Dialog>
		</Draggable>
	</>
	)
}
