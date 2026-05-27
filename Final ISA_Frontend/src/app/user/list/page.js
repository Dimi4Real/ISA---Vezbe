'use client';
import Link from "next/link";
import useListData from "@/hooks/useListData";
import DataTable from "react-data-table-component";
import {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner} from "reactstrap";
import {useTestActions} from "@/contexts/testContext";
import { testAction } from "@/contexts/testContext";
import {CiEdit, CiTrash} from "react-icons/ci";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import AllUserDialogs from "@/elements/User/AllUserDialogs";

export const tableColumns = [
    {
        name: 'First Name',
        selector: (row) => `${row.firstName}`,
        sortable: false
    },
    {
        name: 'Last Name',
        selector: (row) => `${row.lastName}`,
        sortable: false
    },
    {
        name: 'Contact Number',
        selector: (row) => `${row.contactNumber}`,
        sortable: false
    },
    {
        name: 'Options',
        selector: (row) => `${row.lastName}`,
        cell: (row) => {
            const {dispatch} = useListActions();

            return (
                <>
                    <Button className="btn btn-light mb-3" variant="outline-light" onClick={() => {
                        dispatch({
                            type: listAction.UPDATE,
                            payload: row
                        })
                    }}>
                        <CiEdit />
                    </Button>
                    <Button className="btn btn-light" variant="outline-light" onClick={() => {
                        dispatch({
                            type: listAction.DELETE,
                            payload: row
                        })
                    }}>
                        <CiTrash />
                    </Button>
                </>
            );
        },
        sortable: false
    },
]


//////////////////////////////////////////////////////
export default function UserList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const {state, dispatch} = useTestActions();

    const {getData, loading, data} = useListData(`user/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);

    useEffect(() => {
        getData(`user/get-page-list?pageNumber=${pageNumber-1}&pageSize=${pageSize}`);
    }, [pageSize, pageNumber]);

    useEffect(() => {
        if (state.reload)
        {
            getData(`user/get-page-list?pageNumber=${pageNumber+1}&pageSize=${pageSize}`);
        }
    }, [state])

    const handlePageChange = async (page) => {
        setPageNumber(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPageNumber(page);
        setPageSize(newPerPage);
    };

    return(
        <>


            <Row className="mb-3">
                <h5>Email: {state.email} </h5>
                <h5>First Name: {state.firstName} </h5>
                <Button className="btn btn-success mb-3" type="button" onClick={() => {
                    dispatch({
                        type: testAction.CHANGE_EMAIL,
                        payload: "bpapaz@singidunum.ac.rs"
                    });
                }}>
                    Change Email
                </Button>
                <Button className="btn btn-success" type="button" onClick={() => {
                    dispatch({
                        type: testAction.CHANGE_FIRST_NAME,
                        payload: "Bojan"
                    });
                }}>
                    Change First Name
                </Button>
            </Row>

            {data != null && <DataTable data={data.users}
                       columns={tableColumns}
                       striped={true}
                       noHeader={true}
                       pagination
                       paginationServer
                       progressPending={loading}
                       paginationTotalRows={data.totalElements}
                       onChangePage={handlePageChange}
                       onChangeRowsPerPage={handlePerRowsChange}
                       progressComponent={<Spinner color="danger">Ucitavanje...</Spinner>}
                       highlightOnHover
            />}
            <AllUserDialogs />
</>
    );
}