/* eslint-disable */

import React, { Component } from 'react';
import { Menu, Table, Icon, Loader, Button } from 'semantic-ui-react';
import shortid from 'shortid';

const Listing = ({ thead, data, handleEdit, handleDelete }) => {
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    {thead.map(text =>
                        <Table.HeaderCell key={shortid.generate()}>{text}</Table.HeaderCell>
                    )}

                </Table.Row>
            </Table.Header>

            <Table.Body>
                {data.map(book =>
                    <Table.Row key={shortid.generate()}>
                        {thead.map(text =>
                            <Table.Cell key={shortid.generate()}>
                            {book[text.toLowerCase()]}</Table.Cell>
                        )}
                        <Table.Cell>
                            <Button onClick={() => handleEdit(book.id)} primary>Edit</Button>
                            <Button onClick={() => handleDelete(book.id)} color="red">Delete</Button>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='3'>
                        <Menu floated='right' pagination>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron left' />
                            </Menu.Item>
                            <Menu.Item as='a'>1</Menu.Item>
                            <Menu.Item as='a'>2</Menu.Item>
                            <Menu.Item as='a'>3</Menu.Item>
                            <Menu.Item as='a'>4</Menu.Item>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron right' />
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}
export default Listing;
// export default connect(mapStateToProps, { createBook, fetchBooksApi, deleteCV, copyCV })(Listing);
