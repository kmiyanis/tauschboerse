import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Icon, Button } from 'semantic-ui-react';

class ArticleComponent extends React.Component {
    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{this.props.title}</Card.Header>
                    <Card.Meta>{this.props.id}</Card.Meta>
                    <Card.Description>{this.props.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='user'/>{this.props.owner.name}
                </Card.Content>
                <Card.Content>
                    <Button><Link to={`/article/${this.props.id}`}>Detail</Link></Button>
                </Card.Content>
            </Card>
        );
    }
}

export default ArticleComponent;

ArticleComponent.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    owner: PropTypes.object.isRequired
};
