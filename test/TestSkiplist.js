import skip_list from '../src/dictionary/skip_list.js';
const list = new skip_list();
list.put(1, '9999');
list.put(2, '8888');
list.put(3, '111111');
console.log(list.get(3));
