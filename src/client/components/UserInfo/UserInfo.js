import React from 'react';
import PropTypes from 'prop-types';

import Account from '../_svg/Account';
import Info from '../_svg/Info';

import './UserInfo.css';

export default class UserInfo extends React.Component {

    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        muiTheme: PropTypes.shape({
            palette: PropTypes.shape({
                primary1Color: PropTypes.string.isRequired
            }).isRequired,
        }).isRequired,
        user: PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    };

    render() {
        const { width, height, user } = this.props;
        return (
            <div className="user-info__container">
                {user ? (
                    <Account fill={this.props.muiTheme.palette.primary1Color} width={width} height={height}/>
                ) : (
                    <Info fill="#E1E1E1" width={width} height={height}/>
                )}
                <span className="user-info__text">{user ? user.name : 'Nicht angemeldet'}</span>
            </div>
        );
    }
}
