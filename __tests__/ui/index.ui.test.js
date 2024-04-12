import {render, screen} from '@testing-library/react';
import SignIn from "../../pages/ui/sign-in";
import {AuthProvider} from "../../src/contexts/auth.context";

const user = {name: "TestUser"};

describe('SignIn', () => {
    it('renders the sign-in link correctly', () => {
        // Mock useRouter
        const useRouter = jest.spyOn(require('next/router'), 'useRouter');
        useRouter.mockImplementation(() => ({
            pathname: '/ui/sign-in'
        }));

        render(
            <AuthProvider value={{user: user}}>
                <SignIn/>
            </AuthProvider>
        );
        expect(screen.getByText('Sign In')).toBeInTheDocument();
    });
});
