import React, { useState } from 'react';
import axios from 'axios';
import { getUserTok } from '../../services/auth'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactNotification, {store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import '../../App.css';

function DeleteContact({deleting, cancelDeletion, contact, getUsers}) {

    const onDelete = (e) => {
        e.preventDefault()
        let tok = getUserTok()
        const header = {
            headers:{
                Authorization: `Bearer ${tok}` 
            }
        }
        axios.delete(
            `${process.env.REACT_APP_API_URL}/v1/users/contacts/${contact._id}`, header
        ).then( result =>{
                store.addNotification({
                    title: "Contact deleted!",
                    message: "You've successfully deleted a new contact",
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
                cancelDeletion();
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
            <Modal isOpen={deleting} toggle={cancelDeletion} >
                    <ModalHeader toggle={cancelDeletion} className="delete-modal-header">Warning!</ModalHeader>
                    <ModalBody>
                            Delete contact?
                    </ModalBody>
                    <ModalFooter>
                    <Button color="" className="btn-yes" onClick={onDelete}>Yes</Button>
                    <Button color="" className="btn-delete" onClick={cancelDeletion}>No</Button>
                    </ModalFooter>
                </Modal>
        </React.Fragment>
    );
}

export default DeleteContact;
