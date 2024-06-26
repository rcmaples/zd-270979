import { PerformanceObserver, performance } from 'node:perf_hooks';

const obs = new PerformanceObserver((list) => {
  const fetches = list
    .getEntries()
    .filter((entry) => entry.initiatorType === 'fetch');
  if (fetches.length > 0) {
    console.log(JSON.stringify(fetches));
  }
});

obs.observe({ type: 'resource', buffered: true });

const runTestFetch = async () => {
  const start = Date.now();
  const url = 'https://randomuser.me/api/';

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    const err = new Error(
      `Error:\n\tStatus ${data.status} - ${data.statusText}`
    );
    console.error(err);
    throw err;
  }

  const data = await response.json();
  const totalTime = Date.now() - start;
  console.log(`Time spent: ${totalTime} milliseconds`);
  return data;
};

const runFetch = async () => {
  const start = Date.now();
  const VITE_VUE_APP_CONTENTSTACK_API_KEY = {};
  const VITE_VUE_APP_CONTENTSTACK_DELIVERY_TOKEN = {};
  const api_key = (VITE_VUE_APP_CONTENTSTACK_API_KEY['production'] = '???'); // replace w/ key
  const access_token = (VITE_VUE_APP_CONTENTSTACK_DELIVERY_TOKEN['production'] =
    '???'); // replace with token
  const url =
    'https://cdn.contentstack.io/v3/content_types/posts/entries/?query=%7B%22date%22%3A%7B%22%24lte%22%3A%222024-06-20T15%3A11%3A33.724Z%22%7D%7D&include[]=author&include[]=categories&include_count=true&limit=15&desc=date&environment=production';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      api_key,
      access_token,
      'fastly-debug': '1',
    },
  };
  const data = await fetch(url, options);
  if (!data.ok) {
    const err = new Error(
      `Error:\n\tStatus ${data.status} - ${data.statusText}`
    );
    console.error(err);
    throw err;
  }
  const totalTime = Date.now() - start;
  console.log(`Time spent: ${totalTime} milliseconds`);
};

runTestFetch();
// runFetch();
