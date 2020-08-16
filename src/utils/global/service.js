import backchannel from '../data/backchannel.json';
import economics from '../data/economics.json';
import matter from '../data/matter.json';

const list = {
    backchannel,
    economics,
    matter
}
export const getData = (service) => {
    return new Promise((resolve, reject) => {
        resolve(list[service]);
    });
};

export const filterStory = (feed, id) => {
    return list[feed].item[id];
};