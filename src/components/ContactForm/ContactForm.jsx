import {Component} from 'react'
import PropTypes from 'prop-types';
import css from './ContactForm.module.css'

export class ContactForm extends Component {

state = {
name: '',
number: '',
}

handleInputChange = event => {
    const {name, value} = event.currentTarget
    this.setState( { [name] : value })
}

handleSubmit = event => {
event.preventDefault()
const {name, number} = this.state

this.props.addContact({name,number})
this.setState({
    name: '',
    number: '',
    })
}

render() {
    const {name, number} = this.state

    return (

        <form className={css.contactForm} onSubmit ={this.handleSubmit}>
        <label className={css.contactLabel}>
            <span>Name</span>
            <input 
            type='text' name='name'  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
                value={name}
                onChange={this.handleInputChange}
            />
        </label>

        <label className={css.contactLabel}>
            <span>Number</span>
            <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
            onChange={this.handleInputChange}
        />
        </label>

        <button type='submit'>Add contact</button>
        </form>
    )
}

}

ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired,
  };