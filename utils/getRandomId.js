export const getRandomId = () => {
    const randomString = Math.random().toString(36).slice(2, 12).padStart(10, '0');
    return `${new Date().toISOString()}-${randomString}`;
};
