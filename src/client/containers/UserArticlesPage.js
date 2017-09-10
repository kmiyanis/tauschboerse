import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ArticleComponent from '../components/ArticleComponent';
import * as Actions from '../actions/actions';
import { getUserArticles } from '../store/user';

class UserArticlesPage extends React.Component {

    componentDidMount() {
        const { userId } = this.props.match.params;
        this.props.loadUserArticles(userId);
    }

    render() {
        const { articles } = this.props;
        const articleComponents = articles.map(article =>
            <ArticleComponent key={article._id} article={article}/>
        );
        return (
            <div>
                {articleComponents}
            </div>
        );
    }
}

UserArticlesPage.propTypes = {
    articles: PropTypes.array.isRequired,
    loadUserArticles: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

function mapStateToProps(theState) {
    return {
        articles: getUserArticles(theState)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserArticlesPage);
