export const setCookie = (name, value, days) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  const cookieValue =
    encodeURIComponent(JSON.stringify(value)) +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/";
  document.cookie = `${name}=${cookieValue}`;
};

export const getCookie = (name) => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      let decodedValue = decodeURIComponent(
        cookie.substring(cookieName.length, cookie.length)
      );
      try {
        // Attempt to parse the decoded value as JSON
        return JSON.parse(decodedValue);
      } catch (error) {
        // If parsing fails, return the decoded value as is
        return decodedValue;
      }
    }
  }

  return null;
};

export const fetchCart = () => {
  const cartInfo = getCookie("cartItems") || [];
  return cartInfo;
};

export const clearCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
