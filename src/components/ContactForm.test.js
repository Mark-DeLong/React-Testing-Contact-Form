import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'

test('User can fully fill out and submit form',  async () => {
   render(<ContactForm/>)

   const firstNameInp = screen.getByLabelText(/first name/i)
   const lastNameInp = screen.getByLabelText(/last name/i)
   const emailInp = screen.getByLabelText(/email/i)
   const mesgInp = screen.getByLabelText(/message/i)
     
   userEvent.type(firstNameInp, 'Bob')
   userEvent.type(lastNameInp, 'Ross')
   userEvent.type(emailInp, 'Bob@Ross.com')
   userEvent.type(mesgInp, 'Gonna put a happly little message right here')

   const button = screen.getByRole('button')

   userEvent.click(button)
  
   const newObj = await screen.findByText(/"firstName": "Bob", "lastName": "Ross", "email": "Bob@Ross.com", "message": "Gonna put a happly little message right here"/i)

   expect(newObj).toBeInTheDocument()
})

test('User can fully fill out form, submit, and no error',  async () => {
   render(<ContactForm/>)

   const fNameInput = screen.getByLabelText(/first name/i)
   const lNameInput = screen.getByLabelText(/last name/i)
   const emailInput = screen.getByLabelText(/email/i)
   const messageInput = screen.getByLabelText(/message/i)

   userEvent.type(fNameInput, 'Mark')
   userEvent.type(lNameInput, 'DeLong')
   userEvent.type(emailInput, 'm.delong@protonmail.com')
   userEvent.type(messageInput, 'If you can read this it works')

   const button = screen.getByRole('button')

   userEvent.click(button)

   const errorMessages =  screen.queryAllByText(/You dun goofed:/i)
     
   expect(errorMessages).toHaveLength(0)
})
