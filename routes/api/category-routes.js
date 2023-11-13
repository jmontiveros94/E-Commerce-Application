// brings in express
const router = require('express').Router();
// this will import the data from our models directory, particularly the category and product js files
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get route to grab all of the categories by 'id' and 'category name'
// sub-properties to grab all of the attributes (ln 45)
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
// throws error if no response 
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get request that grabs all of the categories by 'id', 'product name', 'price', 'stock', and 'category id'
// then 
router.get('/:id', (req, res) => {
  // finds a category by its id value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res
          .status(404)
          .json({ message: "There was no category found for this id." });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post route that created a category and returns the json data
// otherwise it will throw an error
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbProductData) => res.json(dbProductData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// put route 
router.put('/:id', (req, res) => {
  // updates the category based on the id value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "There was no category found with this id." });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete route 
router.delete('/:id', (req, res) => {
  // deletes the category by its id otherwise returns an error stating an error (ln 143)
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'There was no category found with this id.' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;