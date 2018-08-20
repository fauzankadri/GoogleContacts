import React from 'react';
import { withRouter } from 'react-router-dom';
import './Display.css'

const Display = (props) => {
    const { allContacts, ranks, history } = props;
    let i = ranks; // store as i b/c props are const, can't be modified
    return (
        <div className="Table-container">
            <table className="Table">
                <thead className="Table-head">
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Birthday</th>
                    </tr>
                </thead>
                <tbody className="Table-body">
                    {allContacts.map((contact) => (
                        <tr key={contact.resourceName} onClick={() => history.push(`/contact/${contact.resourceName.split('/')[1]}`)} >
                            <td>
                                {(i++) + ". "}{contact.names[0].displayName}
                            </td>
                            <td>
                                {contact.genders ? contact.genders[0].formattedValue : "Unknown"}
                            </td>
                            <td>
                                {contact.birthdays ? (contact.birthdays[0].date.month + '/' + contact.birthdays[0].date.day) : "Unknown"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default withRouter(Display);