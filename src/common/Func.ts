export function debounce(func, delay:number){
    let timeout;
    return function (...args){
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}