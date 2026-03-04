import express from 'express';
import pool from '../config/db.js';


const router = express.Router();

router.get("/",async(req,res) => {
  try{
   res.send("hello");
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
})

router.post("/response", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if(!name || !email || !message ){
        return res.status(400).json({message:'please provide all details !'});
    }

    const result = await pool.query(
      "INSERT INTO feedback (name, email, description) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );

    res.status(201).json({
      message: "Feedback saved successfully",
      data: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;