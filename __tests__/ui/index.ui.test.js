import { render, screen } from '@testing-library/react';
import Index from '../../pages/index';
import SignIn from "../../pages/ui/sign-in";
const useRouter = jest.spyOn(require('next/router'), 'useRouter');


useRouter.mockImplementation(() => ({
    pathname: '/',
    ...moreRouterData
}));
describe('Index', () => {
    it('renders the sign-in link correctly', () => {
        render(<SignIn />);
        expect(screen.getByText('Sign In')).toBeInTheDocument();
    });
});
