const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Find all categories and associated Products
router.get("/", async (req, res) => {
  try {
    const catagoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    if (!catagoryData) {
      res.status(404).json({ message: "No category found" });
      return;
    }

    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find one category by its `id` value and its associated Products
router.get("/:id", async (req, res) => {
  try {
    const catagoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!catagoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new category
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    if (newCategory) {
      res.status(200).json(newCategory);
    }
  } catch (error) {
    res.json(err);
  }
});

// Update catgory by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        // Gets a category based on the id given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    );
    if (updatedCategory) {
      res.status(200).json(updatedCategory);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
