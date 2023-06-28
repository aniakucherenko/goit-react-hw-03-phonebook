import React from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import css from './App.module.css';

export class App extends React.Component {
 state= {
  contacts: [],
  filter: ''
 }

 addContactItem = ({ name, number }) => {
  const isAlreadyInContacts = this.preventAddingSameContact(name);
  if (isAlreadyInContacts) {
    alert(`${name} is already in contacts!`);
    return;
  }

  const newContact = { id: nanoid(), name, number };
  this.setState(prevState => ({
    contacts: [...prevState.contacts, newContact],
  }));
};

deleteContactItem = contactId => {
  this.setState(prevState => ({
    contacts: prevState.contacts.filter(contact => contact.id !== contactId),
  }));
};

 handleFilterInputChange = event => {
  this.setState({ filter: event.target.value });
};

getFilteredContacts = () => {
  const { contacts, filter } = this.state;
  const normalizedFilter = filter.toLowerCase().trim();

  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};

preventAddingSameContact = name => {
  const { contacts } = this.state;
  const normalizedName = name.toLowerCase();

  return contacts.find(
    contact => contact.name.toLowerCase() === normalizedName
  );
};


render(){
  const { contacts, filter } = this.state;
  const filteredContacts = this.getFilteredContacts();

  return(
   <div className={css.container}>
   <h1 className={css.title}>Phonebook</h1>
   <ContactForm addContact={this.addContactItem}/>
   <h2 className={css.title}>Contacts</h2>
   <Filter
          filterValue={filter}
          onFilterChange={this.handleFilterInputChange}
        />
        {contacts.length === 0 ? (
          <h3>There are no contacts in your phone book.</h3>
        ) : (
        
          <ContactList
          
            contacts={filteredContacts}
            onDeleteContact={this.deleteContactItem}
          
          />
        )}
   </div>

  )

}

}


