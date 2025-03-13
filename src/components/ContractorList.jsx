import ReactDom from 'react-dom';
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast, { Toaster } from "react-hot-toast";
import { request } from '../utils/request';
import { mutation } from '../utils/mutation';
import { notification } from '../utils/defaults';
import ClickableField from './ClickableField';
import ContractorForm from './ContractorForm';
import ConfirmationDialog from './ConfirmationDialog';


// const url = '/api/graphql'
const query = `
  allContractors {
	id
	companyName
	email
	contactPerson
  }
`

export default function ContractorList() {
	const [contractors, setContractors] = useState([]);

	const getContractors = async () => {
      const { data: response } = await request(query);
	  setContractors(response.data.allContractors);
	}

	useEffect(() => {
	  getContractors()
	}, []);

    const columns = [
		{ field: 'id', headerName: 'Id', width: 80 },
		{ field: 'companyName', headerName: 'Company Name', width: 250, renderCell: (params) => 
			<ClickableField rowId={params.row.id} label={params.row.companyName} parentRef={{ getContractors }}></ClickableField> },
		{ field: 'email', headerName: 'E-mail', width: 250 },
		{ field: 'contactPerson', headerName: 'Contact Person', width: 250 }
	]

	function insertContractor() {
        const root = ReactDom.createRoot(document.getElementById('panel'));

        const contractorForm = React.createElement(ContractorForm, {id: undefined, parentRef: { getContractors } }, null);
		root.render(contractorForm);
	}

	function deleteContractor() {
		const root = ReactDom.createRoot(document.getElementById('panel'));

		if (selectionModel.length < 1){
            toast.error("Favor selecionar os registros para exclusão.", notification.options);
            return;
		}

		const message = 'Deseja realmente excluir estes registros ?';
        const confirmationDialog = React.createElement(ConfirmationDialog, {message, handleResult}, null);
		root.render(confirmationDialog);
	}

	const handleResult = (result) => {
        // apos confirmação exlcui os registros
		if (result) {
			const promises = selectionModel.map(async (id) => { mutation(`deleteContractor`, { id: parseInt(id) }, ) })
			Promise.all(promises)
				.then(() => { getContractors() } )  // Refresh da lista de Contractors
				.catch((error) => { toast.error(error.message) })
		}		
	}

	const [selectionModel, setSelectionModel] = useState([]);

	return (
	<>
		<Toaster />

		<Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteContractor} >Excluir</Button>
		<Button variant="outlined" startIcon={<AddCircleIcon />} onClick={insertContractor} >Novo</Button>
		<div className="w-full h-96 overscroll-none">
			<DataGrid columns={columns} rows={contractors} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection
				onSelectionModelChange={setSelectionModel} selectionModel={selectionModel} />
		</div>
	</>
	)
}
