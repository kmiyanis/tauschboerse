import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Home from 'material-ui/svg-icons/action/home';
import Business from 'material-ui/svg-icons/communication/business';
import List from 'material-ui/svg-icons/action/list';
import CompareArrows from 'material-ui/svg-icons/action/compare-arrows';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import FirstPage from 'material-ui/svg-icons/navigation/first-page';

import { getUser } from '../selectors/user';
import { logout } from '../actions/user';

class NavigationComponent extends React.Component {

    static propTypes = {
        closeMenu: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    openMenuItem = (theLink) => {
        this.props.closeMenu();
        this.props.history.push(theLink);
    };

    onLogout = () => {
        this.props.closeMenu();
        this.props.logout();
        this.props.history.push('/');
    };

    render() {
        const { user } = this.props;
        let userTransactionsLink = '/';
        let userArticlesLink = '/';
        let userDetailsLink = '/';
        if (user) {
            userTransactionsLink = `/user/${user._id}/transactions`;
            userArticlesLink = `/user/${user._id}/articles`;
            userDetailsLink = `/user/${user._id}/details`;
        }
        return (
            <Menu>
                <MenuItem primaryText="Home" leftIcon={<Home/>} onClick={this.openMenuItem.bind(this, '/')}/>
                <MenuItem primaryText="Marktplatz" leftIcon={<Business/>} onClick={this.openMenuItem.bind(this, '/marketplace')}/>
                <Divider/>
                {user && <MenuItem primaryText="Tauschgeschäfte" leftIcon={<CompareArrows/>} onClick={this.openMenuItem.bind(this, userTransactionsLink)}/>}
                {user && <MenuItem primaryText="Artikel" leftIcon={<List/>} onClick={this.openMenuItem.bind(this, userArticlesLink)}/>}
                {user && <MenuItem primaryText="Profil" leftIcon={<AccountCircle/>} onClick={this.openMenuItem.bind(this, userDetailsLink)}/>}
                {user && <Divider/>}
                {user && <MenuItem primaryText="Logout" leftIcon={<FirstPage/>} onClick={this.onLogout}/>}
                {!user && <MenuItem primaryText="Login" leftIcon={<LockOpen/>} onClick={this.openMenuItem.bind(this, '/login')}/>}
                {!user && <MenuItem primaryText="Registrieren" leftIcon={<PersonAdd/>} onClick={this.openMenuItem.bind(this, '/registration')}/>}
            </Menu>
        );
    }
}

function mapStateToProps(theState) {
    return {
        user: getUser(theState)
    };
}

export default withRouter(connect(mapStateToProps, { logout })(NavigationComponent));
