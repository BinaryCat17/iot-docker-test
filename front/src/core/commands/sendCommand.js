const base64 = require('base-64');

export function sendCommand(method, command, args, handler, payload = null) {
    let url = 'http://salskayastep.ru/api/' + command;
    args.forEach(arg => {
        url += "/" + arg
    });

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return fetch(url, {
        method: method,
        headers: headers,
        body: payload
    }).then(response => {
        if (method == "GET") {
            if (response.status === 200) {
                response.json().then(json => handler(json))
            } else {
                response.text().then(data => {
                    handler({ error: data })
                })
            }
        }
    })
}


export function sendLogin(username, password, handler) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    let url = 'http://чёрныйящик.рф/api/login/' + username;
    return fetch(url, {
        method: "GET",
        headers: headers
    }).then(response => {
        if (response.status === 200) {

            window.location.href = response.url
            response.text().then(json => {
                if (json.length > 0 && json.at(0) !== '<') {
                    handler(JSON.parse(json))
                }
            })
        } else {
            response.text().then(data => {
                handler({ error: data })
            })
        }
    })
}