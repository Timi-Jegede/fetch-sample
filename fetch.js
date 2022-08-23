fetch('http://example.com/movies.json')
    .then((response) => response.json())
    .then((data) => console.log(data));


// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  postData('https://example.com/answer', { answer: 42 })
    .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  
    fetch('https://example.com', {
        credentials: 'include'
    });

    fetch('https://example.com', {
        credentials: 'same-origin'
    });
    
    fetch('https://example.com', {
        credentials: 'omit'
    })

    // Uploading JSON Data
    const data = { username: 'example' };

    fetch('https://example.com/profile', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      // Uploading a file
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        formData.append('username', 'abc123');
        formData.append('avatar', fileField.files[0]);

        fetch('https://example.com/profile/avatar', {
            method: 'PUT',
            body: formData
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // Uploading multiple files
        const formData = new FormData();
        const photos = document.querySelector('input[type="file"][multiple]');

        formData.append('title', 'My Vegas Vacation');
        let i = 0;
        for (const photo of photos.files) {
        formData.append(`photos_${i}`, photo);
        i++;
        }

        fetch('https://example.com/posts', {
        method: 'POST',
        body: formData,
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });


        // Processing a text file line by line
        async function* makeTextFileLineIterator(fileURL) {
            const utf8Decoder = new TextDecoder('utf-8');
            const response = await fetch(fileURL);
            const reader = response.body.getReader();
            let { value: chunk, done: readerDone } = await reader.read();
            chunk = chunk ? utf8Decoder.decode(chunk) : '';
          
            const re = /\n|\r|\r\n/gm;
            let startIndex = 0;
            let result;
          
            while (true) {
              let result = re.exec(chunk);
              if (!result) {
                if (readerDone) break;
                let remainder = chunk.substr(startIndex);
                ({ value: chunk, done: readerDone } = await reader.read());
                chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : '');
                startIndex = re.lastIndex = 0;
                continue;
              }
              yield chunk.substring(startIndex, result.index);
              startIndex = re.lastIndex;
            }
          
            if (startIndex < chunk.length) {
              // Last line didn't end in a newline char
              yield chunk.substr(startIndex);
            }
          }
          
          async function run() {
            for await (const line of makeTextFileLineIterator(urlOfFile)) {
              processLine(line);
            }
          }
          
          run();

          // Checking that the fetch was successful
          fetch('flowers.jpg')
            .then((response) => {
                if (!response.ok) {
                throw new Error('Network response was not OK');
                }
                return response.blob();
            })
            .then((myBlob) => {
                myImage.src = URL.createObjectURL(myBlob);
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            })

            // Supplying your own rrequest object
            const myHeaders = new Headers();

            const myRequest = new Request('flowers.jpg', {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            });

            fetch(myRequest)
            .then((response) => response.blob())
            .then((myBlob) => {
                myImage.src = URL.createObjectURL(myBlob);
            });

            const anotherRequest = new Request(myRequest, myInit);

            // Headers
            const content = 'Hello World';
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'text/plain');
            myHeaders.append('Content-Length', content.length.toString());
            myHeaders.append('X-Custom-Header', 'ProcessThisImmediately');


            const myHeaders = new Headers({
                'Content-Type': 'text/plain',
                'Content-Length': content.length.toString(),
                'X-Custom-Header': 'ProcessThisImmediately'
              });

              
              console.log(myHeaders.has('Content-Type')); // true
            console.log(myHeaders.has('Set-Cookie')); // false
            myHeaders.set('Content-Type', 'text/html');
            myHeaders.append('X-Custom-Header', 'AnotherValue');

            console.log(myHeaders.get('Content-Length')); // 11
            console.log(myHeaders.get('X-Custom-Header')); // ['ProcessThisImmediately', 'AnotherValue']

            myHeaders.delete('X-Custom-Header');
            console.log(myHeaders.get('X-Custom-Header')); // null
