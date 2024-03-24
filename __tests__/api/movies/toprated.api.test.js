import handler from '../../../pages/api/movies/discover/toprated';
import fetch from 'node-fetch';
import { ConfigService } from '../../../src/services/config.service';

jest.mock('node-fetch');

describe('API Handler for Discover', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });


    it('should handle network errors', async () => {
        fetch.mockRejectedValueOnce(new Error('Network Error'));

        const req = { method: 'GET' };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ status: 500, error: 'Internal Server Error' });
    });

});
