let options = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};


export function unixTimeToString(time) {
    return new Date(time).toLocaleString('en-us', options).replace(",", "");
}
