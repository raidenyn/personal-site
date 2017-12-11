// tslint:disable:object-literal-key-quotes
import Axios from 'axios';

const http = Axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
});

export { http };
