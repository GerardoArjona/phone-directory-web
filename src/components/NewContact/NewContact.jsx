import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getUserTok } from '../../services/auth'

import ReactNotification, {store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import '../../App.css';

function NewContact() {

    let history = useHistory();
    const [contactData, setContactData] = useState({
        addressLines:[
            ""
        ]
    });

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

    const save = (e) => {
        e.preventDefault()
        let tok = getUserTok()
        const header = {
            headers:{
                Authorization: `Bearer ${tok}` 
            }
        }
        axios.post(
            `${process.env.REACT_APP_API_URL}/v1/users/contacts`, contactData, header
        ).then( result =>{
                store.addNotification({
                    title: "New contact registered!",
                    message: "You've successfully registered a new contact",
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
                setTimeout(function(){ 
                    history.push("/")
                }, 1000); 
                
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
            <section className="container main-section">
            <form onSubmit={e => save(e)}>
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
                <div className="row justify-content-center mt-2">
                    <div className="col-md-6 col-lg-6 col-sm-10 col-10 text-center">
                        <button className="btn btn-save" type="submit" ><i className="fas fa-plus"></i> Register</button>
                    </div>
                </div>
            </form>
        </section>
        </React.Fragment>
    );
}

export default NewContact;
