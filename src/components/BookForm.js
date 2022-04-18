import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';

/**
 * If props.book exists, use the value of props.book.bookname, otherwise use an empty string.
 * @param props - {
 */
const BookForm = (props) => {

    const [book, setBook] = useState(() => {
        return {
          bookname: props.book ? props.book.bookname : '',
          author: props.book ? props.book.author : '',
          quantity: props.book ? props.book.quantity : '',
          price: props.book ? props.book.price : '',
          date: props.book ? props.book.date : ''
        };
      });

    /* Destructuring the book object. */
    const [errorMsg, setErrorMsg] = useState('')
    const { bookname, author, price, quantity } = book

/**
 * It checks if all the fields are filled out, if they are, it creates a new book object and passes it
 * to the handleOnSubmit function in the parent component.
 * @param event - The event object
 */
    const handleOnSubmit = (event) => {
        event.preventDefault()
        const values = [bookname, author, price, quantity]
        let errorMsg = ''

        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim()
            return value !== '' && value !== '0';
        })

        if (allFieldsFilled) {
            const book = {
                id: uuidv4(),
                bookname,
                author,
                price,
                quantity,
                date: new Date()
            }
            props.handleOnSubmit(book)
        } else {
            errorMsg = 'Please fill out all the fields'
        }
        setErrorMsg(errorMsg)
    }

/**
 * If the input name is quantity, then if the value is empty or a number, set the state.
 * 
 * If the input name is price, then if the value is empty or a number with up to 2 decimal places, set
 * the state.
 * 
 * Otherwise, set the state.
 * @param event - The event object is a JavaScript event that is sent to an element when an event
 * occurs on the element.
 */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
          case 'quantity':
            if (value === '' || parseInt(value) === +value) {
              setBook((prevState) => ({
                ...prevState,
                [name]: value
              }));
            }
            break;
          case 'price':
            if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
              setBook((prevState) => ({
                ...prevState,
                [name]: value
              }));
            }
            break;
          default:
            setBook((prevState) => ({
              ...prevState,
              [name]: value
            }));
        }
    };

    return (
        <div className="main-form">
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <Form onSubmit={handleOnSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="bookname"
                        value={bookname}
                        placeholder="Enter name of book"
                        onChange={handleInputChange}
                        />
                </Form.Group>
                <Form.Group controlId="author">
                    <Form.Label>Book Author</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="author"
                        value={author}
                        placeholder="Enter name of author"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="number"
                        name="quantity"
                        value={quantity}
                        placeholder="Enter available quantity"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Book Price</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="price"
                        value={price}
                        placeholder="Enter price of book"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                    <Button variant="primary" type="submit" className="submit-btn">
                    Submit
                    </Button>
                </Form>
        </div>
    )
}

export default BookForm