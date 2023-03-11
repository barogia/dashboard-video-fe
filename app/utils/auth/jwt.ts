export interface IDecodeJWT {
  _id: string;
  role: string;
  exp: number;
  iat: number;
  email: string;
}

export const b64DecodeUnicode = (str: string) =>
  decodeURIComponent(
    Array.prototype.map
      .call(
        atob(str),
        (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      )
      .join("")
  );

export const parseJwt = (token: string): IDecodeJWT | null => {
  if (!token) return null;
  return JSON.parse(
    b64DecodeUnicode(token.split(".")[1].replace("-", "+").replace("_", "/"))
  );
};
