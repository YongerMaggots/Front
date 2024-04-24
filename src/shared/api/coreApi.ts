const getDomain = () => {
    return import.meta.env.domain || window.location.hostname;
};

const getApiPrefix = () => {
    const domain = getDomain();
    const protocol = domain === 'localhost' ? 'http' : 'https';
    const port = domain === 'localhost' ? ':3000' : '';
    return `${protocol}://${domain}${port}/api-v2`;
};

export const PREFIX = getApiPrefix();
