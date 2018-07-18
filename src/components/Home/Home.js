import React, {Component} from 'react';
import {Header, Container, Button, Item} from 'semantic-ui-react';
import * as constants from '../../configs/constants'
import {Link} from 'react-router-dom'

class Home extends Component {

    render() {
        if (this.props.user) {
            return (

                <Container>
                    <Header
                        as='h1'
                        content='Time fitness'
                        textAlign='center'
                    />
                    <Item.Group>
                        <Item>
                            <Header
                                as='h3'
                                content='You have spare...'
                                textAlign='center'
                            />
                        </Item>
                        <Item>
                            <Button fluid as={Link}
                                    to={'/current_task/' + constants.TASK_ENUM_DURATION_SMALL}>{constants.TASK_DURATION_LABELS[constants.TASK_ENUM_DURATION_SMALL]}</Button>
                        </Item>
                        <Item>
                            <Button fluid as={Link}
                                    to={'/current_task/' + constants.TASK_ENUM_DURATION_MEDIUM}>{constants.TASK_DURATION_LABELS[constants.TASK_ENUM_DURATION_MEDIUM]}</Button>
                        </Item>
                        <Item>
                            <Button fluid as={Link}
                                    to={'/current_task/' + constants.TASK_ENUM_DURATION_LARGE}>{constants.TASK_DURATION_LABELS[constants.TASK_ENUM_DURATION_LARGE]}</Button>
                        </Item>
                        <Item>
                            <Header
                                as='h3'
                                content='or...'
                                textAlign='center'
                            />
                        </Item>
                        <Item>
                            <Button fluid primary as={Link} to='/tasks'>
                                Add things to do
                            </Button>
                        </Item>
                    </Item.Group>
                </Container>

            )
        } else {
            return <div>Loading</div>
        }
    }
}

export default Home
