import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserTok } from '../../services/auth'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import DeleteContact from '../DeleteContact';
import '../../App.css';

function Home() {

    const [contacts, setContacts] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [toDeleteContact, setToDeleteContact] = useState('');

    const getUsers = () =>{
        let tok = getUserTok()
        const header = {
            headers:{
                Authorization: `Bearer ${tok}` 
            }
        }
        const fetchData = async () => {
            axios.get(
                `${process.env.REACT_APP_API_URL}/v1/users/contacts`, header
            ).then( result =>{
                    setContacts(result.data.contacts)
                }
            ).catch(e => {
                setContacts([])
            })
        };
        fetchData();
    }

    useEffect(() => {
        getUsers();
    }, []);
    
    const editContact = (event, index) => {

    }

    const deleteContact = (event, index) => {
        setIsDeleteModalOpen(true)
        setToDeleteContact(contacts[index])
    }

    const cancelDeletion = (event, index) => {
        setIsDeleteModalOpen(false)
        setToDeleteContact('')
    }

    return (
        <section className="container main-section">
            {contacts.length > 0 
                ?         			
                <Table className="users-table mb-3">
                    <Thead>
                        <Tr>
                        <Th className="users-cels-header mobile-user-name"><i className="fas fa-signature"></i> Name</Th>
                        <Th className="users-cels-header"><i className="fas fa-phone"></i> Number</Th>
                        <Th className="users-cels-header"><i className="fas fa-home"></i> Address</Th>
                        <Th className="users-cels-header"><i className="fas fa-home"></i> Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {contacts.map((contact, index) => {
                            return(
                                <Tr key={contact._id}>
                                    <Td className="user-cels user-name-cel mobile-user-name">{contact.name}</Td>
                                    <Td className="user-cels">{contact.number}</Td>
                                    <Td className="user-cels">{contact.addressLines.map(address=> `${address} \n`)}</Td>
                                    <Td className="user-cels">
                                        <button className="btn btn-save mt-2"  type="button"><i className="fas fa-pencil-alt"></i> Edit</button>
                                        <button className="btn btn-save mt-2"  type="button" onClick={e => deleteContact(e, index)}><i className="fas fa-trash"></i> Delete</button>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
                : 
                    <h1>No contacts registered...</h1>
            }
            {isDeleteModalOpen ? <DeleteContact deleting={isDeleteModalOpen} cancelDeletion={cancelDeletion} contact={toDeleteContact} getUsers={getUsers}/>: <React.Fragment></React.Fragment>}
        </section>
    );
}

export default Home;
