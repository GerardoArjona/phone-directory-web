import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getUserTok } from '../../services/auth'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import '../../App.css';

function Home() {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
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
                    console.log(result.data)
                    setContacts(result.data.contacts)
                }
            ).catch(e => {
                setContacts([])
            })
        };
        fetchData();
	}, []);

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
                            </Tr>
                        </Thead>
                        <Tbody>
                            {contacts.map((contact) => {
                                return(
                                    <Tr key={contact._id}>
                                        <Td className="user-cels user-name-cel mobile-user-name">{contact.name}</Td>
                                        <Td className="user-cels">{contact.number}</Td>
                                        <Td className="user-cels">{contact.addressLines.map(address=> `address \n`)}</Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                    : 
                        <h1>No contacts registered...</h1>
                }
        </section>
    );
}

export default Home;
