import React, {Component} from 'react';
import {Button, Form, Card} from 'semantic-ui-react';
import * as constants from '../../../configs/constants'

class TaskForm extends Component {

    state = {
        description: this.props.description || '',
        duration: this.props.duration || constants.TASK_ENUM_DURATION_SMALL,
        priority: this.props.priority || constants.TASK_ENUM_PRIORITY_DEFAULT
    };

    handleDescriptionChange = (e) => {
        this.setState({description: e.target.value})
    };

    handleDurationChange = (e, data) => {
        this.setState({duration: data.value})
    };

    handlePriorityChange = (e, data) => {
        this.setState({priority: data.value})
    };

    handleSubmit = () => {
        this.props.onSubmit({
            description: this.state.description,
            duration: this.state.duration,
            priority: this.state.priority
        });

        this.setState({
            description: '',
        })
    };

    render() {

        const durations = [
            {
                key: constants.TASK_ENUM_DURATION_SMALL,
                text: constants.TASK_DURATION_LABELS[constants.TASK_ENUM_DURATION_SMALL],
                value: constants.TASK_ENUM_DURATION_SMALL
            },
            {
                key: constants.TASK_ENUM_DURATION_MEDIUM,
                text: constants.TASK_DURATION_LABELS[constants.TASK_ENUM_DURATION_MEDIUM],
                value: constants.TASK_ENUM_DURATION_MEDIUM
            },
            {
                key: constants.TASK_ENUM_DURATION_LARGE,
                text: constants.TASK_DURATION_LABELS[constants.TASK_ENUM_DURATION_LARGE],
                value: constants.TASK_ENUM_DURATION_LARGE
            },
        ];

        const priorities = [
            {
                key: constants.TASK_ENUM_PRIORITY_LOW,
                text: constants.TASK_PRIORITY_LABELS[constants.TASK_ENUM_PRIORITY_LOW],
                value: constants.TASK_ENUM_PRIORITY_LOW
            },
            {
                key: constants.TASK_ENUM_PRIORITY_DEFAULT,
                text: constants.TASK_PRIORITY_LABELS[constants.TASK_ENUM_PRIORITY_DEFAULT],
                value: constants.TASK_ENUM_PRIORITY_DEFAULT
            },
            {
                key: constants.TASK_ENUM_PRIORITY_HIGH,
                text: constants.TASK_PRIORITY_LABELS[constants.TASK_ENUM_PRIORITY_HIGH],
                value: constants.TASK_ENUM_PRIORITY_HIGH
            },
        ];

        return (
            <Card fluid>
                <Card.Content textAlign='left' floated='left'>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Form.Input fluid placeholder='Description' value={this.state.description}
                                    onChange={this.handleDescriptionChange}/>
                        <Form.Dropdown fluid selection options={durations}
                                       placeholder='Duration' value={this.state.duration}
                                       onChange={this.handleDurationChange}/>

                        <Form.Dropdown fluid selection options={priorities}
                                       placeholder='Priority' value={this.state.priority}
                                       onChange={this.handlePriorityChange}/>

                        <Button type='submit' primary fluid>{(this.props.isUpdate) ? 'Update' : 'Add'}</Button>
                    </Form>
                </Card.Content>
            </Card>
        );
    }
}

export default TaskForm