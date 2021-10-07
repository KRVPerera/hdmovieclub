export function getExpiryTime(club, minutes) {
    const now = new Date()
    return club ? now.getTime() + minutes*60000 : now.setDate(now.getDate() + 1);
}
