import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';

import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';

import ArticleStatusTag from '../ArticleStatusTag/ArticleStatusTag';
import AvatarTag from '../AvatarTag/AvatarTag';
import PhotoPlaceholder from '../PhotoPlaceholder/PhotoPlaceholder';

import './ArticleCard.css';

export default class ArticleCard extends React.Component {

    static propTypes = {
        article: PropTypes.object.isRequired,
        actions: PropTypes.array.isRequired
    };

    static defaultProps = {
        actions: []
    };

    render() {
        const { article, actions } = this.props;
        const { title, description, status, owner, categories, photos, created } = article;
        const name = (owner) ? owner.name : '';
        const categoryNames = (categories) ? categories.map(category => category.name).join(', ') : '';
        const mainPhoto = (photos && photos.length > 0) ? photos.find(photo => photo.isMain) : null;
        const photoSource = (mainPhoto) ? mainPhoto.url : photos && photos.length > 0 ? photos[0].url : null;
        return (
            <article className="article-card">
                <Card>
                    <div className="article-card__header">
                        <AvatarTag text={name} icon={<AccountIcon/>}/>
                        <AvatarTag text={`${moment(created).format('DD.MM.YYYY | HH:mm')}`} icon={<EditIcon/>}/>
                        <ArticleStatusTag status={status}/>
                    </div>
                    <CardMedia overlay={<CardTitle title={title} subtitle={categoryNames}/>}>
                        <div className="article-card__image-container">
                            {photoSource ? <img className="article-card__image" src={photoSource} alt={title}/> : <PhotoPlaceholder width={300} height={300}/>}
                        </div>
                    </CardMedia>
                    <CardText className="article-card__text">{description}</CardText>
                    <CardActions>{actions}</CardActions>
                </Card>
            </article>
        );
    }
}
