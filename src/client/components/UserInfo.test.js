import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import UserInfo from './UserInfo';
import User from '../../shared/businessobjects/User';

Enzyme.configure({ adapter: new Adapter() });

const createUser = () => {
    return new User({
        _id: '1',
        name: 'Max Mustermann',
        email: 'max@mustermann.com'
    });
};

describe('UserInfo', () => {
    test('Test that user info component shows that no user is logged in.', () => {
        const component = shallow(<UserInfo width={100} height={100} muiTheme={{ palette: { primary1Color: "#E1E1E1" } }}/>);
        const spanElement = component.find('.user-info__text');
        expect(spanElement.text()).toEqual('Nicht angemeldet');
    });
    test('Test that user info component shows correct user information.', () => {
        const user = createUser();
        const component = shallow(<UserInfo width={100} height={100} user={user} muiTheme={{ palette: { primary1Color: "#00BCD4" } }}/>);
        const spanElement = component.find('.user-info__text');
        expect(spanElement.text()).toEqual('Max Mustermann');
    });
    test('Test that user info component gives an error in the console if user has no name (PropType check).', () => {
        let consoleSpy = jest.spyOn(console, 'error');
        consoleSpy.mockImplementation((theLogMessage) => {
            expect(theLogMessage).toEqual(expect.stringContaining('Failed prop type: The prop `user.name` is marked as required in `UserInfo`, but its value is `undefined`'));
        });

        let user = createUser();
        delete user.name;
        const component = shallow(<UserInfo width={100} height={100} user={user} muiTheme={{ palette: { primary1Color: "#00BCD4" } }}/>);
        const spanElement = component.find('.user-info__text');

        expect(spanElement.text()).toEqual('');
        expect(consoleSpy).toHaveBeenCalledTimes(1);

        consoleSpy.mockReset();
        consoleSpy.mockRestore();
    });
});