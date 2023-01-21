import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import './Result.css'

const Result = (props) => {
    console.log(props);
    const filteredData = props.data.filter(item => item.name === props.tip);

    const DataList = (data) => {
        return (
            <Container>
                {filteredData.map((item, index) => (
                    <Card key={index}>
                        <Card.Header className='item-title'>{item.name}</Card.Header>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Class: {item.insurance_class}</ListGroupItem>
                            <ListGroupItem>Starter price: {item.price}</ListGroupItem>
                            <a href={item.urls} >For more detail</a>
                        </ListGroup>
                    </Card>
                ))}
            </Container>
        );
    };

    return (
        <div>
            <h1>Thank you for taking the questionnaire! <br/>This insurance might suit for you!</h1>
            <DataList
                data={props.data}
            />
            <Button className="try-again-button" href='/questionnaire'>Try again</Button>
        </div>

    );
};

export default Result;
