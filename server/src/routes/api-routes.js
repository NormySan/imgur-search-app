'use strict';

// Require dependencies.
const router = require('express').Router();

const imgurService = require('../services/imgur-service');

// Perform a search request.
router.get('/search', (req, res, next) => {
  const query = req.query.q || '';

  imgurService.searchGallery(query, (err, galleryItems) => {
    if (err) return next(err);

    res.status(200).send({
      data: galleryItems,
    });
  });
});

// Get an album.
router.get('/album/:albumId', (req, res, next) => {
  imgurService.getAlbum(req.params.albumId, (err, album) => {
    if (err) return next(err);

    res.status(200).send({
      data: album,
    });
  });
});

module.exports = router;

