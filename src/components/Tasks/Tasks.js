import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Container, Divider, Card} from 'semantic-ui-react';
import TaskForm from './TaskForm/TaskForm'
import Task from './TaskItem/TaskItem'

class Tasks extends Component {
    render() {
        return (
            <Container>
                <Container textAlign='left'>
                    <Link to='/home'>Back</Link>
                </Container>
                <Divider/>
                <Card.Group>
                    <TaskForm onSubmit={this.props.handleTaskAdd} isUpdate={false}/>
                    {
                        this.props.tasks.map(task => (
                            <Task
                                handleTaskDelete={this.props.handleTaskDelete}
                                handleTaskUpdate={this.props.handleTaskUpdate}
                                key={task.id}
                                id={task.id}
                                description={task.description}
                                duration={task.duration}
                                priority={task.priority}
                            />
                        ))
                    }
                </Card.Group>
            </Container>
        );
    }
}

export default Tasks
