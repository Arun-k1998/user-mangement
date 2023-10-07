export default function getCookies() {
  const cookiesArr = document.cookie.split("; ");
  
  let cookies = {};
  cookiesArr.forEach((cookie) => {
    const _ck = cookie.split("=");
    cookies[_ck[0]] = _ck[1];
  });
  
  return cookies;
}
