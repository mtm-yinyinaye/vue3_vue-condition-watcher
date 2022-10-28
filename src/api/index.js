const addBox = params => {
    console.log(params.offset);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(
                Array.from(Array(params.limit), (_, index) => {
                    return {
                        id: params.offset + index + 1,
                        color:
                            "#" +
                            ("00000" + ((Math.random() * 0xffffff) << 0).toString(16)).slice(
                                -6
                            )
                    };
                })
            );
        }, 1000);
    });
};

// const users = (params) =>
//     fetch('https://randomuser.me/api/?' + query(params), { method: 'GET' }).then(
//         (res) => {
//             // console.log(res);
//             res.json();
//         }
//     );

const users = (params) =>
    fetch('https://randomuser.me/api/?gender=male&page=1')
    .then((res) => {
        console.log('res', res.json());
        console.log('params', params);
    });

const photos = () =>
    fetch('https://jsonplaceholder.typicode.com/photos', { method: 'GET' }).then(
        (res) => res.json()
    );


// function query(params) {
//     const esc = encodeURIComponent;
//     return Object.keys(params)
//         .map((k) => esc(k) + '=' + esc(params[k]))
//         .join('&');
// }

export default {
    addBox,
    users,
    photos
};
