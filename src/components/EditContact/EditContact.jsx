import React, { useState } from 'react';
import axios from 'axios';
import { getUserTok } from '../../services/auth'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactNotification, {store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import '../../App.css';

function EditContact({editing, cancelEdition, contact, getUsers}) {

    const [contactData, setContactData] = useState(contact);

    const handleUpdate = event => { 
        const {name, value} = event.target
        const data = {...contactData}
        data[name] = value
        setContactData(data)
    }

    const handleUpdateAddress = (event, index) => {
        const { value } = event.target
        let addresses = [...contactData.addressLines];
        let contact = {...contactData}
        addresses[index] = value;
        contact.addressLines = addresses;
        setContactData(contact);
    }

    const addEmptyAddress = () => {
        let addresses = [...contactData.addressLines];
        let contact = {...contactData}
        addresses.push('');
        contact.addressLines = addresses;
        setContactData(contact);
    }

    const onEdit = (e) => {
        let tok = getUserTok()
        const header = {
            headers:{
                Authorization: `Bearer ${tok}` 
            }
        }
        axios.put(
            `${process.env.REACT_APP_API_URL}/v1/users/contacts/${contact._id}`, contactData, header
        ).then( result =>{
                store.addNotification({
                    title: "Contact edited!",
                    message: "You've successfully edit the contact",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 1000,
                        onScreen: true
                    }
                });
                getUsers(); 
                cancelEdition();
            }
        ).catch(e => {
            store.addNotification({
                title: "Error!",
                message: "Something went wrong, try again",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                duration: 1000,
                onScreen: true
                }
            });
        })
    }

    return (
        <React.Fragment>
            <ReactNotification />
            <Modal isOpen={editing} toggle={cancelEdition} >
                    <ModalHeader toggle={cancelEdition} className="edit-modal-header">Edit contact</ModalHeader>
                    <ModalBody>
                    <form>
                        <div className="row justify-content-center mt-2">
                            <div className="col-md-6 col-lg-6 col-sm-10 col-10 text-center">
                                <div className="form-group text-center">
                                    <label htmlFor="" className="signup-text"><i className="fas fa-signature"></i> Name:</label>
                                    <input type="text" className="form-control text-center signup-text"
                                        name="name"
                                        value={contactData.name || ""}
                                        onChange={e => handleUpdate(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-2">
                            <div className="col-md-6 col-lg-6 col-sm-10 col-10 text-center">
                                <div className="form-group text-center">
                                    <label htmlFor="" className="signup-text"><i className="fas fa-phone"></i> Number:</label>
                                    <input type="text" className="form-control text-center signup-text"
                                        name="number"
                                        value={contactData.number || ""}
                                        onChange={e => handleUpdate(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-2">
                            <div className="col-md-6 col-lg-6 col-sm-10 col-10 text-center">
                                <div className="form-group text-center">
                                    <label htmlFor="" className="signup-text"><i className="fas fa-map-marked-alt"></i> Adress:</label>
                                    { contactData.addressLines.map((address, index)=>
                                        <input type="text" className="form-control text-center signup-text mt-2"
                                            name="address"
                                            value={contactData.addressLines[index] || ""}
                                            onChange={e => handleUpdateAddress(e, index)}
                                        />
                                    )

                                    }
                                    <button className="btn btn-save mt-2"  type="button" onClick={addEmptyAddress}><i className="fas fa-map-markero"></i> New address</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="" className="btn-yes" onClick={onEdit}>Yes</Button>
                    <Button color="" className="btn-delete" onClick={cancelEdition}>No</Button>
                    </ModalFooter>
                </Modal>
        </React.Fragment>
    );
}

export default EditContact;
