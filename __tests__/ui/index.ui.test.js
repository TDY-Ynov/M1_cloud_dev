import { render, screen } from '@testing-library/react';
import Index from '../../pages/index';
const useRouter = jest.spyOn(require('next/router'), 'useRouter');


useRouter.mockImplementation(() => ({
    pathname: '/',
    ...moreRouterData
}));
describe('Index', () => {
    it('renders the sign-in link correctly', () => {
        render(<Index />);
        expect(screen.getByText('Sign In')).toBeInTheDocument();
    });
});
