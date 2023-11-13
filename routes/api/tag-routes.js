// const router = require('express').Router();
// const { Tag, Product, ProductTag } = require('../../models');

// // The `/api/tags` endpoint

// router.get('/', (req, res) => {
//   // find all tags
//   // be sure to include its associated Product data
// });

// router.get('/:id', (req, res) => {
//   // find a single tag by its `id`
//   // be sure to include its associated Product data
// });

// router.post('/', (req, res) => {
//   // create a new tag
// });

// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
// });

// router.delete('/:id', (req, res) => {
//   // delete on tag by its `id` value
// });

// module.exports = router;
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get route to find all of the tags with the associated attributes
router.get('/', (req, res) => {
  // finds all of the tags
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
        as: "products",
      },
    ],
  })
  // throws an error if no tags are found
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get route that finds a single tag by it's id and sub-attributes
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
        as: "products",
      },
    ],
  })
  // returns TagData, otherwise it returns an error with the corresponding message
    .then((dbTagData) => {
      if (!dbTagData) {
        res
          .status(404)
          .json({ message: "There was no tag found with this id." });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post route to create a new tag and update the database 
router.post('/', (req, res) => {
  // creates a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// put route that updates the database based on the id
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  // returns updated databse, otherwise returns error with corresponding message
    .then((dbTagData) => {
      if (!dbTagData[0]) {
        res
          .status(404)
          .json({ message: 'There was no tag found with this id.' });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete route that finds a tag by it's id 
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  // returns updated database, otherwise returns error with corresponding message
    .then((dbTagData) => {
      if (!dbTagData) {
        res
          .status(404)
          .json({ message: 'There was no tag found with this id.' });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;