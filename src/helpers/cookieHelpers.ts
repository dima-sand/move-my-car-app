export const getCookie = (str: string) => {
  const cookieArray = str.split(';');
  const result : { [key: string]: string } = {};
  cookieArray.forEach((cookie) => {
    const [key, value] = cookie.split('=');
    result[key.trim()] = value;
  })
  return result;
};
