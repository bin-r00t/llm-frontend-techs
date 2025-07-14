export const urlMapping = {
  us1: "/us1?url=",
  eu1: "/eu1?url=",
  eu: "/eu?url=",
  us: "/us?url=",
};

/**
 * primary: api.bfl.ai
 * [latest] eu: api.eu.bfl.ai
 * [latest] us: api.us.bfl.ai
 * [legacy] eu1: api.eu1.bfl.ai
 * [legacy] us1: api.us1.bfl.ai
 */

export function getRouteUrl(url: string) {
  let prefix = "";
  if (url.includes("us1")) {
    prefix = urlMapping["us1"];
  } else if (url.includes("eu1")) {
    prefix = urlMapping["eu1"];
  } else if (url.includes("us")) {
    prefix = urlMapping["us"];
  } else {
    prefix = urlMapping["eu"];
  }
  return prefix + url;
}
