import React, {Component} from 'react';
import {Button, Card} from 'semantic-ui-react';
import * as constants from '../../../configs/constants'
import TaskForm from '../TaskForm/TaskForm'

class TaskItem extends Component {
    state = {
        _updating: false
    };

    handleTaskUpdate = (updateData) => {
        this.props.handleTaskUpdate(Object.assign(updateData, {
            id: this.props.id
        }));

        this.setState({
            _updating: false,
        })
    };

    render() {
        if (this.state._updating) return (
            <TaskForm
                description = {this.props.description}
                duration = {this.props.duration}
                priority = {this.props.priority}
                onSubmit={this.handleTaskUpdate}
                isUpdate={true}
            />
        );
        else return (
            <Card fluid>
                <Card.Content textAlign='left' floated='left'>
                    <Card.Header>{this.props.description}</Card.Header>
                    <Card.Meta>{constants.TASK_DURATION_LABELS[this.props.duration]}</Card.Meta>
                    <Card.Meta>{constants.TASK_PRIORITY_LABELS[this.props.priority]}</Card.Meta>
                </Card.Content>
                <Card.Content>
                    <Button.Group basic>
                        <Button basic onClick={() => this.setState({_updating: true})}>
                            Update
                        </Button>
                        <Button basic onClick={() => this.props.handleTaskDelete(this.props.id)}>
                            Delete
                        </Button>
                    </Button.Group>
                </Card.Content>
            </Card>
        );
    }
}

export default TaskItem