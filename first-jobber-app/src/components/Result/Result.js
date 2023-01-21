import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, ListGroupItem, Button, Table } from 'react-bootstrap';
import './Result.css'
import axios from 'axios';

const Result = (props) => {

    console.log(props);

    const filteredData = props.data.filter(item => item.name === props.tip);

    const DataList = () => {
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

    const [coverage, setCoverage] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/coverages")
            .then((res) => {
                setCoverage(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const filteredCoverage = coverage.filter(item => item.insuranceId.name === props.tip)

    const DataTable = () => {
        return (
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Own damaged</th>
                            <th>Body injury</th>
                            <th>Third party properties</th>
                            <th>Lost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCoverage.map((item, index) => (
                            <tr key={index}>
                                <td>{item.car}</td>
                                <td>{item.medicine}</td>
                                <td>{item.third_party}</td>
                                <td>
                                    {item.lost ? <p>Yes</p> : <p>None</p>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    };

    const OtherData = (props) => {
        const [selectedOption, setSelectedOption] = useState(null);

        const handleChange = (e) => {
            setSelectedOption(props.data.find(item => item.name === e.target.value));
        }

        return (
            <Container>
                <select onChange={handleChange} defaultValue={defaultOption}>
                    <option value='Select for more insurance' disabled>Select for more insurance</option>
                    {props.data.map((item, index) => (
                        <option key={index} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
                {selectedOption && (
                    <Card key={selectedOption.name}>
                        <Card.Header className='item-title'>{selectedOption.name}</Card.Header>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Class: {selectedOption.insurance_class}</ListGroupItem>
                            <ListGroupItem>Starter price: {selectedOption.price}</ListGroupItem>
                            <a href={selectedOption.urls} >For more detail</a>
                        </ListGroup>
                    </Card>
                )}
            </Container>
        );
    }



    return (
        <div>
            <h1>Thank you for taking the questionnaire! <br />This insurance might suit for you!</h1>
            <DataList
                data={props.data}
            />
            <br />
            <DataTable />
            <h2>Reach out for more information</h2>
            <OtherData data={props.data} />
            <Button className="try-again-button" href='/questionnaire'>Try again</Button>
        </div>

    );
};

export default Result;
