import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Container, Divider} from 'semantic-ui-react';

class TaskCurrent extends Component {
    render() {
        if (this.props.task) return (
            <Container>
                <Container textAlign='left'>
                    <Link to='/home'>Back</Link>
                </Container>
                <Divider/>
                <div>
                    key={this.props.task.id}
                    id={this.props.task.id}
                    description={this.props.task.description}
                    duration={this.props.task.duration}
                </div>
            </Container>
        );
        else return (<div>Loading</div>)
    }
}

export default TaskCurrent