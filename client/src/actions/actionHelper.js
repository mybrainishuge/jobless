import fetch from 'isomorphic-fetch';

export const ERROR = 'ERROR';

export const error = function(error) {
  return {
    type: 'ERROR',
    error
  }
}

export const get = function(actions, endpoint) {
  return dispatcher => {
    dispatcher(actions.request());
    let status;
    return fetch('/api/' + endpoint, { credentials: 'same-origin' })
      .then(response => {
        status = response.status;
        return response.json()
      })
      .then(json => { return dispatcher(actions.response(status, json))});
      //.catch(err => { return dispatcher(error(err))});
  }
}

export const post = function(actions, endpoint, data) {
  return (dispatcher, getState) => {
    dispatcher(actions.request());
    let status;
    return fetch('/api/' + endpoint, {
      method: 'POST',
      //mode:  'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
    .then(response => {
      status = response.status;
      // display notification that endpoint action was successful
      noty({
        layout: 'topCenter',
        theme: 'relax',
        type: 'success',
        text: `${endpoint.split('')[0].toUpperCase().concat(endpoint.slice(1))} successfully added.`,
        dismissQueue: true,
        animation: {
          open: 'animated bounceInDown',
          close: 'animated bounceOutUp'
          },
        timeout: 3000
      });
      return response.json()
    })
    .then(json => {
      return dispatcher(actions.response(status, json))
    });
    //.catch(err => { return dispatcher(error(err))});
  }
}

export const put = function(actions, endpoint, data) {
  console.log(data);
  return (dispatcher, getState) => {
    dispatcher(actions.request());
    return fetch('/api/' + endpoint, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
    .then(response => {
      // display notification that endpoint action was successful

      if (data.complete) {
        noty({
          layout: 'topCenter',
          theme: 'relax',
          type: 'information',
          text: 'Remember to send a thank you note!',
          dismissQueue: true,
          animation: {
            open: 'animated bounceInDown',
            close: 'animated bounceOutUp'
            },
          timeout: 5000
        });
      } else {
        noty({
          layout: 'topCenter',
          theme: 'relax',
          type: 'success',
          text: `${endpoint.split('')[0].toUpperCase().concat(endpoint.slice(1))} successfully edited.`,
          dismissQueue: true,
          animation: {
            open: 'animated bounceInDown',
            close: 'animated bounceOutUp'
            },
          timeout: 3000
        });
      }

      return dispatcher(actions.response(response.status, data))
    })
    // .catch(err => { return dispatcher(error(err))});
  }
}

export const remove = function(actions, endpoint, data) {
  console.log(data);
  console.log('action helper called!')
  return (dispatcher, getState) => {
    dispatcher(actions.request());
    return fetch('/api/' + endpoint, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
    .then(response => { 
      return dispatcher(actions.response(response.status, data))
    })
    // .catch(err => { return dispatcher(error(err))});
  }
}

