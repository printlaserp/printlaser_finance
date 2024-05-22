import CreateClient from "@components/CreateClient";
import React, { useState } from "react";
import Modal from "@components/Modal";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Clients } from "@prisma/client";
import { useRouter } from 'next/router';


export default function () {
    const router = useRouter()
    const [createClientModal, setCreateClientModal] = useState(false)
    const [searchText, setSearchText] = React.useState('')
    const [rows, setRows] = React.useState<Clients[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        fetch("/api/client")
            .then(async function (response) {
                const { data } = await response.json()
                setRows(data)
                console.log(data);
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {
                setLoading(false)
            });
    }, [])

    const openCreateClientModal = () => {
        setCreateClientModal(true)
    }

    const closeCreateClientModal = () => {
        setCreateClientModal(false)
    }

    const handleSearch = (event: any) => {
        setSearchText(event.target.value.toLowerCase());
    };

    // Filtrar rows com base no searchText
    const filteredRows = rows.filter((row) => {
        return row.name.toLowerCase().includes(searchText);
    });

    const columns = [
        {
            field: 'name',
            headerName: 'Nome',
            width: 300,
            editable: false,
        },
        {
            field: 'phone',
            headerName: 'Contato',
            width: 200,
            editable: false,
        },
        {
            field: 'compliant',
            headerName: 'Situação',
            width: 100,
            editable: false,
            valueGetter: (params: any) => Boolean(params.row.compliant) ? 'Adimplente' : 'Inadimplente'
        },

        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params) =>
        //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
    ]

    const handleRowClick = (params: any) => {
        router.push(`/app/credit/client?id=${params.id}`);
    };


    return (
        <>
            <div className="banner-turqueza fixed h-[24rem] w-full bg-gradient-to-r from-[#29B6D1] to-[#00C7C7]"></div>
            <div className="flex w-full h-screen justify-center items-center">
                <div className="content flex flex-col w-full max-w-[75rem] h-[40rem] z-10 mt-20 gap-4">
                    <div className="flex justify-between">
                        <input type="text" placeholder="Buscar Cliente" onChange={handleSearch} className="w-96 px-4 py-2 rounded-md shadow-2xl" />
                        <button type="button" className='bg-[#008282] hover:opacity-90 text-sm text-white py-2 px-4 border border-[#008282] rounded' onClick={openCreateClientModal}>
                            Novo Cliente
                        </button>
                    </div>
                    <div className='datagrid-container flex-1 flex flex-col text-white w-fill'>

                        <Box sx={{ color: 'white', height: '100%', width: '100%', bgcolor: 'white' }}>
                            <DataGrid
                                rows={filteredRows}  // Usa rows filtradas aqui
                                columns={columns}
                                disableRowSelectionOnClick
                                loading={loading}
                                onRowClick={handleRowClick}
                            />
                        </Box>
                    </div>
                </div>
            </div>
            {createClientModal && (
                <Modal onClose={closeCreateClientModal} isOpen={createClientModal}>
                    <CreateClient onClose={closeCreateClientModal} />
                </Modal>
            )
            }
        </>
    )
}
