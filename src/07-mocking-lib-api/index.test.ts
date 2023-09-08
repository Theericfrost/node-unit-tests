import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const relativePath = '/posts/1';
  const expectedBaseUrl = 'https://jsonplaceholder.typicode.com';

  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(relativePath);

    expect(axiosSpy).toHaveBeenCalledWith({ baseURL: expectedBaseUrl });
  });

  test('should perform request to correct provided url', async () => {
    const expectedUrl = `${expectedBaseUrl}${relativePath}`;
    const correctData = (await axios.get(expectedUrl)).data;

    const data = await throttledGetDataFromApi(relativePath);

    expect(data).toEqual(correctData);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi(relativePath);
    expect(data).toBeDefined();
  });
});
