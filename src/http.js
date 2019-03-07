class EasyHTTP {
  // Make an HTTP GET Request
  async get(url) {
    const response = await fetch(url);
    this.resData = await response.json();
    return this.resData;
  }

  // Make an HTTP POST Request
  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    this.resData = await response.json();
    return this.resData;
  }

  // Make an HTTP PUT Request
  async put(url, data) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    this.resData = await response.json();
    return this.resData;
  }

  // Make an HTTP DELETE Request
  async delete(url) {
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    this.resData = await 'Resource Deleted...';
    return this.resData;
  }
}

export const http = new EasyHTTP();
