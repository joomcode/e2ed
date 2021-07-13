type Cookie = Readonly<{name: string; value: string}>;

export const replaceCookie = (cookies: string[], cookie: Cookie): string[] => {
  const newCookies = [...cookies];
  const newCookieString = `${cookie.name}=${cookie.value};`;
  const cookieIndex = newCookies.findIndex((cookieString) =>
    cookieString.startsWith(`${cookie.name}=`),
  );

  if (cookieIndex === -1) {
    newCookies.push(newCookieString);
  } else {
    const cookieString = newCookies[cookieIndex];
    const semicolonIndex = cookieString.indexOf(';');

    if (semicolonIndex === -1) {
      newCookies[cookieIndex] = newCookieString;
    } else {
      newCookies[cookieIndex] = `${newCookieString}${cookieString.slice(semicolonIndex + 1)}`;
    }
  }

  return newCookies;
};
