'use strict';

const async = require('async');
const request = require('request');

/**
 * Build the header object required for a request to the Imgur API.
 *
 * @return {object}
 */
function buildHeaders () {
  return {
    'Accept': 'application/json',
    'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
  };
};

/**
 * Perform a request with the specified method, url and options.
 *
 * @param {string} method - The type of the HTTP method.
 * @param {string} url - URL to the resource.
 * @param {object} options - An object with options for the request.
 */
function createRequest (method, url, options, callback) {
  // Extend the request options with some default values.
  Object.assign(options, {
    url,
    method,
    headers: buildHeaders(),
    json: true,
  });

  request(options, (err, response, data) => {
    callback(err, data);
  });
};

function getGallerySearchItemType (item) {
  if (item.is_album && item.is_album === true) {
    return 'album';
  } else {
    return 'image';
  }
}

function galleryItemIsAnimated (item) {
  return item.animated && item.animated === true;
}

function transformGalleryResponse (items, callback) {
  async.mapSeries(items, (item, done) => {
    const url = 'http://i.imgur.com';
    const itemSrc = item.cover ? `${url}/${item.cover}b.jpg` : `${url}/${item.id}b.jpg`;
    const imageCount = item.images_count ? item.images_count : 1;

    done(null, {
      id: item.id,
      title: item.title,
      description: item.description,
      src: itemSrc,
      type: getGallerySearchItemType(item),
      animated: galleryItemIsAnimated(item),
      imageCount
    });
  }, callback);
}

function transformGetAlbumResponse (album) {
  return {
    id: album.id,
    title: album.title,
    description: album.description,
    images: album.images || [],
  };
}

/**
 * Perform a gallery search request.
 *
 * @param {string} query - A string of text to search for.
 */
exports.searchGallery = (query, callback) => {
  const url = 'https://api.imgur.com/3/gallery/search';
  const options = { qs: { q: query } };

  createRequest('GET', url, options, (err, response) => {
    if (err) return callback(err);
    transformGalleryResponse(response.data, callback);
  });
};

exports.getAlbum = (albumId, callback) => {
  const url = `https://api.imgur.com/3/gallery/album/${albumId}`;

  createRequest('GET', url, {}, (err, response) => {
    if (err) return callback(err);
    callback(null, transformGetAlbumResponse(response.data));
  });
};
